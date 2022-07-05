import {SplitParser} from "../src/parser/splitParser";

test('split 추출', () => {

    const pdb = `
SPLIT      1VOQ 1VOR 1VOS 1VOU 1VOV 1VOW 1VOX 1VOY 1VP0 1VOZ
SPLIT      
    `

    const parser = new SplitParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});