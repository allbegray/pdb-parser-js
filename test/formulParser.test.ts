import {FormulParser} from "../src/section/heterogen";

test('FORMUL 추출', () => {

    const pdb = `
FORMUL   3   MG    2(MG 2+)                                                      
FORMUL   5  SO4    6(O4 S 2-)                                                    
FORMUL  13  HOH   *360(H2 O) 

FORMUL   3  NAP    2(C21 H28 N7 O17 P3)                                          
FORMUL   4  FOL    2(C19 H19 N7 O6)                                              
FORMUL   5  1PE    C10 H22 O6    

FORMUL   2  NX5    C14 H10 O2 CL2 S
`

    const parser = new FormulParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});