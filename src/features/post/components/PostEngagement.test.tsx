import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { EngagementListModal } from './PostEngagement';
import { postApi } from '../api/post.api';
import { profileApi } from '../../profile';
vi.mock('../api/post.api', () => ({ postApi: { engagementActors: vi.fn() } }));
vi.mock('../../profile', () => ({ profileApi: { getSummary: vi.fn() } }));
afterEach(cleanup);
it('keeps failed identities visible and retries actor pagination', async () => {
  vi.mocked(postApi.engagementActors).mockResolvedValueOnce({ content: ['u1'], pageNumber: 0, totalPages: 2, totalElements: 2 }).mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ content: ['u2'], pageNumber: 1, totalPages: 2, totalElements: 2 });
  vi.mocked(profileApi.getSummary).mockRejectedValue(new Error('identity offline'));
  render(<EngagementListModal postId="p" kind="LIKES" viewerId="v" onClose={vi.fn()} onOpenProfile={vi.fn(async () => undefined)} />);
  await screen.findByText('u1'); fireEvent.click(screen.getByText('Load more people'));
  fireEvent.click(await screen.findByText('Retry loading people'));
  await screen.findByText('u2'); expect(screen.getByText('u1')).toBeInTheDocument();
});
