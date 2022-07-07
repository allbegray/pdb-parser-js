import {LinkParser} from "../src/section/connectivityAnnotation";

test('LINK 추출', () => {

    const pdb = `
LINK         O   GLY A  49                NA    NA A6001     1555   1555  2.98  
LINK         OG1 THR A  51                NA    NA A6001     1555   1555  2.72  
LINK         OD2 ASP A  66                NA    NA A6001     1555   1555  2.72  
LINK         NE  ARG A  68                NA    NA A6001     1555   1555  2.93  

LINK         NE  ARG A  68                NA    NA A6001     1555   1555  2.93
LINK         C21 2EG A   7                 C22 2EG B  19     1555   1555  1.56 `

    const parser = new LinkParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});