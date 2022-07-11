import {RevdatParser} from "../src/section/title";

test('REVDAT 추출', () => {

    const pdb = `
REVDAT   4   29-JUL-20 3M2M    1       COMPND REMARK HET    HETNAM              
REVDAT   4 2                   1       FORMUL LINK   SITE   ATOM                
REVDAT   3   04-MAY-11 3M2M    1       JRNL                                     
REVDAT   2   27-OCT-10 3M2M    1       JRNL                                     
REVDAT   1   21-JUL-10 3M2M    0                                                `

    const parser = new RevdatParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});