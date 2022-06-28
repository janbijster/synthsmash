import { getNotes, Note } from '../utils/notes'
import { useEventListener } from '../utils/hooks'
import { computerKeyboardMapping } from '../utils/keys'
import { useState } from 'react'
import { playNote } from '../utils/tone'
import NoteDisplay from './NoteDisplay'

type KeyboardProps = {
    startOctave?: number
    numOctaves?: number
}

export type NoteEvent = {
    note: Note
    start: number
    end?: number
}

const Keyboard = ({ startOctave = 1, numOctaves = 2 }: KeyboardProps) => {
    const [notes, setNotes] = useState(getNotes(startOctave, numOctaves))
    const [noteEvents, setNoteEvents] = useState<NoteEvent[]>([])

    const toggleNote = (index: number, value: boolean) => {
        const newNotes = [...notes]
        newNotes[index].on = value
        setNotes(newNotes)
    }

    const startNoteEvent = (note: Note) => {
        setNoteEvents([
            ...noteEvents,
            {
                note,
                start: Date.now(),
            },
        ])
    }

    const endNoteEvent = (note: Note) => {
        const noteEvent = noteEvents.find(
            (event) => event.note.midi === note.midi
        )
        if (noteEvent) {
            setNoteEvents([
                ...noteEvents.filter((event) => event !== noteEvent),
                {
                    ...noteEvent,
                    end: Date.now(),
                },
            ])
        } else {
            console.warn('note event not found')
        }
    }

    // TODO remove old note events?

    const toggleMidiNote = (midi: number, value: boolean) => {
        const noteIndex = notes.findIndex((note) => note.midi === midi)
        if (noteIndex > -1) {
            toggleNote(noteIndex, value)
            const note = notes[noteIndex]
            if (value) {
                playNote(note.name)
                startNoteEvent(note)
            } else {
                endNoteEvent(note)
            }
        }
    }

    useEventListener('keydown', (event: KeyboardEvent) => {
        const midi = computerKeyboardMapping[event.key] // TODO capslock
        toggleMidiNote(midi, true)
    })

    useEventListener('keyup', (event: KeyboardEvent) => {
        const midi = computerKeyboardMapping[event.key] // TODO capslock
        toggleMidiNote(midi, false)
    })

    return <NoteDisplay notes={notes} events={noteEvents} />
}

export default Keyboard
