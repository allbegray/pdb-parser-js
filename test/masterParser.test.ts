import {MasterParser} from "../src/section/bookkeeping";

test('MASTER 추출', () => {

    const pdb = `
MASTER       40    0    0    0    0    0    0    6 2930    2    0   29          `

    const parser = new MasterParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});