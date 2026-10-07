from pathlib import Path
root=Path(r'D:/Learning/Javaaa/Learn_Backend/Spring_WebFlux/appp/social_media')
base=root/'src/main/java/com/dauducbach/clone/modules'
def edit(rel,old,new):
 p=base/rel
 assert p.resolve().is_relative_to(root.resolve())
 s=p.read_text(encoding='utf-8'); assert old in s,rel
 p.write_text(s.replace(old,new),encoding='utf-8')
def insert(rel,marker,s): edit(rel,marker,s+'\n'+marker)
insert('post/publicapi/PostProfileQuery.java','    record ProfilePostSnapshot(','''    reactor.core.publisher.Mono<ProfilePostsPage> getPostsPage(String viewerId, String userId, int page, int size, String selectedPostId);
    record TimelinePostSnapshot(ProfilePostSnapshot post, boolean savedByCurrentUser) {}
    record ProfilePostsPage(String userId, List<TimelinePostSnapshot> posts, int pageNumber, int pageSize,
                            boolean hasMore, boolean hasPrevious, boolean selectedPostFound) {}
''')
insert('post/repository/SavedItemRepository.java','    @Query("SELECT * FROM saved_items', '''    @Query("SELECT EXISTS(SELECT 1 FROM saved_items WHERE user_id = :userId AND post_id = :postId)")
    Mono<Boolean> existsByUserIdAndPostId(String userId, String postId);
''')
insert('post/repository/PostDetailsRepository.java','    Flux<PostDetails> findAllByUserId(String userId);','''    @Query("""
            SELECT COUNT(*) FROM post_details p
            WHERE p.user_id = :userId AND p.validate_status = 'APPROVED'
              AND NOT EXISTS (SELECT 1 FROM user_archive_items a WHERE a.content_id = p.post_id AND UPPER(a.content_type) = 'POST')
              AND (p.created_at > :createdAt OR (p.created_at = :createdAt AND p.post_id > :postId))
            """)
    Mono<Long> countEligibleAuthorPostsBefore(String userId, java.time.Instant createdAt, String postId);
''')
insert('post/query/PostContentQueryService.java','    public Flux<PostDetails> findByAuthorId(','''    public Mono<Long> findAuthorPostPosition(String userId, String postId) {
        return postDetailsRepository.findApprovedFeedEligibleById(postId)
                .filter(post -> userId.equals(post.getUserId()))
                .flatMap(post -> postDetailsRepository.countEligibleAuthorPostsBefore(userId, post.getCreatedAt(), postId));
    }
''')
insert('post/service/post/PostProfileQueryService.java','    private Mono<PostProfileQuery.ProfilePostSnapshot> hydrate(','''    @org.springframework.beans.factory.annotation.Autowired
    private com.dauducbach.clone.modules.post.repository.SavedItemRepository savedItemRepository;

    @Override
    public Mono<ProfilePostsPage> getPostsPage(String viewerId, String userId, int page, int size, String selectedPostId) {
        int safeSize = size <= 0 ? 18 : Math.min(size, 50);
        int safePage = Math.min(Math.max(page, 0), Integer.MAX_VALUE / safeSize - 1);
        boolean selected = selectedPostId != null && !selectedPostId.isBlank();
        Mono<Long> position = selected ? postContentQueryService.findAuthorPostPosition(userId, selectedPostId)
                .defaultIfEmpty(-1L) : Mono.just(-1L);
        return position.flatMap(index -> {
            int actualPage = index < 0 ? safePage : (int) Math.min(index / safeSize, Integer.MAX_VALUE / safeSize - 1);
            return postContentQueryService.findByAuthorId(userId, actualPage, safeSize).collectList()
                    .flatMap(rows -> {
                        Mono<Boolean> more = postContentQueryService.findByAuthorId(userId, actualPage + 1, safeSize).hasElements();
                        Mono<java.util.List<TimelinePostSnapshot>> posts = Flux.fromIterable(rows)
                                .concatMap(post -> Mono.zip(hydrate(viewerId, post, true),
                                        savedItemRepository.existsByUserIdAndPostId(viewerId, post.getPostId()))
                                        .map(tuple -> new TimelinePostSnapshot(tuple.getT1(), tuple.getT2())))
                                .collectList();
                        return Mono.zip(posts, more).map(tuple -> new ProfilePostsPage(userId, tuple.getT1(),
                                actualPage, safeSize, tuple.getT2(), actualPage > 0, selected && index >= 0));
                    });
        });
    }
''')
edit('post/service/post/PostProfileQueryService.java','    private Mono<PostProfileQuery.ProfilePostSnapshot> hydrate(String viewerId, PostDetails post) {','''    private Mono<PostProfileQuery.ProfilePostSnapshot> hydrate(String viewerId, PostDetails post) {
        return hydrate(viewerId, post, false);
    }
    private Mono<PostProfileQuery.ProfilePostSnapshot> hydrate(String viewerId, PostDetails post, boolean strict) {''')
