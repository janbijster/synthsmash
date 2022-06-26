import styles from  './App.module.css';
import Keyboard from './components/Keyboard';
import NoteDisplay from './components/NoteDisplay';

function App() {
  return (
    <div className={styles.app}>
      <NoteDisplay />
      <Keyboard/>
      <NoteDisplay />
    </div>
  );
}

export default App;
