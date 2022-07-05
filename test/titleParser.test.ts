import {TitleParser} from "../src/parser/titleParser";

test('타이틀 추출', () => {

    const pdb = `
HEADER    TRANSFERASE/TRANSFERASE INHIBITOR       17-SEP-04   1XH6              
TITLE     CRYSTAL STRUCTURES OF PROTEIN KINASE B SELECTIVE INHIBITORS           
TITLE    2 IN COMPLEX WITH PROTEIN KINASE A AND MUTANTS                         
COMPND    MOL_ID: 1;`

    const titleParser = new TitleParser()
    pdb.split('\n').forEach(line => {
        titleParser.collect(line)
    })
    const title: string | null = titleParser.parse()

    console.log(title)
});