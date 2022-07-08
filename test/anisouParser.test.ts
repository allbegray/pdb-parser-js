import {AnisouParser} from "../src/section/coordinate";

test('ANISOU 추출', () => {

    const pdb = `
ATOM    107  N   GLY A  13      12.681  37.302 -25.211 1.000 15.56           N
ANISOU  107  N   GLY A  13     2406   1892   1614    198    519   -328       N
ATOM    108  CA  GLY A  13      11.982  37.996 -26.241 1.000 16.92           C
ANISOU  108  CA  GLY A  13     2748   2004   1679    -21    155   -419       C
ATOM    109  C   GLY A  13      11.678  39.447 -26.008 1.000 15.73           C
ANISOU  109  C   GLY A  13     2555   1955   1468     87    357   -109       C
ATOM    110  O   GLY A  13      11.444  40.201 -26.971 1.000 20.93           O
ANISOU  110  O   GLY A  13     3837   2505   1611    164   -121    189       O
ATOM    111  N   ASN A  14      11.608  39.863 -24.755 1.000 13.68           N
ANISOU  111  N   ASN A  14     2059   1674   1462     27    244    -96       N`

    const parser = new AnisouParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});