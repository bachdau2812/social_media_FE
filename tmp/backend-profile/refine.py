from pathlib import Path
r=Path(r'D:/Learning/Javaaa/Learn_Backend/Spring_WebFlux/appp/social_media')
p=r/'src/main/java/com/dauducbach/clone/modules/post/service/post/PostProfileQueryService.java'
s=p.read_text(); s=s.replace('    @org.springframework.beans.factory.annotation.Autowired\n    private com.dauducbach.clone.modules.post.repository.SavedItemRepository savedItemRepository;','    private final com.dauducbach.clone.modules.post.repository.SavedItemRepository savedItemRepository;')
s=s.replace('.onErrorReturn(Optional.empty());','.onErrorResume(error -> strict ? Mono.error(error) : Mono.just(Optional.empty()));')
p.write_text(s)
p=r/'src/test/java/com/dauducbach/clone/modules/post/service/post/PostProfileQueryServiceTest.java'
s=p.read_text().replace('contentQuery, detailQuery, repostService, interactionQuery, identityQuery);','contentQuery, detailQuery, repostService, interactionQuery, identityQuery,\n                mock(com.dauducbach.clone.modules.post.repository.SavedItemRepository.class));');p.write_text(s)
p=r/'src/test/java/com/dauducbach/clone/modules/post/service/post/ProfilePaginationContractTest.java'
s=p.read_text().replace('interactions,identities);','interactions,identities,saves);').replace('  ReflectionTestUtils.setField(service,"savedItemRepository",saves);\n','').replace('mock(PostInteractionQuery.class),mock(UserIdentityQuery.class));','mock(PostInteractionQuery.class),mock(UserIdentityQuery.class),mock(SavedItemRepository.class));')
s=s.replace(' @Test void exposesPaginatedAuthorContract()', ''' @Test void serializesFlatSeedAndSavedFlag() throws Exception {
  var post=new com.dauducbach.clone.modules.frontend.dto.ProfilePostResponse("p","u","name","Name","avatar","text",java.util.List.of(),"4:3",null,null,7,8,9,true,true,null,null);
  var row=new com.dauducbach.clone.modules.frontend.dto.ProfilePostsPageResponse.TimelinePostResponse(post,true);
  var json=new com.fasterxml.jackson.databind.ObjectMapper().valueToTree(row);
  assertEquals("p",json.get("postId").asText()); assertTrue(json.get("savedByCurrentUser").asBoolean());
  assertTrue(json.get("likedByCurrentUser").asBoolean()); assertEquals(7,json.get("likeCount").asLong()); assertFalse(json.has("post"));
 }
 @Test void exposesPaginatedAuthorContract()''')
s=s.replace('import org.springframework.test.util.ReflectionTestUtils;\n','');p.write_text(s)
