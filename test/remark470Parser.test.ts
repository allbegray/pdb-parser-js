import {Remark470Parser} from "../src/parser/remark470Parser";

test('REMARK 470 non NMR 추출', () => {
    const pdb = `
REMARK 470
REMARK 470 MISSING ATOM
REMARK 470 THE FOLLOWING RESIDUES HAVE MISSING ATOMS (M=MODEL NUMBER; 
REMARK 470 RES=RESIDUE NAME; C=CHAIN IDENTIFIER;  SSEQ=SEQUENCE NUMBER; 
REMARK 470 I=INSERTION CODE):                                          
REMARK 470   M RES  CSSEQI  ATOMS                                       
REMARK 470     ARG  A 412    CG  CD   NE   CZ   NH1   NH2               
REMARK 470     ARG  A 456    CG  CD   NE   CZ   NH1   NH2               
REMARK 470     GLU  A 486    CG  CD   OE1  OE2                         
REMARK 470     GLU  A 547    CG  CD   OE1  OE2                         
REMARK 470     GLU  A 548    CG  CD   OE1  OE2                         
REMARK 470     LYS  A 606    CG  CD   CE   NZ                          
REMARK 470     ARG  B 456    CG  CD   NE   CZ   NH1   NH2               
REMARK 470     ASP  B 484    CG  OD1  OD2                              
REMARK 470     GLN  B 485    CG  CD   OE1  NE2                         
REMARK 470     GLU  B 486    CG  CD   OE1  OE2                         
REMARK 470     ARG  B 490    CG  CD   NE   CZ   NH1   NH2               
REMARK 470     GLU  B 522    CG  CD   OE1  OE2                         
REMARK 470     ARG  B 576    CG  CD   NE   CZ   NH1   NH2
REMARK 470     ASP  B1599aZX CG  OD1  OD2`

    const parser = new Remark470Parser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});

test('REMARK 470 NMR 추출', () => {
    const pdb = `
REMARK 470 MISSING ATOM                                                        
REMARK 470 THE FOLLOWING RESIDUES HAVE MISSING ATOMS (RES=RESIDUE NAME;             
REMARK 470 C=CHAIN IDENTIFIER; SSEQ=SEQUENCE NUMBER; I=INSERTION CODE):        
REMARK 470   MODELS 1-25                                                
REMARK 470     RES CSSEQI  ATOMS                                               
REMARK 470     ILE A9820aZX  CD1                                                  
REMARK 470     THR A  59     CG2                                                  `

    const parser = new Remark470Parser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});