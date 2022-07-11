import {CompndParser} from "../src/section/title";

test('COMPND 추출', () => {

    const pdb = `
COMPND    MOL_ID: 1;                                                            
COMPND   2 MOLECULE: CAMP-DEPENDENT PROTEIN KINASE, ALPHA-CATALYTIC             
COMPND   3 SUBUNIT;                                                             
COMPND   4 CHAIN: A;                                                            
COMPND   5 SYNONYM: PROTEIN KINASE A, PKA C-ALPHA;                              
COMPND   6 EC: 2.7.1.37;                                                        
COMPND   7 ENGINEERED: YES;                                                     
COMPND   8 MOL_ID: 2;                                                           
COMPND   9 MOLECULE: CAMP-DEPENDENT PROTEIN KINASE INHIBITOR, ALPHA             
COMPND  10 FORM;                                                                
COMPND  11 CHAIN: B;                                                            
COMPND  12 FRAGMENT: PKI(RESIDUES 5-24);                                        
COMPND  13 SYNONYM: PROTEIN KINASE INHIBITOR PEPTIDE; PKI-ALPHA; CAMP-          
COMPND  14 DEPENDENT PROTEIN KINASE INHIBITOR, MUSCLE/BRAIN ISOFORM;            
COMPND  15 ENGINEERED: YES                                                      `

    const parser = new CompndParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});