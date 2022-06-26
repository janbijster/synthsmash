import { getNotes, NoteColor } from "../utils/notes";
import styles from "./Keyboard.module.css";
import {useEventListener} from "../utils/hooks";
import { computerKeyboardMapping } from "../utils/keys";
import { useState } from "react";

type KeyboardProps = {
  startOctave?: number;
  numOctaves?: number;
};

const getKeyClass = (color: NoteColor) =>
  color === NoteColor.Black ? styles.black : styles.white;

const Keyboard = ({ startOctave = 1, numOctaves = 2 }: KeyboardProps) => {
    const [notes, setNotes] = useState(getNotes(startOctave, numOctaves));
    
    const toggleNote = (index:number, value:boolean) => {
        const newNotes = [...notes];
        newNotes[index].on = value;
        setNotes(newNotes);
    }
    const toggleMidiNote = (midi:number, value:boolean) => {
        const noteIndex = notes.findIndex(note => note.midi === midi)
        if (noteIndex > -1) {
            toggleNote(noteIndex, value)
        }
    }

    useEventListener('keydown', (event: KeyboardEvent) => {
        const midi = computerKeyboardMapping[event.key] // TODO capslock
        toggleMidiNote(midi, true)
    });

    useEventListener('keyup', (event: KeyboardEvent) => {
        const midi = computerKeyboardMapping[event.key] // TODO capslock
        toggleMidiNote(midi, false)
    });

  return (
    <div className={styles.keyboard}>
      {notes.map((note) => (
        <div 
            className={`${styles.key} ${getKeyClass(note.color)} ${note.on ? styles.on : ''}`} 
            key={`key-${note.midi}`}
        ></div>
      ))}
    </div>
  );
};

export default Keyboard;
