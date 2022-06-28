import styles from './App.module.css'
import Keyboard from './components/Keyboard'

function App() {
    return (
        <div className={styles.app}>
            <div className={styles.keyboardHolder}>
                <Keyboard />
            </div>
        </div>
    )
}

export default App
