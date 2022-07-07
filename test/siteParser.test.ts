import {SiteParser} from "../src/section/miscellaneousFeatures";

test('SITE 추출', () => {

    const pdb = `
SITE     1 AC1  3 HIS A  94  HIS A  96  HIS A 119                               
SITE     1 AC2  5 ASN A  62  GLY A  63  HIS A  64  HOH A 328                    
SITE     2 AC2  5 HOH A 634                                                     
SITE     1 AC3  5 GLN A 136  GLN A 137  PRO A 138  GLU A 205                    
SITE     2 AC3  5 CYS A 206                                                     
SITE     1 AC4 11 HIS A  64  HIS A  94  HIS A  96  HIS A 119                    
SITE     2 AC4 11 LEU A 198  THR A 199  THR A 200  TRP A 209                    
SITE     3 AC4 11 HOH A 572  HOH A 582  HOH A 635           `

    const parser = new SiteParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});