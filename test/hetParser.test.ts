import {HetParser} from "../src/parser/hetParser";

test('HET 추출', () => {

    const pdb = `
HET    TRS  B 975       8

HET    UDP  A1457      25                                                       
HET    B3P  A1458      19  

HET    NAG  Y   3      15 
HET    FUC  Y   4      10 
HET    NON  Y   5      12 
HET    UNK  A 161       1     `

    const parser = new HetParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});