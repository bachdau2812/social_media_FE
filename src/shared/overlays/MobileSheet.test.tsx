import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MobileSheet } from './MobileSheet';

describe('MobileSheet', () => {
  it('focuses close, traps focus, dismisses Escape and restores its trigger', () => {
    const trigger = document.createElement('button');
    document.body.append(trigger); trigger.focus();
    const close = vi.fn();
    const view = render(<MobileSheet title="Comments" onClose={close}><button>Last action</button></MobileSheet>);
    const button = screen.getByRole('button', { name: 'Close Comments' });
    expect(button).toHaveFocus();
    screen.getByText('Last action').focus();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Tab' });
    expect(button).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(close).toHaveBeenCalledOnce();
    view.unmount(); expect(trigger).toHaveFocus(); trigger.remove();
  });
});
