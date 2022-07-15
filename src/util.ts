import {Matrix4} from "three";

export function toMatrix4(items: Array<[number, number, number, number]>): Matrix4 {
    const matrix4 = new Matrix4()
    const elements = matrix4.elements
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        // noinspection PointlessArithmeticExpressionJS
        elements[4 * 0 + i] = item[0]
        // noinspection PointlessArithmeticExpressionJS
        elements[4 * 1 + i] = item[1]
        elements[4 * 2 + i] = item[2]
        elements[4 * 3 + i] = item[3]
    }
    return matrix4
}