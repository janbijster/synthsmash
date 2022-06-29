import { Note } from '../../utils/notes'
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
const zFac = 0.0006
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
    p5.vertex(tl.x, tl.y)
    const tr = transformPoint(index + 1, numNotes, zStart)
    p5.vertex(tr.x, tr.y)
    const br = transformPoint(index + 1, numNotes, zEnd)
    p5.vertex(br.x, br.y)
    const bl = transformPoint(index, numNotes, zEnd)
    p5.vertex(bl.x, bl.y)
    p5.endShape(p5.CLOSE)
}

const draw = (p5: P5, notes: Note[], events: NoteEvent[]) => {
    p5.stroke(colors.primary)
    notes.forEach((note, index) => {
        // draw vertical grid lines
        const lineEndpointX =
            (index * gridWidthMax) / notes.length + bottomLeft.x

        p5.stroke(colors.primary)
        p5.line(vanishingPoint.x, vanishingPoint.y, lineEndpointX, p5.height)

        let color = noteColors[note.baseName]
        if (!note.on) {
            color += '66'
        }
        drawRect(p5, index, notes.length, 0, 50, color)
    })

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
