import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { PostDetail } from './PostDetail';
import { commentApi } from '../api/comment.api';
import { postApi } from '../api/post.api';
import type { Post } from '../model/post.types';
vi.mock('../api/comment.api', () => ({ commentApi: { pageByPost: vi.fn(), replies: vi.fn(), create: vi.fn(), byId: vi.fn() } }));
vi.mock('../api/post.api', () => ({ postApi: { getSurfaceDetail: vi.fn() } }));
const post: Post = { id: 'p', author: { id: 'a', username: 'author', displayName: 'Author', avatarUrl: '' }, createdAt: '', caption: '', layoutVariant: 'TEXT', mediaRatio: '1:1', media: [], engagement: { likes: 0, comments: 0, reposts: 0, saves: 0, shares: 0 }, viewerState: { liked: false, saved: false, reposted: false }, comments: [] };
const comment = (id: string, replyCount = 0) => ({ id, postId: 'p', userId: 'u', content: id, username: 'someone', replyCount });
const page = (ids: string[], pageNumber: number) => ({ content: ids.map(id => comment(id)), pageNumber, totalPages: 3, totalElements: 25 });
beforeEach(() => { vi.clearAllMocks(); vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined); vi.mocked(postApi.getSurfaceDetail).mockRejectedValue(new Error('offline')); });
afterEach(cleanup);
function mount() { return render(<PostDetail presentation="discussion" post={post} viewerId="v" onClose={vi.fn()} onTogglePost={vi.fn()} onCommentCreated={vi.fn()} onEdit={vi.fn()} onArchive={vi.fn()} onOpenProfile={vi.fn(async () => undefined)} />); }
it('retains loaded root pages after sending a root comment', async () => {
  vi.mocked(commentApi.pageByPost).mockImplementation(async (_p, _v, n = 0) => page(n ? ['loaded-later'] : ['first'], n));
  vi.mocked(commentApi.create).mockResolvedValue({ commentId: 'created' });
  vi.mocked(commentApi.byId).mockResolvedValue(comment('created'));
  mount(); await screen.findByText('first');
  fireEvent.click(screen.getByText('Load more comments')); await screen.findByText('loaded-later');
  fireEvent.change(screen.getByRole('textbox', { name: 'Add a comment' }), { target: { value: 'new root' } });
  fireEvent.click(screen.getByRole('button', { name: 'Post' }));
  await waitFor(() => expect(commentApi.create).toHaveBeenCalled());
  await screen.findByText('created'); expect(screen.getByText('loaded-later')).toBeInTheDocument();
});
it('retries a failed root page without discarding loaded comments', async () => {
  vi.mocked(commentApi.pageByPost).mockResolvedValueOnce(page(['first'], 0)).mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(page(['later'], 1));
  mount(); await screen.findByText('first'); fireEvent.click(screen.getByText('Load more comments'));
  fireEvent.click(await screen.findByText('Retry loading comments'));
  await screen.findByText('later'); expect(screen.getByText('first')).toBeInTheDocument();
});
it('loads reply pages beyond the first ten', async () => {
  vi.mocked(commentApi.pageByPost).mockResolvedValue({ ...page([], 0), content: [comment('root', 12)] });
  vi.mocked(commentApi.replies).mockResolvedValueOnce(Array.from({ length: 10 }, (_, i) => ({ ...comment('reply-' + i), parentId: 'root' }))).mockResolvedValueOnce([{ ...comment('last-reply'), parentId: 'root' }]);
  mount(); await screen.findByText('root'); fireEvent.click(screen.getByText('View replies'));
  fireEvent.click(await screen.findByText('Load more replies')); await screen.findByText('last-reply');
  expect(commentApi.replies).toHaveBeenLastCalledWith('root', 'v', 1, 10);
});
it('retains an unsent draft when the same post discussion is reopened', async () => {
  vi.mocked(commentApi.pageByPost).mockResolvedValue(page([], 0));
  const first = mount();
  fireEvent.change(screen.getByRole('textbox', { name: 'Add a comment' }), { target: { value: 'Keep this draft' } });
  first.unmount(); mount();
  expect(screen.getByRole('textbox', { name: 'Add a comment' })).toHaveValue('Keep this draft');
});
