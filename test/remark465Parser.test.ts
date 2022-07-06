import {Remark465Parser} from "../src/parser/remark465Parser";

test('REMARK 465 추출', () => {

    const pdb = `
REMARK 465                                                                       
REMARK 465 MISSING  RESIDUES                                                     
REMARK 465 THE FOLLOWING  RESIDUES WERE NOT LOCATED IN THE                       
REMARK 465 EXPERIMENT.  (M=MODEL NUMBER; RES=RESIDUE NAME; C=CHAIN               
REMARK 465 IDENTIFIER;  SSSEQ=SEQUENCE NUMBER; I=INSERTION CODE.)                
REMARK 465                                                                      
REMARK 465   M RES C SSSEQI                                                     
REMARK 465     ARG A    46                                                      
REMARK 465     GLY A    47                                                      
REMARK 465     ALA A    48                                                      
REMARK 465     ARG A    49                                                      
REMARK 465     MET A    50          `

    const parser = new Remark465Parser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});