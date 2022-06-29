import { Note } from '@/utils/notes'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import P5 from 'p5'
import drawGrid from './grid'
import { NoteEvent } from '../Keyboard'
import { width, height } from '../../utils/constants'

export type NoteDisplayProps = {
    notes: Note[]
    events: NoteEvent[]
}

interface MyP5 extends P5 {
    updateProps: (notes: Note[], events: NoteEvent[]) => void
}

const NoteDisplay = ({ notes, events }: NoteDisplayProps) => {
    const holderRef = useRef<HTMLDivElement>(null)
    const [p5, setP5] = useState<MyP5>()
    useEffect(() => {
        console.log('load p5')
        if (p5) return
        setP5(
            new P5((p5) => {
                let localNotes: Note[] = notes
                let localEvents: NoteEvent[] = events

                p5.setup = () => {
                    p5.createCanvas(width, height)
                }
                p5.draw = () => {
                    p5.background(0)
                    drawGrid(p5, localNotes, localEvents)
                }
                p5.updateProps = (notes: Note[], events: NoteEvent[]) => {
                    localNotes = notes
                    localEvents = events
                }
            }, holderRef.current as HTMLDivElement) as MyP5
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        p5?.updateProps(notes, events)
    }, [notes, events, p5])

    return (
        <div className={styles.noteDisplay}>
            <div className={styles.p5Holder} ref={holderRef} />
        </div>
    )
}

export default NoteDisplay
