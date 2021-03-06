// 100%
import '../extension/string';
import {AbstractParser, Parser, SectionParser} from "../parser";
import {toIntOrNull} from "../extension/string";
import {Residue, Section} from "../model";

export interface Dbref extends Dbref1, Dbref2 {
    // idCode: string | null
    // chainID: string | null
    // seqBegin: number | null
    // insertBegin: string | null
    // seqEnd: number | null
    // insertEnd: string | null
    // database: string | null
    // dbAccession: string | null
    // dbIdCode: string | null
    dbseqBegin: number | null
    idbnsBeg: string | null
    dbseqEnd: number | null
    dbinsEnd: string | null
}

class Seqadv implements Residue {
    idCode: string | null
    resName: string | null
    chainID: string | null
    resSeq: number | null
    iCode: string | null
    database: string | null
    dbAccession: string | null
    dbRes: string | null
    dbSeq: number | null
    conflict: string | null

    constructor(idCode: string | null, resName: string | null, chainID: string | null, resSeq: number | null, iCode: string | null, database: string | null, dbAccession: string | null, dbRes: string | null, dbSeq: number | null, conflict: string | null) {
        this.idCode = idCode;
        this.resName = resName;
        this.chainID = chainID;
        this.resSeq = resSeq;
        this.iCode = iCode;
        this.database = database;
        this.dbAccession = dbAccession;
        this.dbRes = dbRes;
        this.dbSeq = dbSeq;
        this.conflict = conflict;
    }

    isMutation(): boolean {
        return this.conflict == 'ENGINEERED MUTATION'
    }
}

export interface Modres extends Residue {
    idCode: string | null
    // resName: string | null
    // chainID: string | null
    // seqNum: number | null
    // iCode: string | null
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

    protected match(line: string): boolean {
        return line.startsWith('DBREF ')
    }

