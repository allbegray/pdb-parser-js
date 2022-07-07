import {SeqresParser} from "../src/parser/seqresParser";

test('SEQRES 추출', () => {

    const pdb = `
SEQRES   1 A  134  ALA CYS GLY LEU VAL ALA SER ASN LEU ASN LEU LYS PRO          
SEQRES   2 A  134  GLY GLU CYS LEU LYS VAL ARG GLY GLU LEU ALA PRO ASP          
SEQRES   3 A  134  ALA LYS SER PHE VAL LEU ASN LEU GLY LYS ASP SER ASN          
SEQRES   4 A  134  ASN LEU CYS LEU HIS PHE ASN PRO ARG PHE ASN ALA HIS          
SEQRES   5 A  134  GLY ASP ALA ASN THR ILE VAL CYS ASN SER LYS ASP ASP          
SEQRES   6 A  134  GLY THR TRP GLY THR GLU GLN ARG GLU THR ALA PHE PRO          
SEQRES   7 A  134  PHE GLN PRO GLY SER ILE THR GLU VAL CSO ILE THR PHE          
SEQRES   8 A  134  ASP GLN ALA ASP LEU THR ILE LYS LEU PRO ASP GLY HIS          
SEQRES   9 A  134  GLU PHE LYS PHE PRO ASN ARG LEU ASN MET GLU ALA ILE          
SEQRES  10 A  134  ASN TYR MET ALA ALA ASP GLY ASP PHE LYS ILE LYS CSO          
SEQRES  11 A  134  VAL ALA PHE GLU                                              
SEQRES   1 B  134  ALA CYS GLY LEU VAL ALA SER ASN LEU ASN LEU LYS PRO          `

    const parser = new SeqresParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});