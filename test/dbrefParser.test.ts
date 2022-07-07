import {DbrefParser} from "../src/section/primaryStructure";

test('DBREF 추출', () => {

    const pdb = `
DBREF  2JHQ A    1   226  UNP    Q9KPK8   UNG_VIBCH        1    226 
          
DBREF  3AKY A    1   219  UNP    P07170   KAD1_YEAST       3    221    

DBREF  1HAN A    2   298  UNP    P47228   BPHC_BURCE       1    297

DBREF  3D3I A    0   760  UNP    P42592   YGJK_ECOLI      23    783            
DBREF  3D3I B    0   760  UNP    P42592   YGJK_ECOLI      23    783       

DBREF  3C2J A    1     8  PDB    3C2J     3C2J             1      8            
DBREF  3C2J B  101   108  PDB    3C2J     3C2J           101    108            

DBREF  1FFK 0    2  2923  GB     3377779  AF034620      2597   5518            
DBREF  1FFK 9    1   122  GB     3377779  AF034620      5658   5779      
DBREF  1UNJ X    6    11  NOR    NOR00228 NOR00228         6     11
`

    const parser = new DbrefParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});