edit('post/service/post/PostProfileQueryService.java','                .onErrorReturn(new PostInteractionQuery.Snapshot(0, 0, 0, false, false));','''                .onErrorResume(error -> strict ? Mono.error(error)
                        : Mono.just(new PostInteractionQuery.Snapshot(0, 0, 0, false, false)));''')
edit('post/service/post/PostProfileQueryService.java','        return Mono.zip(author, firstItem, interactions)','''        Mono<Optional<PostPresentationSnapshot.Music>> music = strict
                ? postDetailQueryService.getMusicResponse(post.getMusicId(), post.getMusicStart(), post.getMusicEnd())
                    .map(this::toSnapshotMusic).map(Optional::of).defaultIfEmpty(Optional.empty())
                : Mono.just(Optional.empty());
        return Mono.zip(author, firstItem, interactions, music)''')
edit('post/service/post/PostProfileQueryService.java','                        null,\n                        tuple.getT3().likes(),','                        tuple.getT4().orElse(null),\n                        tuple.getT3().likes(),')
insert('frontend/service/ProfileScreenService.java','    public Mono<ProfileSummaryResponse> getProfile(','''    public Mono<com.dauducbach.clone.modules.frontend.dto.ProfilePostsPageResponse> getPosts(
            String viewerId, String userId, int page, int size, String selectedPostId) {
        return postProfileQueryService.getPostsPage(viewerId, userId, page, size, selectedPostId)
                .map(result -> new com.dauducbach.clone.modules.frontend.dto.ProfilePostsPageResponse(
                        result.userId(), result.posts().stream().map(row ->
                            new com.dauducbach.clone.modules.frontend.dto.ProfilePostsPageResponse.TimelinePostResponse(
                                toProfilePost(row.post()), row.savedByCurrentUser())).toList(),
                        result.pageNumber(), result.pageSize(), result.hasMore(), result.hasPrevious(), result.selectedPostFound()));
    }
''')
insert('frontend/controller/FrontendProfileController.java','    @GetMapping("/{userId}/summary")','''    @GetMapping("/{userId}/posts")
    public Mono<ApiResponse<com.dauducbach.clone.modules.frontend.dto.ProfilePostsPageResponse>> getPosts(
            @PathVariable String userId, @RequestParam(required = false) String viewerId,
            Authentication authentication, @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "18") int size, @RequestParam(required = false) String selectedPostId) {
        String viewer = viewerId == null || viewerId.isBlank() ? authentication.getName()
                : ActorIdentity.require(authentication.getName(), viewerId);
        return service.getPosts(viewer, userId, page, size, selectedPostId)
                .map(result -> ApiResponse.<com.dauducbach.clone.modules.frontend.dto.ProfilePostsPageResponse>builder()
                        .message("Profile posts fetched").result(result).build());
    }
''')
(base/'frontend/dto/ProfilePostsPageResponse.java').write_text('''package com.dauducbach.clone.modules.frontend.dto;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import java.util.List;
public record ProfilePostsPageResponse(String userId, List<TimelinePostResponse> posts, int pageNumber,
                                       int pageSize, boolean hasMore, boolean hasPrevious, boolean selectedPostFound) {
    public record TimelinePostResponse(@JsonUnwrapped ProfilePostResponse post, boolean savedByCurrentUser) {}
}
''',encoding='utf-8')
