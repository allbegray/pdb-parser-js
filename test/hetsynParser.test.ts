import {HetsynParser} from "../src/parser/hetsynParser";

test('HETSYN 추출', () => {

    const pdb = `
HETSYN     NAD NICOTINAMIDE ADENINE DINUCLEOTIDE
HETSYN     COA COA
HETSYN     TES 

HETSYN     CMP CYCLIC AMP; CYCLIC ADENOSINE MONOPHOSPHATE

HETSYN     TRS TRIS BUFFER; TRISAMINE;
HETSYN   2 TRS TRIS(HYDROXYMETHYL)AMINOMETHANE; TRIMETHYLOL
HETSYN   3 TRS AMINOMETHANE;`

    const parser = new HetsynParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});