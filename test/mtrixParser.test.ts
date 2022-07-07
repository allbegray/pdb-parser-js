import {MtrixParser} from "../src/section/crystallographicAndCoordinateTransformation";

test('MTRIX 추출', () => {

    const pdb = `
MTRIX1   1 -1.000000  0.000000  0.000000        0.00000    1          
MTRIX2   1  0.000000  1.000000  0.000000        0.00000    1          
MTRIX3   1  0.000000  0.000000 -1.000000        0.00000    1   `

    const parser = new MtrixParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});