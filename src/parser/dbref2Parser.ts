/*
COLUMNS       DATA  TYPE    FIELD         DEFINITION
-----------------------------------------------------------------------------------
 1 -  6       Record name   "DBREF2"
 8 - 11       IDcode        idCode        ID code of this entry.
13            Character     chainID       Chain identifier.
19 - 40       LString       dbAccession   Sequence database accession code,
                                          left justified.
46 - 55       Integer       seqBegin      Initial sequence number of the
                                          Database segment, right justified.
58 - 67       Integer       seqEnd        Ending sequence number of the
                                          Database segment, right justified.
 */

import {AbstractParser} from "./parser";
import '../extension/string';
import {Dbref2} from "../model/model";

class Dbref2Parser extends AbstractParser<Dbref2[]> {

    match(line: string): boolean {
        return line.startsWith('DBREF2')
    }

    parse(): Dbref2[] {
        return this.lines.map(it => {
            const idCode = it.extract(8, 11)
            const chainID = it.extract(13, 13)
            const dbAccession = it.extract(19, 40)
            const seqBegin = it.extract(46, 55)
            const seqEnd = it.extract(58, 67)

            return {
                idCode,
                chainID,
                dbAccession,
                seqBegin: seqBegin ? parseInt(seqBegin) : null,
                seqEnd: seqEnd ? parseInt(seqEnd) : null,
            }
        })
    }
}

export {Dbref2Parser}