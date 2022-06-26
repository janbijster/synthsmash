import { getNotes, NoteColor } from "../utils/notes";
import styles from "./Keyboard.module.css";

type KeyboardProps = {
  numOctaves?: number;
};

const getKeyClass = (color: NoteColor) =>
  color === NoteColor.Black ? styles.black : styles.white;

const Keyboard = ({ numOctaves = 2 }: KeyboardProps) => {
  const notes = getNotes(numOctaves);

  return (
    <div className={styles.keyboard}>
      {notes.map((note) => (
        <div className={`${styles.key} ${getKeyClass(note.color)}`}></div>
      ))}
    </div>
  );
};

export default Keyboard;
