import * as Tone from 'tone'

Tone.context.lookAhead = 0
const synth = new Tone.Synth().toDestination();

export const playNote = (note: string) => {
    synth.triggerAttackRelease(note, "8n")
}