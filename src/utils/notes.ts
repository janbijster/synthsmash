export enum NoteColor {
    White,
    Black,
}

export type NoteName =
    | 'C'
    | 'C#'
    | 'D'
    | 'D#'
    | 'E'
    | 'F'
    | 'F#'
    | 'G'
    | 'G#'
    | 'A'
    | 'A#'
    | 'B'

export type Note = {
    name: string
    baseName: NoteName
    midi: number
    color: NoteColor
    on?: boolean
}

export const octaveNotes: Note[] = [
    { name: 'C', baseName: 'C', midi: 24, color: NoteColor.White },
    { name: 'C#', baseName: 'C#', midi: 25, color: NoteColor.Black },
    { name: 'D', baseName: 'D', midi: 26, color: NoteColor.White },
    { name: 'D#', baseName: 'D#', midi: 27, color: NoteColor.Black },
    { name: 'E', baseName: 'E', midi: 28, color: NoteColor.White },
    { name: 'F', baseName: 'F', midi: 29, color: NoteColor.White },
    { name: 'F#', baseName: 'F#', midi: 30, color: NoteColor.Black },
    { name: 'G', baseName: 'G', midi: 31, color: NoteColor.White },
    { name: 'G#', baseName: 'G#', midi: 32, color: NoteColor.Black },
    { name: 'A', baseName: 'A', midi: 33, color: NoteColor.White },
    { name: 'A#', baseName: 'A#', midi: 34, color: NoteColor.Black },
    { name: 'B', baseName: 'B', midi: 35, color: NoteColor.White },
]

export const getOctave = (octaveNumber: number = 1) =>
    octaveNotes.map((note) => ({
        name: `${note.name}${octaveNumber}`,
        baseName: note.baseName,
        midi: note.midi + (octaveNumber - 1) * 12,
        color: note.color,
    }))

export const getNotes = (startOctave: number, numOctaves: number = 2) => {
    let notes: Note[] = []
    for (let i = 0; i < numOctaves; i++) {
        notes = [...notes, ...getOctave(i + startOctave)]
    }
    return notes
}
