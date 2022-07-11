import {SourceParser} from "../src/section/title";

test('SOURCE 추출', () => {

    const pdb = `
SOURCE    MOL_ID: 1;                                                            
SOURCE   2 ORGANISM_SCIENTIFIC: HOMO SAPIENS;                                   
SOURCE   3 ORGANISM_COMMON: HUMAN;                                              
SOURCE   4 ORGANISM_TAXID: 9606;                                                
SOURCE   5 EXPRESSION_SYSTEM: ESCHERICHIA COLI;                                 
SOURCE   6 EXPRESSION_SYSTEM_TAXID: 562;                                        
SOURCE   7 MOL_ID: 2;                                                           
SOURCE   8 ORGANISM_SCIENTIFIC: HOMO SAPIENS;                                   
SOURCE   9 ORGANISM_COMMON: HUMAN;                                              
SOURCE  10 ORGANISM_TAXID: 9606;                                                
SOURCE  11 EXPRESSION_SYSTEM: ESCHERICHIA COLI;                                 
SOURCE  12 EXPRESSION_SYSTEM_TAXID: 562;                                        
SOURCE  13 MOL_ID: 3;                                                           
SOURCE  14 ORGANISM_SCIENTIFIC: HOMO SAPIENS;                                   
SOURCE  15 ORGANISM_COMMON: HUMAN;                                              
SOURCE  16 ORGANISM_TAXID: 9606;                                                
SOURCE  17 EXPRESSION_SYSTEM: ESCHERICHIA COLI;                                 
SOURCE  18 EXPRESSION_SYSTEM_TAXID: 562                                         `

    const parser = new SourceParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});