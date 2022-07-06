import {HetnamParser} from "../src/parser/hetnamParser";

test('HETNAM 추출', () => {

    const pdb = `
HETNAM     NAG N-ACETYL-D-GLUCOSAMINE
HETNAM     SAD BETA-METHYLENE SELENAZOLE-4-CARBOXAMIDE ADENINE
HETNAM  2  SAD DINUCLEOTIDE

HETNAM     UDP URIDINE-5'-DIPHOSPHATE 

HETNAM     UNX UNKNOWN ATOM OR ION
HETNAM     UNL UNKNOWN LIGAND 

HETNAM     B3P 2-[3-(2-HYDROXY-1,1-DIHYDROXYMETHYL-ETHYLAMINO)-                 
HETNAM   2 B3P  PROPYLAMINO]-2-HYDROXYMETHYL-PROPANE-1,3-DIOL       `

    const parser = new HetnamParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});