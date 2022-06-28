import { Note, NoteColor } from '../../utils/notes'
import P5 from 'p5'
import { colors, width, height } from '../../utils/constants'

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
    const yRel = Math.exp(zFac * (z - zMax)) * yFac

    const fDevMax = (noteIndex - 0.5 * noteCount) / (0.5 * noteCount)
    const xDevMax = fDevMax * (0.5 * gridWidthMax)
    const xDev = (xDevMax * yRel) / yFac
    const x = xDev + vanishingPoint.x
    const y = yRel + vanishingPoint.y
    return { x, y }
}

const draw = (p5: P5, notes: Note[]) => {
    p5.stroke(colors.primary)
    notes.forEach((note, index) => {
        const lineEndpointX =
            (index * gridWidthMax) / notes.length + bottomLeft.x

        p5.stroke(colors.primary)
        p5.line(vanishingPoint.x, vanishingPoint.y, lineEndpointX, p5.height)

        p5.noStroke()
        p5.fill(
            note.on
                ? colors.white
                : note.color === NoteColor.White
                ? colors.primaryDark
                : colors.black
        )
        p5.beginShape()
        const tl = transformPoint(index, notes.length, 0)
        p5.vertex(tl.x, tl.y)
        const tr = transformPoint(index + 1, notes.length, 0)
        p5.vertex(tr.x, tr.y)
        const br = transformPoint(index + 1, notes.length, 0 + 300)
        p5.vertex(br.x, br.y)
        const bl = transformPoint(index, notes.length, 0 + 300)
        p5.vertex(bl.x, bl.y)
        p5.endShape(p5.CLOSE)
    })
    const lineEndpointX = gridWidthMax + bottomLeft.x
    p5.stroke(colors.primary)
    p5.line(vanishingPoint.x, vanishingPoint.y, lineEndpointX, p5.height)
}

export default draw
