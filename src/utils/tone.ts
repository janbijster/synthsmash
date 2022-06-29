import * as Tone from 'tone'

Tone.context.lookAhead = 0
const synth = new Tone.Synth().toDestination()

let lastNote: string
export const startNote = (note: string) => {
    synth.triggerAttack(note, Tone.now())
    lastNote = note
}

export const stopNote = (note: string) => {
    if (lastNote === note) {
        synth.triggerRelease(Tone.now())
    }
}
