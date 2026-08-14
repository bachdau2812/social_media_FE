# Create Post Step 2 Accordion And Music Range Design

## Goal

Make each media item in Step 2 directly expandable for caption and single-track music editing, with a draggable and automatically previewed music range.

## Design

- The right panel becomes a single accordion list. Each row shows media order, thumbnail, filename, caption state, and music state.
- Opening a row selects that media for the left preview and closes the previously expanded row.
- The expanded row contains item actions, caption input, and music selection for images. Video items do not expose item music.
- Each image stores one `music` object. Choosing another track replaces the existing selection.
- Choosing a track starts playback of its default clip immediately.
- Start and End handles remain constrained to `Start < End` and the track duration.
- The selected waveform window is draggable to move the complete interval without changing its length.
- Releasing a range handle or the draggable interval restarts playback from the updated Start and stops at End.
- The editor removes the repeated item-music heading, selected-segment summary, duration summary, and Preview/Restart action.
- Play, Replace, and Remove remain centered as smaller rounded controls.
