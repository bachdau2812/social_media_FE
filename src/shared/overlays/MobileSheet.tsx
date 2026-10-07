import { X } from 'lucide-react';
import { type ReactNode, useLayoutEffect, useRef } from 'react';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useVisualViewportSurface } from '../hooks/useVisualViewportSurface';
import './mobile-sheet.css';

export function MobileSheet({ title, onClose, children, className = '', ariaLabel = title, closeLabel = `Close ${title}` }: { title: string; onClose: () => void; children: ReactNode; className?: string; ariaLabel?: string; closeLabel?: string }) {
  useBodyScrollLock(true);
  const style = useVisualViewportSurface(true);
  const panel = useRef<HTMLElement>(null);
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  useLayoutEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const restored: Array<{ node: HTMLElement; inert: boolean }> = [];
    let current: HTMLElement | null = panel.current?.parentElement ?? null;
    while (current?.parentElement) {
      for (const sibling of Array.from(current.parentElement.children)) {
        if (sibling !== current && sibling instanceof HTMLElement) { restored.push({ node: sibling, inert: sibling.inert }); sibling.inert = true; }
      }
      current = current.parentElement;
      if (current === document.body) break;
    }
    panel.current?.querySelector<HTMLButtonElement>('button')?.focus();
    return () => { restored.forEach(({ node, inert }) => { node.inert = inert; }); if (trigger?.isConnected) trigger.focus({ preventScroll: true }); };
  }, []);
  return <div className="mobile-sheet-backdrop" style={style} onPointerDown={event => { event.stopPropagation(); if (event.target === event.currentTarget) onClose(); }} onPointerUp={event => event.stopPropagation()}>
    <section ref={panel} className={`mobile-sheet ${className}`} role="dialog" aria-modal="true" aria-label={ariaLabel} onKeyDown={event => {
      if (event.key === 'Escape') { event.stopPropagation(); onClose(); }
      if (event.key !== 'Tab') return;
      event.stopPropagation();
      const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),a[href],[tabindex="0"]')).filter(node => !node.closest('[hidden],[inert]'));
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <header className="mobile-sheet-header" onPointerDown={event => {
        if ((event.target as Element).closest('button,input,textarea,select')) return;
        start.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
        event.currentTarget.setPointerCapture?.(event.pointerId);
      }} onPointerCancel={() => { start.current = null; }} onPointerUp={event => {
        const origin = start.current; start.current = null;
        if (origin && origin.id === event.pointerId && event.clientY - origin.y > 64 && event.clientY - origin.y > Math.abs(event.clientX - origin.x) * 1.5) onClose();
      }}>
        <span className="mobile-sheet-handle" aria-hidden="true" />
        <h2>{title}</h2><button type="button" onClick={onClose} aria-label={closeLabel}><X size={22} /></button>
      </header>
      <div className="mobile-sheet-content" onPointerDown={event => {
        const target = event.target as Element;
        if (target.closest('button,a,input,textarea,select,video,img,[role="button"]') || window.getSelection()?.toString()) return;
        let node = target instanceof HTMLElement ? target : target.parentElement;
        while (node && node !== panel.current) { if (node.scrollTop > 0) return; node = node.parentElement; }
        start.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
      }} onPointerCancel={() => { start.current = null; }} onPointerUp={event => {
        const origin = start.current; start.current = null;
        if (origin && origin.id === event.pointerId && event.clientY - origin.y > 80 && event.clientY - origin.y > Math.abs(event.clientX - origin.x) * 1.5) onClose();
      }}>{children}</div>
    </section>
  </div>;
}
