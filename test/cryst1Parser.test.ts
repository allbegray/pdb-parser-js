import {Cryst1Parser} from "../src/section/crystallographicAndCoordinateTransformation";

test('CRYST1 추출', () => {

    const pdb = `
CRYST1   52.000   58.600   61.900  90.00  90.00  90.00 P 21 21 21    8 `

    const parser = new Cryst1Parser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});