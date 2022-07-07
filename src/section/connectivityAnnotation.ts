import '../extension/string';
import {AbstractParser} from "../parser";

export interface Ssbond {
    serNum: number | null
    resName1: string | null
    chainID1: string | null
    seqNum1: number | null
    icode1: string | null
    resName2: string | null
    chainID2: string | null
    seqNum2: number | null
    icode2: string | null
    sym1: string | null
    sym2: string | null
    Length: number | null
}

// TODO
export interface Link {

}

export interface Cispep {
    serNum: number | null
    pep1: string | null
    chainID1: string | null
    seqNum1: number | null
    icode1: string | null
    pep2: string | null
    chainID2: string | null
    seqNum2: number | null
    icode2: string | null
    modNum: number | null
    measure: number | null
}

/***
 * COLUMNS        DATA  TYPE     FIELD            DEFINITION
 * --------------------------------------------------------------------------------
 *  1 -  6        Record name    "SSBOND"
 *  8 - 10        Integer        serNum           Serial number.
 * 12 - 14        LString(3)     "CYS"            Residue name.
 * 16             Character      chainID1         Chain identifier.
 * 18 - 21        Integer        seqNum1          Residue sequence number.
 * 22             AChar          icode1           Insertion code.
 * 26 - 28        LString(3)     "CYS"            Residue name.
 * 30             Character      chainID2         Chain identifier.
 * 32 - 35        Integer        seqNum2          Residue sequence number.
 * 36             AChar          icode2           Insertion code.
 * 60 - 65        SymOP          sym1             Symmetry operator for residue 1.
 * 67 - 72        SymOP          sym2             Symmetry operator for residue 2.
 * 74 – 78        Real(5.2)      Length           Disulfide bond distance
 */
export class SsbondParser extends AbstractParser<Ssbond[]> {

    match(line: string): boolean {
        return line.startsWith('SSBOND')
    }

    _parse(): Ssbond[] {
        return this.lines.map(line => {
            const serNum = line.extract(8, 10)
            const resName1 = line.extract(12, 14)
            const chainID1 = line.extract(16, 16)
            const seqNum1 = line.extract(18, 21)
            const icode1 = line.extract(22, 22)
            const resName2 = line.extract(26, 28)
            const chainID2 = line.extract(30, 30)
            const seqNum2 = line.extract(32, 35)
            const icode2 = line.extract(36, 36)
            const sym1 = line.extract(60, 65)
            const sym2 = line.extract(67, 72)
            const Length = line.extract(74, 78)

            return {
                serNum: this.toIntOrNull(serNum),
                resName1,
                chainID1,
                seqNum1: this.toIntOrNull(seqNum1),
                icode1,
                resName2,
                chainID2,
                seqNum2: this.toIntOrNull(seqNum2),
                icode2,
                sym1,
                sym2,
                Length: this.toFloatOrNull(Length),
            }
        })
    }
}

/***
 * COLUMNS       DATA  TYPE    FIELD         DEFINITION
 * -------------------------------------------------------------------------
 *  1 -  6       Record name   "CISPEP"
 *  8 - 10       Integer       serNum        Record serial number.
 * 12 - 14       LString(3)    pep1          Residue name.
 * 16            Character     chainID1      Chain identifier.
 * 18 - 21       Integer       seqNum1       Residue sequence number.
 * 22            AChar         icode1        Insertion code.
 * 26 - 28       LString(3)    pep2          Residue name.
 * 30            Character     chainID2      Chain identifier.
 * 32 - 35       Integer       seqNum2       Residue sequence number.
 * 36            AChar         icode2        Insertion code.
 * 44 - 46       Integer       modNum        Identifies the specific model.
 * 54 - 59       Real(6.2)     measure       Angle measurement in degrees.
 */
export class CispepParser extends AbstractParser<Cispep[]> {

    match(line: string): boolean {
        return line.startsWith('CISPEP')
    }

    _parse(): Cispep[] {
        return this.lines.map(line => {
            const serNum = line.extract(8, 10)
            const pep1 = line.extract(12, 14)
            const chainID1 = line.extract(16, 16)
            const seqNum1 = line.extract(18, 21)
            const icode1 = line.extract(22, 22)
            const pep2 = line.extract(26, 28)
            const chainID2 = line.extract(30, 30)
            const seqNum2 = line.extract(32, 35)
            const icode2 = line.extract(36, 36)
            const modNum = line.extract(44, 46)
            const measure = line.extract(54, 59)

            return {
                serNum: this.toIntOrNull(serNum),
                pep1,
                chainID1,
                seqNum1: this.toIntOrNull(seqNum1),
                icode1,
                pep2,
                chainID2,
                seqNum2: this.toIntOrNull(seqNum2),
                icode2,
                modNum: this.toIntOrNull(modNum),
                measure: this.toFloatOrNull(measure),
            }
        })
    }
}