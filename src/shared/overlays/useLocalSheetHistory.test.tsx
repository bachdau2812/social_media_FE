import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocalSheetHistory } from './useLocalSheetHistory';
function Sheet({ close }: { close: () => void }) { const dismiss = useLocalSheetHistory('likes', close); return <button onClick={dismiss}>Dismiss</button>; }
function Harness({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false); const location = useLocation(), navigate = useNavigate();
  return <><output>{location.pathname}:{location.state?.localSheet?.id ?? 'base'}:{location.state?.depth}</output><button onClick={() => setOpen(true)}>Open</button><button onClick={() => navigate(-1)}>Back</button>{open && <Sheet close={() => { onClose(); setOpen(false); }} />}</>;
}
it('pushes same URL preserving state and Back dismisses the foreground sheet', async () => {
  const close = vi.fn();
  render(<MemoryRouter initialEntries={[{ pathname: '/post/p', state: { depth: 4 } }]}><Harness onClose={close} /></MemoryRouter>);
  fireEvent.click(screen.getByText('Open')); await screen.findByText('/post/p:likes:4');
  fireEvent.click(screen.getByText('Back')); await waitFor(() => expect(close).toHaveBeenCalledOnce());
  expect(screen.getByText('/post/p:base:4')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Open')); await screen.findByText('/post/p:likes:4');
  fireEvent.click(screen.getByText('Dismiss')); await waitFor(() => expect(close).toHaveBeenCalledTimes(2));
});
