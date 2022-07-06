/*
COLUMNS        DATA TYPE     FIELD       DEFINITION
--------------------------------------------------------------------------------
 1 -  6        Record name   "MODRES"
 8 - 11        IDcode        idCode      ID code of this entry.
13 - 15        Residue name  resName     Residue name used in this entry.
17             Character     chainID     Chain identifier.
19 - 22        Integer       seqNum      Sequence number.
23             AChar         iCode       Insertion code.
25 - 27        Residue name  stdRes      Standard residue name.
30 - 70        String        comment     Description of the residue modification.
 */

import {AbstractParser} from "./parser";
import '../extension/string';
import {Modres} from "../model/model";

class ModresParser extends AbstractParser<Modres[]> {

    match(line: string): boolean {
        return line.startsWith('MODRES')
    }

    parse(): Modres[] {
        return this.lines.map(it => {
            const idCode = it.extract(8, 11)
            const resName = it.extract(13, 15)
            const chainID = it.extract(17, 17)
            const seqNum = it.extract(19, 22)
            const iCode = it.extract(23, 23)
            const stdRes = it.extract(25, 27)
            const comment = it.extract(30, 70)
            return {
                idCode,
                resName,
                chainID,
                seqNum: seqNum ? parseInt(seqNum) : null,
                iCode,
                stdRes,
                comment,
            }
        })
    }
}

export {ModresParser}