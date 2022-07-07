import '../extension/string';
import {AbstractParser} from "../parser";

export interface Header {
    classification: string | null
    depDate: string | null
    idCode: string | null
}

export interface Obslte {
    repDate: string | null
    idCode: string | null
    rIdCodes: string[]
}

/***
 * remark 465
 */
export interface MissingResidue {
    resName: string | null
    chainID: string | null
    seqNum: number | null
    iCode: string | null
}

/***
 * remark 470
 */
export interface MissingAtom {
    resName: string | null
    chainID: string | null
    seqNum: number | null
    iCode: string | null
    atoms: string[]
}

/***
 * COLUMNS       DATA  TYPE     FIELD             DEFINITION
 * ------------------------------------------------------------------------------------
 *  1 -  6       Record name    "HEADER"
 * 11 - 50       String(40)     classification    Classifies the molecule(s).
 * 51 - 59       Date           depDate           Deposition date. This is the date the
 *                                                coordinates  were received at the PDB.
 * 63 - 66       IDcode         idCode            This identifier is unique within the PDB.
 */
export class HeaderParser extends AbstractParser<Header> {

    match(line: string): boolean {
        return line.startsWith('HEADER')
    }

    parse(): Header {
        const empty = {
            classification: null,
            depDate: null,
            idCode: null
        }

        if (this.lines.length == 0)
            return empty

        const line = this.lines[0]

        const classification = line.extract(11, 50)
        const depDate = line.extract(51, 59)
        const idCode = line.extract(63, 66)

        return {
            ...empty,
            classification,
            depDate,
            idCode
        }
    }
}

/***
 * COLUMNS      DATA  TYPE      FIELD         DEFINITION
 * ------------------------------------------------------------------------------------
 *  1 -  6      Record name     "AUTHOR"
 *  9 - 10      Continuation    continuation  Allows concatenation of multiple records.
 * 11 - 79      List            authorList    List of the author names, separated
 *                                            by commas.
 */
export class AuthorParser extends AbstractParser<string[]> {

    match(line: string): boolean {
        return line.startsWith('AUTHOR')
    }

    parse(): string[] {
        return this.lines.map(it => it.extract(11))
            .filter(it => it)
            .join('')
            .split(",")
            .map(it => it.trim()) as string[]
    }
}

/***
 * COLUMNS       DATA  TYPE     FIELD         DEFINITION
 * ---------------------------------------------------------------------------------------
 *  1 -  6       Record name   "OBSLTE"
 *  9 - 10       Continuation  continuation  Allows concatenation of multiple records
 * 12 - 20       Date          repDate       Date that this entry was replaced.
 * 22 - 25       IDcode        idCode        ID code of this entry.
 * 32 - 35       IDcode        rIdCode       ID code of entry that replaced this one.
 * 37 - 40       IDcode        rIdCode       ID code of entry that replaced this one.
 * 42 - 45       IDcode        rIdCode       ID code of entry  that replaced this one.
 * 47 - 50       IDcode        rIdCode       ID code of entry that replaced this one.
 * 52 - 55       IDcode        rIdCode       ID code of entry that replaced this one.
 * 57 - 60       IDcode        rIdCode       ID code of entry that replaced this one.
 * 62 - 65       IDcode        rIdCode       ID code of entry that replaced this one.
 * 67 - 70       IDcode        rIdCode       ID code of entry that replaced this one.
 * 72 - 75       IDcode        rIdCode       ID code of entry that replaced this one.
 */
export class ObslteParser extends AbstractParser<Obslte[]> {

    match(line: string): boolean {
        return line.startsWith('OBSLTE')
    }

    parse(): Obslte[] {
        return this.lines.map(it => {
            const repDate = it.extract(12, 20)
            const idCode = it.extract(22, 25)
            const rIdCodes = [
                it.extract(32, 35),
                it.extract(37, 40),
                it.extract(42, 45),
                it.extract(47, 50),
                it.extract(52, 55),
                it.extract(57, 60),
                it.extract(62, 65),
                it.extract(67, 70),
                it.extract(72, 75),
            ].filter(it => it) as string[]
            return {repDate, idCode, rIdCodes}
        })
    }
}

/***
 * COLUMNS       DATA  TYPE     FIELD         DEFINITION
 * ---------------------------------------------------------------------------------
 *  1 -  6       Record name    "KEYWDS"
 *  9 - 10       Continuation   continuation  Allows concatenation of records if necessary.
 * 11 - 79       List           keywds        Comma-separated list of keywords relevant
 *                                            to the entry.
 */
