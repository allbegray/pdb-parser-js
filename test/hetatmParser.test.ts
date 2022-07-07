import {Hetatm, HetatmParser} from "../src/section/coordinate";

test('HETATM 추출', () => {

    const pdb = `
HETATM 8237 MG    MG A1001      13.872  -2.555 -29.045  1.00 27.36          MG 
 
HETATM 3835 FE   HEM A   1      17.140   3.115  15.066  1.00 14.14          FE
HETATM 8238  S   SO4 A2001      10.885 -15.746 -14.404  1.00 47.84           S  
HETATM 8239  O1  SO4 A2001      11.191 -14.833 -15.531  1.00 50.12           O  
HETATM 8240  O2  SO4 A2001       9.576 -16.338 -14.706  1.00 48.55           O  
HETATM 8241  O3  SO4 A2001      11.995 -16.703 -14.431  1.00 49.88           O  
HETATM 8242  O4  SO4 A2001      10.932 -15.073 -13.100  1.00 49.91           O  
HETATM 5986  O   DUM p1547      30.000   0.000  14.900
HETATM 5987  N   DUM p1548      30.000   2.000 -14.900
HETATM 5988  O   DUM p1549      30.000   2.000  14.900
HETATM 5989  N   DUM p1550      30.000   4.000 -14.900`

    const parser = new HetatmParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse() as Hetatm[]

    console.log(result)
});