import { Note, NoteColor } from '../../utils/notes'
import P5 from 'p5'
import { colors, width, height, noteColors } from '../../utils/constants'
import { NoteEvent } from '../Keyboard'

const vanishingPoint = {
    x: width / 2,
    y: height / 3.5,
}
const bottomLeft = {
    x: 0,
    y: height,
}
const bottomRight = {
    x: width,
    y: height,
}

const zMax = 1000
const zFac = 0.0005
const yFac = bottomLeft.y - vanishingPoint.y
const gridWidthMax = bottomRight.x - bottomLeft.x

const transformPoint = (noteIndex: number, noteCount: number, z: number) => {
    // sanitize
    z = Math.min(z, zMax)

    const yRel = Math.exp(zFac * (z - zMax)) * yFac
    const fDevMax = (noteIndex - 0.5 * noteCount) / (0.5 * noteCount)
    const xDevMax = fDevMax * (0.5 * gridWidthMax)
    const xDev = (xDevMax * yRel) / yFac
    const x = xDev + vanishingPoint.x
    const y = yRel + vanishingPoint.y
    return { x, y }
}

const drawRect = (
    p5: P5,
    index: number,
    numNotes: number,
    zStart: number,
    zEnd: number,
    color: string = colors.white
) => {
    p5.noStroke()
    p5.fill(color)
    p5.beginShape()
    const tl = transformPoint(index, numNotes, zStart)
    const tr = transformPoint(index + 1, numNotes, zStart)
    const br = transformPoint(index + 1, numNotes, zEnd)
    const bl = transformPoint(index, numNotes, zEnd)
    p5.vertex(tl.x, tl.y)
    p5.vertex(tr.x, tr.y)
    p5.vertex(br.x, br.y)
    p5.vertex(bl.x, bl.y)
    p5.endShape(p5.CLOSE)
}

const drawGridBar = (
    p5: P5,
    index: number,
    numNotes: number,
    zEnd: number = zMax,
    color: string = colors.white
) => {
    p5.noStroke()
    p5.fill(color)
    p5.beginShape()
    const bl = transformPoint(index, numNotes, zEnd)
    const br = transformPoint(index + 1, numNotes, zEnd)
    p5.vertex(vanishingPoint.x, vanishingPoint.y)
    p5.vertex(bl.x, bl.y)
    p5.vertex(br.x, br.y)
    p5.endShape(p5.CLOSE)
}

const drawHorizontalLine = (
    p5: P5,
    z: number,
    color: string = colors.white
) => {
    p5.stroke(color)
    const left = transformPoint(0, 1, z)
    const right = transformPoint(1, 1, z)
    p5.line(left.x, left.y, right.x, right.y)
}

const draw = (p5: P5, notes: Note[], events: NoteEvent[]) => {
    p5.stroke(colors.primary)
    notes.forEach((note, index) => {
        // draw b/w piano pattern
        // if (note.color === NoteColor.Black) {
        //     drawGridBar(p5, index, notes.length, 0, colors.primary + '44')
        // }
        // draw vertical grid lines
        const lineEndpointX =
            (index * gridWidthMax) / notes.length + bottomLeft.x

        p5.stroke(colors.primary)
        p5.line(vanishingPoint.x, vanishingPoint.y, lineEndpointX, p5.height)

        let color = noteColors[note.baseName]
        if (note.on) {
            color += '99'
        } else {
            color += '44'
        }
        drawRect(p5, index, notes.length, 0, 2000, color)
    })

    // draw horizontal beat lines
    const numBeats = 10
    const maxBeat = zMax / 1000
    const minBeat = maxBeat - numBeats
    const dz = Date.now() % 1000
    for (let i = minBeat; i < maxBeat; i++) {
        const z = i * 1000 + dz
        drawHorizontalLine(p5, z, colors.primary)
    }

    // draw notes
    events.forEach((event) => {
        const { note, start, end } = event
        const now = Date.now()
        const zStart = end === undefined ? 0.1 : now - end
        const zEnd = now - start
        const index = notes.findIndex((n) => n.midi === note.midi)
        const color = noteColors[event.note.baseName]
        drawRect(p5, index, notes.length, zStart, zEnd, color)
    })
    const lineEndpointX = gridWidthMax + bottomLeft.x
    p5.stroke(colors.primary)
    p5.line(vanishingPoint.x, vanishingPoint.y, lineEndpointX, p5.height)
}

export default draw