export class KeywdsParser extends AbstractParser<string[]> {

    match(line: string): boolean {
        return line.startsWith('KEYWDS')
    }

    parse(): string[] {
        return this.lines.map(it => it.extract(11))
            .filter(it => it)
            .join('')
            .split(",")
            .map(it => it.trim()) as string[]
    }
}

/***
 * COLUMNS       DATA  TYPE     FIELD         DEFINITION
 * ----------------------------------------------------------------------------------
 *  1 -  6       Record name    "TITLE "
 *  9 - 10       Continuation   continuation  Allows concatenation of multiple records.
 * 11 - 80       String         title         Title of the  experiment.
 */
export class TitleParser extends AbstractParser<string | null> {

    match(line: string): boolean {
        return line.startsWith('TITLE ')
    }

    parse(): string | null {
        const title = this.lines.map(it => it.extract(11)).join(' ')
        if (title.isBlank()) return null
        return title
    }
}

/***
 * COLUMNS       DATA TYPE      FIELD         DEFINITION
 * ------------------------------------------------------------------------------------
 *  1 -  6       Record name    "EXPDTA"
 *  9 - 10       Continuation   continuation  Allows concatenation of multiple records.
 * 11 - 79       SList          technique     The experimental technique(s) with
 *                                            optional comment describing the
 *                                            sample or experiment.
 */
export class ExpdtaParser extends AbstractParser<string[]> {

    match(line: string): boolean {
        return line.startsWith('EXPDTA')
    }

    parse(): string[] {
        return this.lines.map(it => it.extract(11))
            .filter(it => it) as string[]
    }
}

/***
 * COLUMNS        DATA TYPE     FIELD         DEFINITION
 * ----------------------------------------------------------------------------------
 *  1 -  6        Record  name  "SPLIT "
 *  9 - 10        Continuation  continuation  Allows concatenation of multiple records.
 * 12 - 15        IDcode        idCode        ID code of related entry.
 * 17 - 20        IDcode        idCode        ID code of related entry.
 * 22 - 25        IDcode        idCode        ID code of related entry.
 * 27 – 30        IDcode        idCode        ID code of related entry.
 * 32 - 35        IDcode        idCode        ID code of related entry.
 * 37 - 40        IDcode        idCode        ID code of related entry.
 * 42 - 45        IDcode        idCode        ID code of related entry.
 * 47 - 50        IDcode        idCode        ID code of related entry.
 * 52 - 55        IDcode        idCode        ID code of related entry.
 * 57 - 60        IDcode        idCode        ID code of related entry.
 * 62 - 65        IDcode        idCode        ID code of related entry.
 * 67 - 70        IDcode        idCode        ID code of related entry.
 * 72 - 75        IDcode        idCode        ID code of related entry.
 * 77 - 80        IDcode        idCode        ID code of related entry.
 */
export class SplitParser extends AbstractParser<string[]> {

    match(line: string): boolean {
        return line.startsWith('SPLIT ')
    }

    parse(): string[] {
        return this.lines.flatMap(it => {
            return [
                it.extract(12, 15),
                it.extract(17, 20),
                it.extract(22, 25),
                it.extract(27, 30),
                it.extract(32, 35),
                it.extract(37, 40),
                it.extract(42, 45),
                it.extract(47, 50),
                it.extract(52, 55),
                it.extract(57, 60),
                it.extract(62, 65),
                it.extract(67, 70),
                it.extract(72, 75),
                it.extract(77, 80),
            ].filter(it => it) as string[]
        })
    }
}

/***
 * COLUMNS       DATA TYPE     FIELD         DEFINITION
 * --------------------------------------------------------------------------------------
 *  1 -  6       Record name   "REMARK"
 *  8 - 10       Integer       remarkNum     Remark  number. It is not an error for
 *                                           remark n to exist in an entry when
 *                                           remark n-1 does not.
 * 12 - 79       LString       empty         Left  as white space in first line
 *                                           of each  new remark.
 */
abstract class RemarkParser<T> extends AbstractParser<T> {

    abstract readonly remarkNum: number

    match(line: string): boolean {
        if (line.startsWith('REMARK')) {
            const remarkNum = this.toIntOrNull(line.extract(8, 10)!)
            if (this.remarkNum == remarkNum) return true
        }
        return false
    }
}

