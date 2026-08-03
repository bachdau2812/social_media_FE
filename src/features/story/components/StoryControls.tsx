import { MoreHorizontal, Pause, Play, Volume2, VolumeX } from "lucide-react";

type StoryControlsProps = {
  audible: boolean;
  muted: boolean;
  paused: boolean;
  ownStory: boolean;
  onToggleMuted: () => void;
  onTogglePaused: () => void;
  onToggleMore: () => void;
};

export function StoryControls({ audible, muted, paused, ownStory, onToggleMuted, onTogglePaused, onToggleMore }: StoryControlsProps) {
  return <div className="story-actions" onPointerDown={(event) => event.stopPropagation()}>
    {audible && <button className="story-control" onClick={onToggleMuted} aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>}
    <button className="story-control" onClick={onTogglePaused} aria-label={paused ? "Resume story" : "Pause story"}>{paused ? <Play size={18} /> : <Pause size={18} />}</button>
    {ownStory && <button className="story-control" onClick={onToggleMore} aria-label="More options"><MoreHorizontal size={18} /></button>}
  </div>;
}
