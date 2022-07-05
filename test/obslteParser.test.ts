import {ObslteParser} from "../src/parser/obslteParser";

test('OBSLTE 추출', () => {

    const pdb = `
HEADER    TRANSFERASE/TRANSFERASE INHIBITOR       17-SEP-04   1XH6              
TITLE     CRYSTAL STRUCTURES OF PROTEIN KINASE B SELECTIVE INHIBITORS           
TITLE    2 IN COMPLEX WITH PROTEIN KINASE A AND MUTANTS
OBSLTE     12-AUG-15 4ZW4      5CST                         
COMPND    MOL_ID: 1;`

    const parser = new ObslteParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});