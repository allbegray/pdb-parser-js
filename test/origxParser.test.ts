import {OrigxParser} from "../src/section/crystallographicAndCoordinateTransformation";

test('ORIGX 추출', () => {

    const pdb = `
ORIGX1      0.963457  0.136613  0.230424       16.61000               
ORIGX2     -0.158977  0.983924  0.081383       13.72000               
ORIGX3     -0.215598 -0.115048  0.969683       37.65000`

    const parser = new OrigxParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});