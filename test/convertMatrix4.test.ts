import {toMatrix4} from "../src/util";
import {Matrix4} from "three";
import {Origx} from "../src/section/crystallographicAndCoordinateTransformation";

test('toMatrix4 컨버팅 테스트', () => {

    const items: [Origx, Origx, Origx] = [
        new Origx('Orig1', 2, 0, 0, 0),
        new Origx('Orig2', 0, 3, 0, 0),
        new Origx('Orig3', 0, 0, 4, 0),
    ]
    const result: Matrix4 = toMatrix4(items)
    console.log(result)
});