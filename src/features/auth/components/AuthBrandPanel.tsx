import { Heart, MessageCircle } from "lucide-react";

export function AuthMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "auth-mark auth-mark-compact" : "auth-mark"} aria-label="Social">
      <span className="auth-mark-glyph"><MessageCircle size={compact ? 18 : 21} aria-hidden="true" /></span>
      <span className="auth-mark-copy"><strong>Social</strong><small>your space</small></span>
    </span>
  );
}

export function AuthBrandPanel() {
  return (
    <section className="auth-brand-panel" data-testid="auth-brand-panel" aria-label="Social">
      <div className="auth-brand-story">
        <h2>Closer to what matters.</h2>
        <p className="auth-brand-description">A quieter place to stay close.</p>
      </div>
      <div className="auth-editorial-collage" data-testid="auth-editorial-collage" aria-hidden="true">
        <article className="auth-media-frame auth-media-main">
          <div className="auth-story-progress"><i /><i /><i /></div>
          <div className="auth-media-art auth-media-art-one"><span /><span /></div>
          <footer><span className="auth-mini-avatar" /><span><b>Morning journal</b><small>12 minutes ago</small></span></footer>
        </article>
        <article className="auth-media-frame auth-media-side">
          <div className="auth-media-art auth-media-art-two"><span /><span /></div>
          <div className="auth-reaction-chip"><Heart size={13} fill="currentColor" /> 128</div>
        </article>
        <article className="auth-media-frame auth-media-wide">
          <div className="auth-media-art auth-media-art-three"><span /><span /><span /></div>
        </article>
        <article className="auth-message-card">
          <span className="auth-mini-avatar" />
          <p><b>Such a good day.</b><small>Let&apos;s do this again soon.</small></p>
          <MessageCircle size={17} />
        </article>
      </div>
      <p className="auth-brand-note">Private by intention. Personal by design.</p>
    </section>
  );
}
