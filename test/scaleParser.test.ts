import {ScaleParser} from "../src/section/crystallographicAndCoordinateTransformation";

test('SCALE3 추출', () => {

    const pdb = `
SCALE1      0.019231  0.000000  0.000000        0.00000               
SCALE2      0.000000  0.017065  0.000000        0.00000               
SCALE3      0.000000  0.000000  0.016155        0.00000`

    const parser = new ScaleParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});