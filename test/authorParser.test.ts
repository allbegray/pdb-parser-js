import {AuthorParser} from "../src/section/title";

test('Author 추출', () => {

    const pdb = `
AUTHOR    M.B.BERRY,B.MEADOR,T.BILDERBACK,P.LIANG,M.GLASER,
AUTHOR   2 G.N.PHILLIPS JR.,T.L.ST. STEVENS`

    const parser = new AuthorParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});