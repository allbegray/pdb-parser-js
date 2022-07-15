import {toMatrix4} from "../src/util";
import {Matrix4} from "three";

test('toMatrix4 컨버팅 테스트', () => {

    const items: Array<[number, number, number, number]> = [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 1, 0],
    ]
    const result: Matrix4 = toMatrix4(items)
    console.log(result)
});