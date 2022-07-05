import {HeaderParser} from "../src/parser/headerParser";

test('헤더 추출', () => {

    const pdb = `
HEADER    TRANSFERASE/TRANSFERASE INHIBITOR       17-SEP-04   1XH6              
TITLE     CRYSTAL STRUCTURES OF PROTEIN KINASE B SELECTIVE INHIBITORS           
TITLE    2 IN COMPLEX WITH PROTEIN KINASE A AND MUTANTS                         
COMPND    MOL_ID: 1;`

    const titleParser = new HeaderParser()
    pdb.split('\n').forEach(line => {
        titleParser.collect(line)
    })
    const header = titleParser.parse()

    console.log(header)
});