    protected _parse(): Dbref[] {
        return this.lines.map(line => {
            const idCode = line.extract(8, 11)
            const chainID = line.extract(13, 13)
            const seqBegin = line.extract(15, 18)
            const insertBegin = line.extract(19, 19)
            const seqEnd = line.extract(21, 24)
            const insertEnd = line.extract(25, 25)
            const database = line.extract(27, 32)
            const dbAccession = line.extract(34, 41)
            const dbIdCode = line.extract(43, 54)
            const dbseqBegin = line.extract(56, 60)
            const idbnsBeg = line.extract(61, 61)
            const dbseqEnd = line.extract(63, 67)
            const dbinsEnd = line.extract(68, 68)

            return {
                idCode,
                chainID,
                seqBegin: toIntOrNull(seqBegin),
                insertBegin,
                seqEnd: toIntOrNull(seqEnd),
                insertEnd,
                database,
                dbAccession,
                dbIdCode,
                dbseqBegin: toIntOrNull(dbseqBegin),
                idbnsBeg,
                dbseqEnd: toIntOrNull(dbseqEnd),
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

    protected match(line: string): boolean {
        return line.startsWith('SEQADV')
    }

    protected _parse(): Seqadv[] {
        return this.lines.map(line => {
            const idCode = line.extract(8, 11)
            const resName = line.extract(13, 15)
            const chainID = line.extract(17, 17)
            const seqNum = line.extract(19, 22)
            const iCode = line.extract(23, 23)
            const database = line.extract(25, 28)
            const dbAccession = line.extract(30, 38)
            const dbRes = line.extract(40, 42)
            const dbSeq = line.extract(44, 48)
            const conflict = line.extract(50, 70)

            return new Seqadv(
                idCode,
                resName,
                chainID,
                toIntOrNull(seqNum),
                iCode,
                database,
                dbAccession,
                dbRes,
                toIntOrNull(dbSeq),
                conflict
            )
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

    protected match(line: string): boolean {
        return line.startsWith('MODRES')
    }

    protected _parse(): Modres[] {
        return this.lines.map(line => {
            const idCode = line.extract(8, 11)
            const resName = line.extract(13, 15)
            const chainID = line.extract(17, 17)
            const seqNum = line.extract(19, 22)
            const iCode = line.extract(23, 23)
            const stdRes = line.extract(25, 27)
            const comment = line.extract(30, 70)

            return {
                idCode,
                resName,
                chainID,
                resSeq: toIntOrNull(seqNum),
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

    protected match(line: string): boolean {
        return line.startsWith('DBREF1')
    }

    protected _parse(): Dbref1[] {
        return this.lines.map(line => {
            const idCode = line.extract(8, 11)
            const chainID = line.extract(13, 13)
            const seqBegin = line.extract(15, 18)
            const insertBegin = line.extract(19, 19)
            const seqEnd = line.extract(21, 24)
            const insertEnd = line.extract(25, 25)
            const database = line.extract(27, 32)
            const dbIdCode = line.extract(48, 67)

            return {
                idCode,
                chainID,
                seqBegin: toIntOrNull(seqBegin),
                insertBegin,
                seqEnd: toIntOrNull(seqEnd),
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

    protected match(line: string): boolean {
        return line.startsWith('DBREF2')
    }

    protected _parse(): Dbref2[] {
        return this.lines.map(line => {
            const idCode = line.extract(8, 11)
            const chainID = line.extract(13, 13)
            const dbAccession = line.extract(19, 40)
            const seqBegin = line.extract(46, 55)
            const seqEnd = line.extract(58, 67)

            return {
                idCode,
                chainID,
                dbAccession,
                seqBegin: toIntOrNull(seqBegin),
                seqEnd: toIntOrNull(seqEnd),
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

    protected match(line: string): boolean {
        return line.startsWith('SEQRES')
    }

    protected _parse(): Seqres[] {
        return this.lines.map(line => {
            const serNum = line.extract(8, 10)
            const chainID = line.extract(12, 12)
            const numRes = line.extract(14, 17)
            const resNames = [
                line.extract(20, 22),
                line.extract(24, 26),
                line.extract(28, 30),
                line.extract(32, 34),
                line.extract(36, 38),
                line.extract(40, 42),
                line.extract(44, 46),
                line.extract(48, 50),
                line.extract(52, 54),
                line.extract(56, 58),
                line.extract(60, 62),
                line.extract(64, 66),
                line.extract(68, 70),
            ]

            return {
                serNum: toIntOrNull(serNum),
                chainID,
                numRes: toIntOrNull(numRes),
                resNames: resNames.filter(it => it) as string[],
            }
        })
    }
}

export interface PrimaryStructureSection extends Section {
    dbrefs: Dbref[]
    seqadvs: Seqadv[]
    modress: Modres[]
    dbref1s: Dbref1[]
    dbref2s: Dbref2[]
    seqress: Seqres[]
}

export class PrimaryStructureSectionParser extends SectionParser<PrimaryStructureSection> {
    protected dbrefParser = new DbrefParser()
    protected seqadvParser = new SeqadvParser()
    protected modresParser = new ModresParser()
    protected dbref1Parser = new Dbref1Parser()
    protected dbref2Parser = new Dbref2Parser()
    protected seqresParser = new SeqresParser()

    protected parsers(): Parser<any>[] {
        return [
            this.dbrefParser,
            this.seqadvParser,
            this.modresParser,
            this.dbref1Parser,
            this.dbref2Parser,
            this.seqresParser,
        ]
    }

    parse(): PrimaryStructureSection {
        return {
            dbrefs: this.dbrefParser.parse(),
            seqadvs: this.seqadvParser.parse(),
            modress: this.modresParser.parse(),
            dbref1s: this.dbref1Parser.parse(),
            dbref2s: this.dbref2Parser.parse(),
            seqress: this.seqresParser.parse(),
        }
    }
}
