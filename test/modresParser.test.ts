import {ModresParser} from "../src/section/primaryStructure";

test('MODRES 추출', () => {

    const pdb = `
SEQRES  11 H  134  VAL ALA PHE GLU                                              
MODRES 3M2M CSO A   88  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO A  130  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO B   88  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO B  130  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO C   88  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO C  130  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO D   88  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO D  130  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO E   88  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO E  130  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO F   88  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO F  130  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO G   88  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO G  130  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO H   88  CYS  S-HYDROXYCYSTEINE                                  
MODRES 3M2M CSO H  130  CYS  S-HYDROXYCYSTEINE                                  
HET    CSO  A  88       7                                                       `

    const parser = new ModresParser()
    pdb.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});