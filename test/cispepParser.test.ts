import {CispepParser} from "../src/section/connectivityAnnotation";

test('CISPEP 추출', () => {

    const pdb = `
CISPEP   1 SER A   58    GLY A   59          0        20.91    
CISPEP   1 GLY A  116    GLY A  117          0        18.50 
CISPEP   1 MET A    1    SER A    2          0        -3.69 `

    const parser = new CispepParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});