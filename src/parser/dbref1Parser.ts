/*
COLUMNS        DATA  TYPE    FIELD         DEFINITION
-----------------------------------------------------------------------------------
 1 -  6        Record name   "DBREF1"
 8 - 11        IDcode        idCode        ID code of this entry.
13             Character     chainID       Chain identifier.
15 - 18        Integer       seqBegin      Initial sequence number of the
                                           PDB sequence segment, right justified.
19             AChar         insertBegin   Initial insertion code of the
                                           PDB sequence segment.
21 - 24        Integer       seqEnd        Ending sequence number of the
                                           PDB sequence segment, right justified.
25             AChar         insertEnd     Ending insertion code of the
                                           PDB sequence  segment.
27 - 32        LString       database      Sequence database name.
48 - 67        LString       dbIdCode      Sequence database identification code,
                                           left justified.
 */

import {AbstractParser} from "./parser";
import '../extension/string';
import {Dbref1} from "../model/model";

class Dbref1Parser extends AbstractParser<Dbref1[]> {

    match(line: string): boolean {
        return line.startsWith('DBREF1')
    }

    parse(): Dbref1[] {
        return this.lines.map(it => {
            const idCode = it.extract(8, 11)
            const chainID = it.extract(13, 13)
            const seqBegin = it.extract(15, 18)
            const insertBegin = it.extract(19, 19)
            const seqEnd = it.extract(21, 24)
            const insertEnd = it.extract(25, 25)
            const database = it.extract(27, 32)
            const dbIdCode = it.extract(48, 67)

            return {
                idCode,
                chainID,
                seqBegin: seqBegin ? parseInt(seqBegin) : null,
                insertBegin,
                seqEnd: seqEnd ? parseInt(seqEnd) : null,
                insertEnd,
                database,
                dbIdCode,
            }
        })
    }
}

export {Dbref1Parser}