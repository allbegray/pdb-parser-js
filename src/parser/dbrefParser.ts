/*
COLUMNS       DATA TYPE     FIELD              DEFINITION
-----------------------------------------------------------------------------------
 1 -  6       Record name   "DBREF "
 8 - 11       IDcode        idCode             ID code of this entry.
13            Character     chainID            Chain  identifier.
15 - 18       Integer       seqBegin           Initial sequence number of the
                                               PDB sequence segment.
19            AChar         insertBegin        Initial  insertion code of the
                                               PDB  sequence segment.
21 - 24       Integer       seqEnd             Ending sequence number of the
                                               PDB  sequence segment.
25            AChar         insertEnd          Ending insertion code of the
                                               PDB  sequence segment.
27 - 32       LString       database           Sequence database name.
34 - 41       LString       dbAccession        Sequence database accession code.
43 - 54       LString       dbIdCode           Sequence  database identification code.
56 - 60       Integer       dbseqBegin         Initial sequence number of the
                                               database seqment.
61            AChar         idbnsBeg           Insertion code of initial residue of the
                                               segment, if PDB is the reference.
63 - 67       Integer       dbseqEnd           Ending sequence number of the
                                               database segment.
68            AChar         dbinsEnd           Insertion code of the ending residue of
                                               the segment, if PDB is the reference.
 */

import {AbstractParser} from "./parser";
import '../extension/string';
import {Dbref} from "../model/model";

class DbrefParser extends AbstractParser<Dbref[]> {

    match(line: string): boolean {
        return line.startsWith('DBREF ')
    }

    parse(): Dbref[] {
        return this.lines.map(it => {
            const idCode = it.extract(8, 11)
            const chainID = it.extract(13, 13)
            const seqBegin = it.extract(15, 18)
            const insertBegin = it.extract(19, 19)
            const seqEnd = it.extract(21, 24)
            const insertEnd = it.extract(25, 25)
            const database = it.extract(27, 32)
            const dbAccession = it.extract(34, 41)
            const dbIdCode = it.extract(43, 54)
            const dbseqBegin = it.extract(56, 60)
            const idbnsBeg = it.extract(61, 61)
            const dbseqEnd = it.extract(63, 67)
            const dbinsEnd = it.extract(68, 68)

            return {
                idCode,
                chainID,
                seqBegin: seqBegin ? parseInt(seqBegin) : null,
                insertBegin,
                seqEnd: seqEnd ? parseInt(seqEnd) : null,
                insertEnd,
                database,
                dbAccession,
                dbIdCode,
                dbseqBegin: dbseqBegin ? parseInt(dbseqBegin) : null,
                idbnsBeg,
                dbseqEnd: dbseqEnd ? parseInt(dbseqEnd) : null,
                dbinsEnd,
            }
        })
    }
}

export {DbrefParser}