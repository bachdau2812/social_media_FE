import { Archive, Briefcase, Check, ChevronRight, ExternalLink, GraduationCap, House, Library, Link2, MapPin, PenLine, Plus, RefreshCw, Search, Trash2, User, Users, Video, WifiOff, X, type LucideIcon } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Avatar as SharedAvatar } from "../../../shared/components";
import { useBodyScrollLock } from "../../../shared/overlays/useBodyScrollLock";
import { StoryHighlights, type StoryHighlightDto } from "../../story";
import type { Post } from "../../post";
import type { Profile } from "../model/profile.types";
import { ProfileRelationshipActions, type ProfileRelationship } from "../components/ProfileRelationshipActions";
import { SimilarUsersSection, type SimilarUser } from "../components/SimilarUsersSection";
import { AvatarUploader } from "../components/AvatarUploader";
import { profileApi, type ConnectionTab, type ConnectionUserDto, type ProfileRecordKind } from "../api/profile.api";
import { useProfileConnections } from "../hooks/useProfileConnections";
import { useProfileRelationship } from "../hooks/useProfileRelationship";

function Avatar({ src, label }: { src?: string; label: string }) { return <SharedAvatar src={src} name={label} alt={label} />; }
function formatCount(value: number) { return value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k` : String(value); }
function EmptyState({ icon: Icon, title, action }: { icon: LucideIcon; title: string; action: string }) { return <div className="empty-state"><Icon size={26} /><strong>{title}</strong><span>{action}</span></div>; }

function ProfilePostThumbnail({ post }: {
    post: Post;
}) {
    const orderedMedia = [...post.media].sort((left, right) => (left.orderNumber ?? Number.MAX_SAFE_INTEGER) - (right.orderNumber ?? Number.MAX_SAFE_INTEGER));
    const media = orderedMedia.find((item) => item.orderNumber === 1) ?? orderedMedia[0];
    if (!media)
        return <span>{post.caption || post.id}</span>;
    if (media.type === "VIDEO")
        return <>
    <video src={media.url} muted playsInline preload="auto" aria-label={media.alt || "Video post"} onLoadedMetadata={(event) => { const video = event.currentTarget; video.pause(); if (video.duration > 0)
            video.currentTime = Math.min(0.05, video.duration / 10); }} onLoadedData={(event) => event.currentTarget.pause()}/>
    <Video className="profile-video-indicator" size={17} aria-hidden="true"/>
  </>;
    return <img src={media.url} alt={media.alt}/>;
}
function profileJobLabel(job: Profile["jobs"][number]) {
    if (job.position && job.companyName)
        return `${job.position} tại ${job.companyName}`;
    if (job.companyName)
        return `Làm việc tại ${job.companyName}`;
    return job.position || "";
}
function profileUniversityLabel(university: Profile["universities"][number]) {
    if (university.major && university.schoolName)
        return `${university.major} tại ${university.schoolName}`;
    if (university.schoolName)
        return `Đã học tại ${university.schoolName}`;
    return university.major || "";
}
function profileSocialLabel(link: string) {
    try {
        const url = new URL(link.startsWith("http") ? link : `https://${link}`);
        const host = url.hostname.replace(/^www\./, "");
        if (host.includes("github"))
            return "GitHub";
        if (host.includes("linkedin"))
            return "LinkedIn";
        if (host.includes("facebook"))
            return "Facebook";
        return host;
    }
    catch {
        return link.replace(/^https?:\/\//, "").split("/")[0];
    }
}
function profileDateRange(from?: string | null, to?: string | null) {
    if (!from && !to)
        return "";
    const year = (value?: string | null) => value ? new Date(value).getFullYear() : null;
    return `${year(from) ?? ""}${from || to ? " – " : ""}${year(to) ?? "Hiện tại"}`;
}
function ProfileConnectionActions({ viewerId, profile, onMessage, onOpenProfile, onRefresh }: {
    viewerId: string;
    profile: Profile;
    onMessage: (userId: string) => Promise<void>;
    onOpenProfile: (userId: string) => Promise<void>;
    onRefresh: () => Promise<void>;
}) {
    const [similarOpen, setSimilarOpen] = useState(false);
    const { relationship, pending, follow, unfollow } = useProfileRelationship({
        viewerId,
        profileId: profile.id,
        viewerFollows: profile.viewerFollows,
        userFollowsViewer: profile.userFollowsViewer,
        friend: profile.friend,
        onRefresh,
    });
    async function loadSimilar({ profileId, signal }: {
        profileId: string;
        signal: AbortSignal;
    }): Promise<SimilarUser[]> {
        const page = await profileApi.getSimilarUsers(profileId, viewerId, signal);
        return (page.content ?? []).map((item) => ({
            id: item.userId,
            username: item.username || item.userId,
            displayName: item.fullName || item.username || item.userId,
            avatarUrl: item.avatarUrl || null,
            relationship: (item.friend ? "friends" : item.viewerFollowsUser ? "following" : item.userFollowsViewer ? "follows_you" : "none") as ProfileRelationship,
        }));
    }
    async function followSimilar(user: SimilarUser) {
        await profileApi.follow(viewerId, user.id);
    }
    async function unfollowSimilar(user: SimilarUser) {
        await profileApi.unfollow(viewerId, user.id);
    }
    return <div className="profile-relationship-area">
    <ProfileRelationshipActions relationship={relationship} pending={pending} onFollow={follow} onUnfollow={unfollow} onMessage={() => onMessage(profile.id)} onFindSimilar={() => setSimilarOpen((value) => !value)}/>
    <SimilarUsersSection open={similarOpen} profileId={profile.id} loadUsers={loadSimilar} onSelectUser={(user) => void onOpenProfile(user.id)} onFollow={followSimilar} onUnfollow={unfollowSimilar} onClose={() => setSimilarOpen(false)}/>
  </div>;
}
export function ProfileScreen({ viewerId, profile, onSelectPost, onOpenStoryHighlight, onOpenArchive, onOpenConnections, onRefresh, onMessage, onOpenProfile }: {
    viewerId: string;
    profile: Profile | null;
    onSelectPost: (post: Post) => void;
    onOpenStoryHighlight: (highlight: StoryHighlightDto) => void;
    onOpenArchive: () => void;
    onOpenConnections: (tab: ConnectionTab) => void;
    onRefresh: () => Promise<void>;
    onMessage: (userId: string) => Promise<void>;
    onOpenProfile: (userId: string) => Promise<void>;
}) {
    const [activeTab, setActiveTab] = useState<"POSTS" | "REPOSTS">("POSTS");
    const [aboutOpen, setAboutOpen] = useState(false);
    const [editorOpen, setEditorOpen] = useState(false);
    if (!profile)
        return <section className="screen"><EmptyState icon={User} title="Profile not loaded" action="Open profile again"/></section>;
    const ownProfile = profile.id === viewerId;
    const visibleJobs = profile.jobs.filter((item) => item.isPublic);
    const visibleUniversities = profile.universities.filter((item) => item.isPublic);
    const visibleHighSchools = profile.highSchools.filter((item) => item.isPublic);
    const featuredJob = visibleJobs[0];
    const featuredUniversity = visibleUniversities[0];
    const featuredHighSchool = visibleHighSchools[0];
    const facts = [
        profile.currentCity ? { icon: MapPin, content: <>Sống tại <strong>{profile.currentCity}</strong></> } : null,
        profile.hometown ? { icon: House, content: <>Đến từ <strong>{profile.hometown}</strong></> } : null,
        featuredJob ? { icon: Briefcase, content: <strong>{profileJobLabel(featuredJob)}</strong> } : null,
        featuredUniversity ? { icon: GraduationCap, content: <strong>{profileUniversityLabel(featuredUniversity)}</strong> } : null,
        !featuredUniversity && featuredHighSchool?.schoolName ? { icon: Library, content: <>Đã học tại <strong>{featuredHighSchool.schoolName}</strong></> } : null,
    ].filter(Boolean).slice(0, 4) as Array<{
        icon: typeof MapPin;
        content: ReactNode;
    }>;
    const visibleGroupCount = [facts.length > 0, profile.hobbies.length > 0, profile.socialLinks.length > 0].filter(Boolean).length;
    const density = visibleGroupCount <= 1 && facts.length <= 2 ? "minimal" : visibleJobs.length + visibleUniversities.length + visibleHighSchools.length + profile.hobbies.length + profile.socialLinks.length > 8 ? "rich" : "balanced";
    const hasMoreInfo = visibleJobs.length > 1 || visibleUniversities.length > 1 || visibleHighSchools.length > (featuredUniversity ? 0 : 1) || profile.hobbies.length > 6 || profile.socialLinks.length > 3;
    const visiblePosts = activeTab === "POSTS" ? profile.posts : profile.reposts;
    return <section className="screen profile-screen">
    <header className={`profile-header structured-profile-header ${density}`}>
      {ownProfile ? <AvatarUploader key={profile.id} userId={profile.id} avatarUrl={profile.avatarUrl} username={profile.username} onApproved={onRefresh}/> : <Avatar src={profile.avatarUrl} label={profile.username}/>}
      <div className="profile-identity-column">
        <div className="profile-identity-row"><div><h2>{profile.displayName}</h2><p>@{profile.username}</p></div>{ownProfile && <div className="profile-owner-actions"><button className="profile-edit-action" onClick={() => setEditorOpen(true)}><PenLine size={16}/> Chỉnh sửa thông tin</button><button className="profile-edit-action" onClick={onOpenArchive}><Archive size={16}/> Kho lưu trữ</button></div>}</div>
        {facts.length > 0 && <div className="profile-facts">{facts.map((fact, index) => { const Icon = fact.icon; return <div key={index}><Icon size={16} aria-hidden="true"/><span>{fact.content}</span></div>; })}</div>}
        {hasMoreInfo && <button className="profile-about-trigger" onClick={() => setAboutOpen(true)}>Xem thêm <ChevronRight size={15}/></button>}{profile.hobbies.length > 0 && <div className="profile-hobbies"><div>{profile.hobbies.slice(0, 3).map((hobby) => <span key={hobby}>{hobby}</span>)}{profile.hobbies.length > 3 && <button className="profile-more-link" onClick={() => setAboutOpen(true)}>More</button>}</div></div>}
        {profile.socialLinks.length > 0 && <div className="profile-social-links">{profile.socialLinks.slice(0, 3).map((item) => <a key={item.id} href={item.link.startsWith("http") ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer"><Link2 size={14}/><span>{profileSocialLabel(item.link)}</span><ExternalLink size={12}/></a>)}</div>}
        
        <div className="metrics"><button className="metric-button" onClick={() => onOpenConnections("FOLLOWERS")}><strong>{formatCount(profile.followerCount)}</strong><span>Followers</span></button><button className="metric-button" onClick={() => onOpenConnections("FOLLOWING")}><strong>{formatCount(profile.followingCount)}</strong><span>Following</span></button><button className="metric-button" onClick={() => onOpenConnections("FRIENDS")}><strong>{formatCount(profile.friendCount)}</strong><span>Friends</span></button></div>
      </div>
    </header>
    {!ownProfile && <ProfileConnectionActions viewerId={viewerId} profile={profile} onMessage={onMessage} onOpenProfile={onOpenProfile} onRefresh={onRefresh}/>}
    <StoryHighlights ownerId={profile.id} ownProfile={ownProfile} onOpen={onOpenStoryHighlight}/>
    <nav className="profile-tabs" aria-label="Profile content"><button className={activeTab === "POSTS" ? "active" : ""} onClick={() => setActiveTab("POSTS")}><Library size={16}/><span>Posts</span><small>{profile.posts.length}</small></button><button className={activeTab === "REPOSTS" ? "active" : ""} onClick={() => setActiveTab("REPOSTS")}><RefreshCw size={16}/><span>Reposts</span><small>{profile.reposts.length}</small></button></nav>
    {visiblePosts.length ? <div className="profile-grid">{visiblePosts.map((post) => <button key={post.id} onClick={() => onSelectPost(post)}><ProfilePostThumbnail post={post}/>{activeTab === "REPOSTS" && <em>Reposted</em>}</button>)}</div> : <EmptyState icon={Archive} title={activeTab === "POSTS" ? "No posts" : "No reposts"} action={activeTab === "POSTS" ? "Create post" : "Open feed"}/>}
    {aboutOpen && <ProfileAboutPanel profile={profile} onClose={() => setAboutOpen(false)}/>}
    {editorOpen && ownProfile && <ProfileInformationEditor profile={profile} onClose={() => setEditorOpen(false)} onSaved={onRefresh}/>}
  </section>;
}
function ProfileAboutPanel({ profile, onClose }: {
    profile: Profile;
    onClose: () => void;
}) {
    useBodyScrollLock(true);
    const jobs = profile.jobs.filter((item) => item.isPublic);
    const universities = profile.universities.filter((item) => item.isPublic);
    const highSchools = profile.highSchools.filter((item) => item.isPublic);
    return createPortal(<div className="profile-info-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget)
        onClose(); }}><section className="profile-about-panel" role="dialog" aria-modal="true" aria-label="Thông tin giới thiệu"><header><div><strong>Thông tin giới thiệu</strong></div><button className="icon-button" onClick={onClose} aria-label="Đóng"><X size={20}/></button></header><div className="profile-about-body">
    {(profile.currentCity || profile.hometown) && <section><h3>Nơi sống</h3>{profile.currentCity && <div className="about-row"><MapPin size={18}/><span>Sống tại <strong>{profile.currentCity}</strong></span></div>}{profile.hometown && <div className="about-row"><House size={18}/><span>Đến từ <strong>{profile.hometown}</strong></span></div>}</section>}
    {jobs.length > 0 && <section><h3>Công việc</h3><div className="about-timeline">{jobs.map((job) => <div key={job.id}><Briefcase size={18}/><span><strong>{job.position || "Công việc"}</strong>{job.companyName && <small>{job.companyName}</small>}{profileDateRange(job.fromDate, job.toDate) && <small>{profileDateRange(job.fromDate, job.toDate)}</small>}</span></div>)}</div></section>}
    {universities.length > 0 && <section><h3>Học vấn</h3><div className="about-timeline">{universities.map((item) => <div key={item.id}><GraduationCap size={18}/><span><strong>{item.schoolName || item.major}</strong>{item.major && item.schoolName && <small>{item.major}</small>}<small>{[profileDateRange(item.from, item.to), item.isGraduate ? "Đã tốt nghiệp" : ""].filter(Boolean).join(" · ")}</small></span></div>)}</div></section>}
    {highSchools.length > 0 && <section><h3>Trường trung học</h3><div className="about-timeline">{highSchools.map((item) => <div key={item.id}><Library size={18}/><span><strong>{item.schoolName}</strong><small>{[profileDateRange(item.fromDate, item.toDate), item.isGraduate ? "Đã tốt nghiệp" : ""].filter(Boolean).join(" · ")}</small></span></div>)}</div></section>}
    {profile.hobbies.length > 0 && <section><h3>Sở thích</h3><div className="about-hobbies">{profile.hobbies.map((item) => <span key={item}>{item}</span>)}</div></section>}
    {profile.socialLinks.length > 0 && <section><h3>Liên kết</h3>{profile.socialLinks.map((item) => <a className="about-link-row" key={item.id} href={item.link.startsWith("http") ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer"><Link2 size={18}/><span><strong>{profileSocialLabel(item.link)}</strong><small>{item.link.replace(/^https?:\/\//, "")}</small></span><ExternalLink size={15}/></a>)}</section>}
  </div></section></div>, document.body);
}
type ProfileEditorKind = ProfileRecordKind;
type ProfileEntryDraft = {
    kind: ProfileEditorKind;
    id?: string;
    primary: string;
    secondary: string;
    from: string;
    to: string;
    isPublic: boolean;
    graduate: boolean;
};
function ProfileInformationEditor({ profile, onClose, onSaved }: {
    profile: Profile;
    onClose: () => void;
    onSaved: () => Promise<void>;
}) {
    useBodyScrollLock(true);
    const [currentCity, setCurrentCity] = useState(profile.currentCity || "");
    const [hometown, setHometown] = useState(profile.hometown || "");
    const [hobbies, setHobbies] = useState(profile.hobbies.join(", "));
    const [entry, setEntry] = useState<ProfileEntryDraft | null>(null);
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState("");
    async function commit(action: () => Promise<unknown>) { setBusy(true); setMessage(""); try {
        await action();
        await onSaved();
        setEntry(null);
        setMessage("Đã lưu thay đổi");
    }
    catch (error) {
        setMessage(error instanceof Error ? error.message : "Không thể lưu thay đổi");
    }
    finally {
        setBusy(false);
    } }
    function newEntry(kind: ProfileEditorKind) { setEntry({ kind, primary: "", secondary: "", from: "", to: "", isPublic: true, graduate: false }); }
    function editJob(item: Profile["jobs"][number]) { setEntry({ kind: "JOB", id: item.id, primary: item.position || "", secondary: item.companyName || "", from: item.fromDate || "", to: item.toDate || "", isPublic: item.isPublic, graduate: false }); }
    function editUniversity(item: Profile["universities"][number]) { setEntry({ kind: "UNIVERSITY", id: item.id, primary: item.schoolName || "", secondary: item.major || "", from: item.from || "", to: item.to || "", isPublic: item.isPublic, graduate: item.isGraduate }); }
    function editHighSchool(item: Profile["highSchools"][number]) { setEntry({ kind: "HIGH_SCHOOL", id: item.id, primary: item.schoolName || "", secondary: "", from: item.fromDate || "", to: item.toDate || "", isPublic: item.isPublic, graduate: item.isGraduate }); }
    function editSocial(item: Profile["socialLinks"][number]) { setEntry({ kind: "SOCIAL", id: item.id, primary: item.link, secondary: "", from: "", to: "", isPublic: true, graduate: false }); }
    async function saveEntry() {
        if (!entry || !entry.primary.trim())
            return;
        const method = entry.id ? "PUT" : "POST";
        if (entry.kind === "JOB")
            await commit(() => profileApi.saveJob({ id: entry.id, userId: profile.id, position: entry.primary.trim(), companyName: entry.secondary.trim() || null, from: entry.from || null, to: entry.to || null, isPublic: entry.isPublic }, method));
        if (entry.kind === "UNIVERSITY")
            await commit(() => profileApi.saveUniversity({ id: entry.id, userId: profile.id, schoolName: entry.primary.trim(), major: entry.secondary.trim() || null, from: entry.from || null, to: entry.to || null, isGraduate: entry.graduate, isPublic: entry.isPublic }, method));
        if (entry.kind === "HIGH_SCHOOL")
            await commit(() => profileApi.saveHighSchool({ id: entry.id, userId: profile.id, schoolName: entry.primary.trim(), from: entry.from || null, to: entry.to || null, isGraduate: entry.graduate, isPublic: entry.isPublic }, method));
        if (entry.kind === "SOCIAL")
            await commit(() => profileApi.saveSocialLink({ id: entry.id, userId: profile.id, link: entry.primary.trim() }, method));
    }
    async function remove(kind: ProfileEditorKind, id: string) { await commit(() => profileApi.removeRecord(kind, id)); }
    async function toggleJob(item: Profile["jobs"][number]) { await commit(() => profileApi.setRecordVisibility("JOB", item.id, !item.isPublic)); }
    async function toggleUniversity(item: Profile["universities"][number]) { await commit(() => profileApi.setRecordVisibility("UNIVERSITY", item.id, !item.isPublic)); }
    async function toggleHighSchool(item: Profile["highSchools"][number]) { await commit(() => profileApi.setRecordVisibility("HIGH_SCHOOL", item.id, !item.isPublic)); }
    return createPortal(<div className="profile-info-backdrop"><section className="profile-editor-panel" role="dialog" aria-modal="true" aria-label="Chỉnh sửa thông tin"><header><div><strong>Chỉnh sửa thông tin</strong></div><button className="icon-button" onClick={onClose} aria-label="Đóng"><X size={20}/></button></header><div className="profile-editor-body">
    <section><h3>Nơi sống</h3><label><span>Thành phố hiện tại</span><input value={currentCity} onChange={(event) => setCurrentCity(event.target.value)} placeholder="Đà Nẵng"/></label><label><span>Quê quán</span><input value={hometown} onChange={(event) => setHometown(event.target.value)} placeholder="TP. Hồ Chí Minh"/></label><label><span>Sở thích</span><input value={hobbies} onChange={(event) => setHobbies(event.target.value)} placeholder="Photography, Football"/></label><button className="profile-editor-save" disabled={busy} onClick={() => void commit(() => profileApi.updateBasicDetails({ userId: profile.id, livingIn: currentCity.trim(), homeTown: hometown.trim(), hobbieList: hobbies.split(",").map((item) => item.trim()).filter(Boolean) }))}>Lưu thông tin cơ bản</button></section>
    <ProfileEditorSection title="Công việc" onAdd={() => newEntry("JOB")}>{profile.jobs.map((item) => <ProfileEditorRow key={item.id} icon={Briefcase} title={profileJobLabel(item)} detail={profileDateRange(item.fromDate, item.toDate)} visible={item.isPublic} onToggle={() => void toggleJob(item)} onEdit={() => editJob(item)} onDelete={() => void remove("JOB", item.id)}/>)}</ProfileEditorSection>
    <ProfileEditorSection title="Đại học" onAdd={() => newEntry("UNIVERSITY")}>{profile.universities.map((item) => <ProfileEditorRow key={item.id} icon={GraduationCap} title={profileUniversityLabel(item)} detail={profileDateRange(item.from, item.to)} visible={item.isPublic} onToggle={() => void toggleUniversity(item)} onEdit={() => editUniversity(item)} onDelete={() => void remove("UNIVERSITY", item.id)}/>)}</ProfileEditorSection>
    <ProfileEditorSection title="Trường trung học" onAdd={() => newEntry("HIGH_SCHOOL")}>{profile.highSchools.map((item) => <ProfileEditorRow key={item.id} icon={Library} title={item.schoolName || "Trường trung học"} detail={profileDateRange(item.fromDate, item.toDate)} visible={item.isPublic} onToggle={() => void toggleHighSchool(item)} onEdit={() => editHighSchool(item)} onDelete={() => void remove("HIGH_SCHOOL", item.id)}/>)}</ProfileEditorSection>
    <ProfileEditorSection title="Liên kết mạng xã hội" onAdd={() => newEntry("SOCIAL")}>{profile.socialLinks.map((item) => <ProfileEditorRow key={item.id} icon={Link2} title={profileSocialLabel(item.link)} detail={item.link} onEdit={() => editSocial(item)} onDelete={() => void remove("SOCIAL", item.id)}/>)}</ProfileEditorSection>
  </div>{message && <p className="profile-editor-message" role="status">{message}</p>}{entry && <ProfileEntryForm draft={entry} busy={busy} onChange={setEntry} onCancel={() => setEntry(null)} onSave={() => void saveEntry()}/>}</section></div>, document.body);
}
function ProfileEditorSection({ title, onAdd, children }: {
    title: string;
    onAdd: () => void;
    children: ReactNode;
}) { return <section className="profile-editor-section"><header><h3>{title}</h3><button onClick={onAdd}><Plus size={15}/> Thêm</button></header><div>{children}</div></section>; }
function ProfileEditorRow({ icon: Icon, title, detail, visible, onToggle, onEdit, onDelete }: {
    icon: typeof User;
    title: string;
    detail?: string;
    visible?: boolean;
    onToggle?: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) { return <div className="profile-editor-row"><Icon size={18}/><span><strong>{title}</strong>{detail && <small>{detail}</small>}</span>{onToggle && <button className={`visibility-toggle ${visible ? "visible" : "hidden"}`} onClick={onToggle}>{visible ? "Hiển thị trên trang cá nhân" : "Ẩn khỏi trang cá nhân"}</button>}<button className="icon-button" onClick={onEdit} aria-label="Chỉnh sửa"><PenLine size={16}/></button><button className="icon-button danger" onClick={onDelete} aria-label="Xóa"><Trash2 size={16}/></button></div>; }
function ProfileEntryForm({ draft, busy, onChange, onCancel, onSave }: {
    draft: ProfileEntryDraft;
    busy: boolean;
    onChange: (draft: ProfileEntryDraft) => void;
    onCancel: () => void;
    onSave: () => void;
}) { const primaryLabel = draft.kind === "JOB" ? "Vị trí" : draft.kind === "SOCIAL" ? "Đường dẫn" : "Tên trường"; return <div className="profile-entry-form-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget)
    onCancel(); }}><form className="profile-entry-form" onSubmit={(event) => { event.preventDefault(); onSave(); }}><header><strong>{draft.id ? "Chỉnh sửa" : "Thêm thông tin"}</strong><button type="button" className="icon-button" onClick={onCancel}><X size={18}/></button></header><label><span>{primaryLabel}</span><input required value={draft.primary} onChange={(event) => onChange({ ...draft, primary: event.target.value })}/></label>{(draft.kind === "JOB" || draft.kind === "UNIVERSITY") && <label><span>{draft.kind === "JOB" ? "Công ty" : "Chuyên ngành"}</span><input value={draft.secondary} onChange={(event) => onChange({ ...draft, secondary: event.target.value })}/></label>}{draft.kind !== "SOCIAL" && <div className="profile-date-fields"><label><span>Từ</span><input type="date" value={draft.from} onChange={(event) => onChange({ ...draft, from: event.target.value })}/></label><label><span>Đến</span><input type="date" value={draft.to} onChange={(event) => onChange({ ...draft, to: event.target.value })}/></label></div>}{draft.kind !== "SOCIAL" && <label className="profile-check"><input type="checkbox" checked={draft.isPublic} onChange={(event) => onChange({ ...draft, isPublic: event.target.checked })}/><span>Hiển thị trên trang cá nhân</span></label>}{(draft.kind === "UNIVERSITY" || draft.kind === "HIGH_SCHOOL") && <label className="profile-check"><input type="checkbox" checked={draft.graduate} onChange={(event) => onChange({ ...draft, graduate: event.target.checked })}/><span>Đã tốt nghiệp</span></label>}<footer><button type="button" onClick={onCancel}>Hủy</button><button disabled={busy || !draft.primary.trim()}>Lưu</button></footer></form></div>; }
export function ConnectionsModal({ viewerId, profile, activeTab, onTabChange, onClose, onOpenProfile, onRelationshipRemoved }: {
    viewerId: string;
    profile: Profile | null;
    activeTab: ConnectionTab;
    onTabChange: (tab: ConnectionTab) => void;
    onClose: () => void;
    onOpenProfile: (userId: string) => Promise<void>;
    onRelationshipRemoved: (tab: ConnectionTab, row: ConnectionUserDto) => void;
}) {
    useBodyScrollLock(true);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<"RECENT" | "NAME">("RECENT");
    const [confirmTarget, setConfirmTarget] = useState<{
        row: ConnectionUserDto;
        kind: "REMOVE_FOLLOWER" | "UNFOLLOW";
    } | null>(null);
    const [actionPending, setActionPending] = useState(false);
    const ownProfile = profile?.id === viewerId;
    const { rows, state, error, load: loadConnections, changeRelationship, removeRelationship } = useProfileConnections({
        profileId: profile?.id,
        viewerId,
        tab: activeTab,
        query,
        sort,
    });
    const tabs: Array<{
        id: ConnectionTab;
        label: string;
    }> = [
        { id: "FOLLOWERS", label: "Followers" },
        { id: "FOLLOWING", label: "Following" },
        { id: "FRIENDS", label: "Friends" },
    ];
    useEffect(() => {
        function closeOnEscape(event: KeyboardEvent) {
            if (event.key !== "Escape")
                return;
            if (confirmTarget)
                setConfirmTarget(null);
            else
                onClose();
        }
        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [confirmTarget, onClose]);
    async function handleRelationship(row: ConnectionUserDto) {
        try {
            await changeRelationship(row);
        }
        catch {
            window.dispatchEvent(new CustomEvent("app-toast", { detail: "Không thể cập nhật mối quan hệ. Vui lòng thử lại." }));
            return;
        }
        void loadConnections();
    }
    async function confirmRelationshipRemoval() {
        if (!profile || !confirmTarget || actionPending)
            return;
        const { row, kind } = confirmTarget;
        const followerId = kind === "REMOVE_FOLLOWER" ? row.userId : profile.id;
        const followingId = kind === "REMOVE_FOLLOWER" ? profile.id : row.userId;
        setActionPending(true);
        try {
            await removeRelationship(followerId, followingId, row.userId);
            onRelationshipRemoved(activeTab, row);
            setConfirmTarget(null);
        }
        catch {
            // The connection flow retains the error for the modal's visible state.
        }
        finally {
            setActionPending(false);
        }
    }
    if (!profile)
        return null;
    return <div className="connections-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget)
        onClose(); }}>
    <section className="connections-modal" role="dialog" aria-modal="true" aria-label={`${profile.username} connections`}>
      <header className="connections-modal-header">
        <div>
          <strong>{profile.displayName}</strong>
          <small>@{profile.username}</small>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Close connections"><X size={20}/></button>
      </header>
      <div className="connections-tabs" role="tablist">
        {tabs.map((tab) => <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => onTabChange(tab.id)}>{tab.label}</button>)}
      </div>
      <div className="connections-tools">
        <label><Search size={18}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search connections"/></label>
        <select value={sort} onChange={(event) => setSort(event.target.value as "RECENT" | "NAME")} aria-label="Sort connections"><option value="RECENT">Recent</option><option value="NAME">Name</option></select>
      </div>
      {state === "loading" && <ConnectionsSkeleton />}
      {state === "error" && <div className="connection-state"><WifiOff size={24}/><strong>Failed loading state</strong><span>{error}</span><button onClick={() => void loadConnections()}>Retry</button></div>}
      {state === "ready" && rows.length === 0 && <div className="connection-state"><Users size={24}/><strong>{activeTab === "FRIENDS" ? "No mutual friends yet" : "No connections found"}</strong><span>{query ? "Try a different search." : "This list is currently empty."}</span></div>}
      {state === "ready" && rows.length > 0 && <div className="connections-list">
        {rows.map((row) => {
                const ownFollowerAction = ownProfile && activeTab === "FOLLOWERS";
                const ownFollowingAction = ownProfile && activeTab === "FOLLOWING";
                return <div key={`${row.userId}-${row.id}`} className="connection-row simple">
            <button className="connection-identity" onClick={() => void onOpenProfile(row.userId)}>
              <Avatar src={row.avatarUrl || ""} label={row.username}/>
              <span><strong>{row.displayName}</strong><small>@{row.username}</small>{row.mutualContext && <em>{row.mutualContext}</em>}</span>
            </button>
            {ownFollowerAction && <button className="relationship-action secondary" onClick={() => setConfirmTarget({ row, kind: "REMOVE_FOLLOWER" })}>Xóa</button>}
            {ownFollowingAction && <button className="relationship-action secondary" onClick={() => setConfirmTarget({ row, kind: "UNFOLLOW" })}>Đang theo dõi</button>}
            {!ownFollowerAction && !ownFollowingAction && <button className={row.friend ? "relationship-action friend" : "relationship-action"} onClick={() => void handleRelationship(row)} disabled={row.relationshipAction === "You" || row.relationshipAction === "Friend"}>{row.relationshipAction}</button>}
          </div>;
            })}
      </div>}
    </section>
    {confirmTarget && <div className="connection-confirm-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !actionPending)
            setConfirmTarget(null); }}>
      <section className="connection-confirm-dialog" role="alertdialog" aria-modal="true" aria-label={confirmTarget.kind === "REMOVE_FOLLOWER" ? "Remove follower" : "Unfollow user"}>
        <Avatar src={confirmTarget.row.avatarUrl || ""} label={confirmTarget.row.username}/>
        <p>{confirmTarget.kind === "REMOVE_FOLLOWER" ? `${confirmTarget.row.username} sẽ không biết bạn đã xóa họ khỏi danh sách.` : `Xác nhận bỏ theo dõi ${confirmTarget.row.username}?`}</p>
        <div className="connection-confirm-actions">
          <button className="confirm" onClick={() => void confirmRelationshipRemoval()} disabled={actionPending}>{actionPending ? "Đang xử lý..." : confirmTarget.kind === "REMOVE_FOLLOWER" ? "Xóa" : "Bỏ theo dõi"}</button>
          <button onClick={() => setConfirmTarget(null)} disabled={actionPending}>Hủy</button>
        </div>
      </section>
    </div>}
  </div>;
}
function ConnectionsSkeleton() { return <div className="connections-list loading" aria-label="Loading connections">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="connection-row skeleton"><span /><div><i /><i /></div><b /></div>)}</div>; }
function ConfirmDialog({ title, detail, onCancel, onConfirm }: {
    title: string;
    detail: string;
    onCancel: () => void;
    onConfirm: () => void;
}) { return <div className="confirm-backdrop" role="dialog" aria-modal="true"><div className="confirm-dialog"><strong>{title}</strong><p>{detail}</p><button onClick={onCancel}>Cancel</button><button className="danger" onClick={onConfirm}>Confirm</button></div></div>; }
