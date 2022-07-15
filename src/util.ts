import {Matrix4} from "three";
import {Matrixable} from "./model";

export function toMatrix4(items: Matrixable[]): Matrix4 {
    const matrix4 = new Matrix4()
    const elements = matrix4.elements
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const point4D = item.toPoint4D()

        // noinspection PointlessArithmeticExpressionJS
        elements[4 * 0 + i] = point4D[0]!
        // noinspection PointlessArithmeticExpressionJS
        elements[4 * 1 + i] = point4D[1]!
        elements[4 * 2 + i] = point4D[2]!
        elements[4 * 3 + i] = point4D[3]!
    }
    return matrix4
}