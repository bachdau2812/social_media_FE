import type { ReactNode } from "react";

export function SettingsGroup({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return <section className="settings-feature-group"><header><h3>{title}</h3>{description && <p>{description}</p>}</header><div>{children}</div></section>;
}

export function ToggleRow({ label, detail, checked, onChange }: { label: string; detail?: string; checked: boolean; onChange: () => void }) {
  return <label className="settings-feature-row"><span><strong>{label}</strong>{detail && <small>{detail}</small>}</span><input type="checkbox" checked={checked} onChange={onChange} /><i aria-hidden="true" /></label>;
}

export function ChoiceRow({ label, value, options, onChange }: { label: string; value: string; options: Array<{ value: string; label: string }>; onChange: (value: string) => void }) {
  return <div className="settings-feature-choice"><strong>{label}</strong><div>{options.map((option) => <button key={option.value} className={value === option.value ? "active" : ""} onClick={() => onChange(option.value)}>{option.label}</button>)}</div></div>;
}
