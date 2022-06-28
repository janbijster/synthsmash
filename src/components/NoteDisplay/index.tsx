import { Note } from '@/utils/notes'
import { useEffect, useRef } from 'react'
import styles from './index.module.css'
import p5 from 'p5'
import drawGrid from './grid'
import { NoteEvent } from '../Keyboard'
import { width, height } from '../../utils/constants'

export type NoteDisplayProps = {
    notes: Note[]
    events: NoteEvent[]
}

const NoteDisplay = ({ notes }: NoteDisplayProps) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        console.log('load p5')
        new p5((p5) => {
            p5.setup = () => {
                p5.createCanvas(width, height)
            }
            p5.draw = () => {
                p5.background(0)
                drawGrid(p5, notes)
            }
        }, ref.current as HTMLDivElement)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.noteDisplay}>
            <div className={styles.p5Holder} ref={ref} />
        </div>
    )
}

export default NoteDisplay
