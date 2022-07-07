import {SsbondParser} from "../src/section/connectivityAnnotation";

test('SSBOND 추출', () => {

    const pdb = `
SSBOND   1 CYS A    6    CYS A  127                          1555   1555  2.03 
SSBOND   2 CYS A   30    CYS A  115                          1555   1555  2.07 
SSBOND   3 CYS A   64    CYS A   80                          1555   1555  2.06 
SSBOND   4 CYS A   76    CYS A   94                          1555   1555  2.04 `

    const parser = new SsbondParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});