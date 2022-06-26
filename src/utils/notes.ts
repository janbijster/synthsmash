export enum NoteColor {
  White,
  Black,
}

export type Note = {
  name: string;
  midi: number;
  color: NoteColor;
  on?: boolean;
};

export const octaveNotes: Note[] = [
  { name: "C", midi: 24, color: NoteColor.White },
  { name: "C#", midi: 25, color: NoteColor.Black },
  { name: "D", midi: 26, color: NoteColor.White },
  { name: "D#", midi: 27, color: NoteColor.Black },
  { name: "E", midi: 28, color: NoteColor.White },
  { name: "F", midi: 29, color: NoteColor.White },
  { name: "F#", midi: 30, color: NoteColor.Black },
  { name: "G", midi: 31, color: NoteColor.White },
  { name: "G#", midi: 32, color: NoteColor.Black },
  { name: "A", midi: 33, color: NoteColor.White },
  { name: "A#", midi: 34, color: NoteColor.Black },
  { name: "B", midi: 35, color: NoteColor.White },
];

export const getOctave = (octaveNumber: number = 1) =>
  octaveNotes.map((note) => ({
    name: `${note.name}${octaveNumber}`,
    midi: note.midi + (octaveNumber - 1) * 12,
    color: note.color,
  }));

export const getNotes = (startOctave: number, numOctaves: number = 2) => {
  let notes: Note[] = [];
  for (let i = 0; i < numOctaves; i++) {
    notes = [...notes, ...getOctave(i + startOctave)];
  }
  return notes;
};
