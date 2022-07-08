import {HelixParser} from "../src/section/secondaryStructure";

test('HELIX 추출', () => {

    const pdb = `
HELIX    1  HA GLY A   86  GLY A   94  1                                   9   
HELIX    2  HB GLY B   86  GLY B   94  1                                   9  
 
HELIX   21  21 PRO J  385  LEU J  388  5                                   4    
HELIX   22  22 PHE J  397  PHE J  402  5                                   6   `

    const parser = new HelixParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});