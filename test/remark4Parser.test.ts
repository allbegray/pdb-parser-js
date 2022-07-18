import {Remark4Parser} from "../src/section/title";

test('REMARK 4 추출', () => {

    const pdb = `
REMARK   3                                                                      
REMARK   3  OTHER REFINEMENT REMARKS: HYDROGENS HAVE BEEN ADDED IN THE          
REMARK   3   RIDING POSITIONS. U VALUES REFINED INDIVIDUALLY.                   
REMARK   4                                                                      
REMARK   4 2YGH COMPLIES WITH FORMAT V. 3.30, 13-JUL-11                         
REMARK 100                                                                      
REMARK 100 THIS ENTRY HAS BEEN PROCESSED BY PDBE ON 18-APR-11.                  `

    const parser = new Remark4Parser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});