/***
 * Template for non NMR entries
 *
 *          1         2         3         4         5         6         7         8
 * 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 * REMARK 465
 * REMARK 465 MISSING RESIDUES
 * REMARK 465 THE FOLLOWING RESIDUES WERE NOT LOCATED IN  THE
 * REMARK 465 EXPERIMENT. (M=MODEL NUMBER; RES=RESIDUE NAME;  C=CHAIN
 * REMARK 465 IDENTIFIER; SSSEQ=SEQUENCE NUMBER; I=INSERTION  CODE.)
 * REMARK 465
 * REMARK 465   M RES C SSSEQI
 *
 * Template for NMR entries (new)
 *
 *          1         2         3         4         5         6         7         8
 * 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 * REMARK 465
 * REMARK 465 MISSING RESIDUES
 * REMARK 465 THE FOLLOWING RESIDUES WERE NOT LOCATED IN THE
 * REMARK 465 EXPERIMENT. (RES=RESIDUE NAME; C=CHAIN IDENTIFIER;
 * REMARK 465 SSSEQ=SEQUENCE NUMBER; I=INSERTION CODE.)
 * REMARK 465   MODELS X-YYY
 * REMARK 465     RES C SSSEQI
 */
export class Remark465Parser extends RemarkParser<MissingResidue[]> {
    readonly remarkNum: number = 465

    parse(): MissingResidue[] {
        const missingResidues: MissingResidue[] = []
        let find = false
        for (const line of this.lines) {
            if (find) {
                const resName = line.extract(16, 19)
                const chainID = line.extract(20, 20)
                const seqNum = line.extract(22, 26)
                const iCode = line.extract(27, 27)
                missingResidues.push({
                    resName,
                    chainID,
                    seqNum: this.toIntOrNull(seqNum),
                    iCode,
                })
            } else {
                if (line.includes('RES C SSSEQI')) {
                    find = true
                }
            }
        }
        return missingResidues
    }
}

/***
 * Template for non NMR entries
 *
 *          1         2         3         4         5         6         7         8
 * 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 * REMARK 470
 * REMARK 470 MISSING ATOM
 * REMARK 470 THE FOLLOWING RESIDUES HAVE MISSING ATOMS (M=MODEL NUMBER;
 * REMARK 470 RES=RESIDUE NAME; C=CHAIN IDENTIFIER;  SSEQ=SEQUENCE NUMBER;
 * REMARK 470 I=INSERTION CODE):
 * REMARK 470   M RES  CSSEQI  ATOMS
 *
 * Template for NMR entries (add)
 *
 *          1         2         3         4         5         6         7         8
 * 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 * REMARK 470 MISSING ATOM
 * REMARK 470 THE FOLLOWING RESIDUES HAVE MISSING ATOMS (RES=RESIDUE NAME;
 * REMARK 470 C=CHAIN IDENTIFIER; SSEQ=SEQUENCE NUMBER; I=INSERTION CODE):
 * REMARK 470   MODELS X-YYY
 * REMARK 470     RES CSSEQI  ATOMS
 */
export class Remark470Parser extends RemarkParser<MissingAtom[]> {
    readonly remarkNum: number = 470

    parse(): MissingAtom[] {
        const toMissingAtom: (
            resName: string | null,
            chainID: string | null,
            seqNum: string | null,
            iCode: string | null,
            atoms: string | null
        ) => MissingAtom = (resName, chainID, seqNum, iCode, atoms) => {
            return {
                resName,
                chainID,
                seqNum: this.toIntOrNull(seqNum),
                iCode,
                atoms: atoms?.split(' ')?.map(it => it.trim())?.filter(it => it) ?? []
            }
        }

        const missingAtoms: MissingAtom[] = []
        let find: 'NonNMR' | 'NMR' | null = null
        for (const line of this.lines) {
            switch (find) {
                case 'NonNMR': {
                    const resName = line.extract(16, 19)
                    const chainID = line.extract(21, 21)
                    const seqNum = line.extract(22, 25)
                    const iCode = line.extract(26, 26)
                    const atoms = line.extract(29)
                    missingAtoms.push(toMissingAtom(resName, chainID, seqNum, iCode, atoms))
                    break
                }
                case 'NMR': {
                    const resName = line.extract(16, 19)
                    const chainID = line.extract(20, 20)
                    const seqNum = line.extract(21, 24)
                    const iCode = line.extract(25, 25)
                    const atoms = line.extract(28)
                    missingAtoms.push(toMissingAtom(resName, chainID, seqNum, iCode, atoms))
                    break
                }
                default:
                    if (line.includes('RES  CSSEQI  ATOMS')) {
                        find = "NonNMR"
                    } else if (line.includes('RES CSSEQI  ATOMS')) {
                        find = "NMR"
                    }
                    break
            }
        }
        return missingAtoms
    }
}


