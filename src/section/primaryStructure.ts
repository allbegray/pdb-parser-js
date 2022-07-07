import '../extension/string';
import {AbstractParser} from "../parser";

export interface Dbref {
    idCode: string | null
    chainID: string | null
    seqBegin: number | null
    insertBegin: string | null
    seqEnd: number | null
    insertEnd: string | null
    database: string | null
    dbAccession: string | null
    dbIdCode: string | null
    dbseqBegin: number | null
    idbnsBeg: string | null
    dbseqEnd: number | null
    dbinsEnd: string | null
}

export interface Seqadv {
    idCode: string | null
    resName: string | null
    chainID: string | null
    seqNum: number | null
    iCode: string | null
    database: string | null
    dbAccession: string | null
    dbRes: string | null
    dbSeq: number | null
    conflict: string | null
}

export interface Modres {
    idCode: string | null
    resName: string | null
    chainID: string | null
    seqNum: number | null
    iCode: string | null
    stdRes: string | null
    comment: string | null
}

export interface Dbref1 {
    idCode: string | null
    chainID: string | null
    seqBegin: number | null
    insertBegin: string | null
    seqEnd: number | null
    insertEnd: string | null
    database: string | null
    dbIdCode: string | null
}

export interface Dbref2 {
    idCode: string | null
    chainID: string | null
    dbAccession: string | null
    seqBegin: number | null
    seqEnd: number | null
}

export interface Seqres {
    serNum: number | null
    chainID: string | null
    numRes: number | null
    resNames: string[]
}

/***
 * COLUMNS       DATA TYPE     FIELD              DEFINITION
 * -----------------------------------------------------------------------------------
 *  1 -  6       Record name   "DBREF "
 *  8 - 11       IDcode        idCode             ID code of this entry.
 * 13            Character     chainID            Chain  identifier.
 * 15 - 18       Integer       seqBegin           Initial sequence number of the
 *                                                PDB sequence segment.
 * 19            AChar         insertBegin        Initial  insertion code of the
 *                                                PDB  sequence segment.
 * 21 - 24       Integer       seqEnd             Ending sequence number of the
 *                                                PDB  sequence segment.
 * 25            AChar         insertEnd          Ending insertion code of the
 *                                                PDB  sequence segment.
 * 27 - 32       LString       database           Sequence database name.
 * 34 - 41       LString       dbAccession        Sequence database accession code.
 * 43 - 54       LString       dbIdCode           Sequence  database identification code.
 * 56 - 60       Integer       dbseqBegin         Initial sequence number of the
 *                                                database seqment.
 * 61            AChar         idbnsBeg           Insertion code of initial residue of the
 *                                                segment, if PDB is the reference.
 * 63 - 67       Integer       dbseqEnd           Ending sequence number of the
 *                                                database segment.
 * 68            AChar         dbinsEnd           Insertion code of the ending residue of
 *                                                the segment, if PDB is the reference.
 */
