import {HeaderParser} from "../src/section/title";

test('헤더 추출', () => {

    const pdb = `
HEADER    TRANSFERASE/TRANSFERASE INHIBITOR       17-SEP-04   1XH6              
TITLE     CRYSTAL STRUCTURES OF PROTEIN KINASE B SELECTIVE INHIBITORS           
TITLE    2 IN COMPLEX WITH PROTEIN KINASE A AND MUTANTS                         
COMPND    MOL_ID: 1;`

    const parser = new HeaderParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});