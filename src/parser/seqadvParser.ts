/*
COLUMNS        DATA TYPE     FIELD         DEFINITION
-----------------------------------------------------------------
 1 -  6        Record name   "SEQADV"
 8 - 11        IDcode        idCode        ID  code of this entry.
13 - 15        Residue name  resName       Name of the PDB residue in conflict.
17             Character     chainID       PDB  chain identifier.
19 - 22        Integer       seqNum        PDB  sequence number.
23             AChar         iCode         PDB insertion code.
25 - 28        LString       database
30 - 38        LString       dbAccession   Sequence  database accession number.
40 - 42        Residue name  dbRes         Sequence database residue name.
44 - 48        Integer       dbSeq         Sequence database sequence number.
50 - 70        LString       conflict      Conflict comment.
 */

import {AbstractParser} from "./parser";
import '../extension/string';
import {Seqadv} from "../model/model";

class SeqadvParser extends AbstractParser<Seqadv[]> {

    match(line: string): boolean {
        return line.startsWith('SEQADV')
    }

    parse(): Seqadv[] {
        return this.lines.map(it => {
            const idCode = it.extract(8, 11)
            const resName = it.extract(13, 15)
            const chainID = it.extract(17, 17)
            const seqNum = it.extract(19, 22)
            const iCode = it.extract(23, 23)
            const database = it.extract(25, 28)
            const dbAccession = it.extract(30, 38)
            const dbRes = it.extract(40, 42)
            const dbSeq = it.extract(44, 48)
            const conflict = it.extract(50, 70)
            return {
                idCode,
                resName,
                chainID,
                seqNum: seqNum ? parseInt(seqNum) : null,
                iCode,
                database,
                dbAccession,
                dbRes,
                dbSeq: dbSeq ? parseInt(dbSeq) : null,
                conflict
            }
        })
    }
}

export {SeqadvParser}