export class DbrefParser extends AbstractParser<Dbref[]> {

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

/***
 * COLUMNS        DATA TYPE     FIELD         DEFINITION
 * -----------------------------------------------------------------
 *  1 -  6        Record name   "SEQADV"
 *  8 - 11        IDcode        idCode        ID  code of this entry.
 * 13 - 15        Residue name  resName       Name of the PDB residue in conflict.
 * 17             Character     chainID       PDB  chain identifier.
 * 19 - 22        Integer       seqNum        PDB  sequence number.
 * 23             AChar         iCode         PDB insertion code.
 * 25 - 28        LString       database
 * 30 - 38        LString       dbAccession   Sequence  database accession number.
 * 40 - 42        Residue name  dbRes         Sequence database residue name.
 * 44 - 48        Integer       dbSeq         Sequence database sequence number.
 * 50 - 70        LString       conflict      Conflict comment.
 */
export class SeqadvParser extends AbstractParser<Seqadv[]> {

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

/***
 * COLUMNS        DATA TYPE     FIELD       DEFINITION
 * --------------------------------------------------------------------------------
 *  1 -  6        Record name   "MODRES"
 *  8 - 11        IDcode        idCode      ID code of this entry.
 * 13 - 15        Residue name  resName     Residue name used in this entry.
 * 17             Character     chainID     Chain identifier.
 * 19 - 22        Integer       seqNum      Sequence number.
 * 23             AChar         iCode       Insertion code.
 * 25 - 27        Residue name  stdRes      Standard residue name.
 * 30 - 70        String        comment     Description of the residue modification.
 */
export class ModresParser extends AbstractParser<Modres[]> {

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

/***
 * COLUMNS        DATA  TYPE    FIELD         DEFINITION
 * -----------------------------------------------------------------------------------
 *  1 -  6        Record name   "DBREF1"
 *  8 - 11        IDcode        idCode        ID code of this entry.
 * 13             Character     chainID       Chain identifier.
 * 15 - 18        Integer       seqBegin      Initial sequence number of the
 *                                            PDB sequence segment, right justified.
 * 19             AChar         insertBegin   Initial insertion code of the
 *                                            PDB sequence segment.
 * 21 - 24        Integer       seqEnd        Ending sequence number of the
 *                                            PDB sequence segment, right justified.
 * 25             AChar         insertEnd     Ending insertion code of the
 *                                            PDB sequence  segment.
 * 27 - 32        LString       database      Sequence database name.
 * 48 - 67        LString       dbIdCode      Sequence database identification code,
 *                                            left justified.
 */
export class Dbref1Parser extends AbstractParser<Dbref1[]> {

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

/***
 * COLUMNS       DATA  TYPE    FIELD         DEFINITION
 * -----------------------------------------------------------------------------------
 *  1 -  6       Record name   "DBREF2"
 *  8 - 11       IDcode        idCode        ID code of this entry.
 * 13            Character     chainID       Chain identifier.
 * 19 - 40       LString       dbAccession   Sequence database accession code,
 *                                           left justified.
 * 46 - 55       Integer       seqBegin      Initial sequence number of the
 *                                           Database segment, right justified.
 * 58 - 67       Integer       seqEnd        Ending sequence number of the
 *                                           Database segment, right justified.
 */
export class Dbref2Parser extends AbstractParser<Dbref2[]> {

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

/***
 * COLUMNS        DATA TYPE      FIELD        DEFINITION
 * -------------------------------------------------------------------------------------
 *  1 -  6        Record name    "SEQRES"
 *  8 - 10        Integer        serNum       Serial number of the SEQRES record for  the
 *                                            current  chain. Starts at 1 and increments
 *                                            by one  each line. Reset to 1 for each chain.
 * 12             Character      chainID      Chain identifier. This may be any single
 *                                            legal  character, including a blank which is
 *                                            is  used if there is only one chain.
 * 14 - 17        Integer        numRes       Number of residues in the chain.
 *                                            This  value is repeated on every record.
 * 20 - 22        Residue name   resName      Residue name.
 * 24 - 26        Residue name   resName      Residue name.
 * 28 - 30        Residue name   resName      Residue name.
 * 32 - 34        Residue name   resName      Residue name.
 * 36 - 38        Residue name   resName      Residue name.
 * 40 - 42        Residue name   resName      Residue name.
 * 44 - 46        Residue name   resName      Residue name.
 * 48 - 50        Residue name   resName      Residue name.
 * 52 - 54        Residue name   resName      Residue name.
 * 56 - 58        Residue name   resName      Residue name.
 * 60 - 62        Residue name   resName      Residue name.
 * 64 - 66        Residue name   resName      Residue name.
 * 68 - 70        Residue name   resName      Residue name.
 */
export class SeqresParser extends AbstractParser<Seqres[]> {

    match(line: string): boolean {
        return line.startsWith('SEQRES')
    }

    parse(): Seqres[] {
        return this.lines.map(it => {
            const serNum = it.extract(8, 10)
            const chainID = it.extract(12, 12)
            const numRes = it.extract(14, 17)
            const resNames = [
                it.extract(20, 22),
                it.extract(24, 26),
                it.extract(28, 30),
                it.extract(32, 34),
                it.extract(36, 38),
                it.extract(40, 42),
                it.extract(44, 46),
                it.extract(48, 50),
                it.extract(52, 54),
                it.extract(56, 58),
                it.extract(60, 62),
                it.extract(64, 66),
                it.extract(68, 70),
            ].filter(it => it) as string[]
            return {
                serNum: serNum ? parseInt(serNum) : null,
                chainID,
                numRes: numRes ? parseInt(numRes) : null,
                resNames,
            }
        })
    }
}
