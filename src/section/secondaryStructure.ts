// 100%
import '../extension/string';
import {AbstractParser} from "../parser";

/***
 * https://www.wwpdb.org/documentation/file-format-content/format33/sect5.html#HELIX
 */
export interface Helix {
    serNum: number | null
    helixID: string | null

    initResName: string | null
    initChainID: string | null
    initSeqNum: number | null
    initICode: string | null

    endResName: string | null
    endChainID: string | null
    endSeqNum: number | null
    endICode: string | null

    helixClass: number | null
    comment: string | null
    length: number | null
}

/***
 * https://www.wwpdb.org/documentation/file-format-content/format33/sect5.html#SHEET
 */
export interface Sheet {
    strand: number | null
    sheetID: string | null
    numStrands: number | null

    initResName: string | null
    initChainID: string | null
    initSeqNum: number | null
    initICode: string | null

    endResName: string | null
    endChainID: string | null
    endSeqNum: number | null
    endICode: string | null

    sense: number | null

    curAtom: string | null
    curResName: string | null
    curChainId: string | null
    curResSeq: number | null
    curICode: string | null

    prevAtom: string | null
    prevResName: string | null
    prevChainId: string | null
    prevResSeq: number | null
    prevICode: string | null
}

/***
 * COLUMNS        DATA  TYPE     FIELD         DEFINITION
 * -----------------------------------------------------------------------------------
 *  1 -  6        Record name    "HELIX "
 *  8 - 10        Integer        serNum        Serial number of the helix. This starts
 *                                             at 1  and increases incrementally.
 * 12 - 14        LString(3)     helixID       Helix  identifier. In addition to a serial
 *                                             number, each helix is given an
 *                                             alphanumeric character helix identifier.
 * 16 - 18        Residue name   initResName   Name of the initial residue.
 * 20             Character      initChainID   Chain identifier for the chain containing
 *                                             this  helix.
 * 22 - 25        Integer        initSeqNum    Sequence number of the initial residue.
 * 26             AChar          initICode     Insertion code of the initial residue.
 * 28 - 30        Residue  name  endResName    Name of the terminal residue of the helix.
 * 32             Character      endChainID    Chain identifier for the chain containing
 *                                             this  helix.
 * 34 - 37        Integer        endSeqNum     Sequence number of the terminal residue.
 * 38             AChar          endICode      Insertion code of the terminal residue.
 * 39 - 40        Integer        helixClass    Helix class (see below).
 * 41 - 70        String         comment       Comment about this helix.
 * 72 - 76        Integer        length        Length of this helix.
 */
export class HelixParser extends AbstractParser<Helix[]> {

    protected match(line: string): boolean {
        return line.startsWith('HELIX ')
    }

    protected _parse(): Helix[] {
        return this.lines.map(line => {
            const serNum = line.extract(8, 10)
            const helixID = line.extract(12, 14)
            const initResName = line.extract(16, 18)
            const initChainID = line.extract(20, 20)
            const initSeqNum = line.extract(22, 25)
            const initICode = line.extract(26, 26)
            const endResName = line.extract(28, 30)
            const endChainID = line.extract(32, 32)
            const endSeqNum = line.extract(34, 37)
            const endICode = line.extract(38, 38)
            const helixClass = line.extract(39, 40)
            const comment = line.extract(41, 70)
            const length = line.extract(72, 76)

            return {
                serNum: this.toIntOrNull(serNum),
                helixID,
                initResName,
                initChainID,
                initSeqNum: this.toIntOrNull(initSeqNum),
                initICode,
                endResName,
                endChainID,
                endSeqNum: this.toIntOrNull(endSeqNum),
                endICode,
                helixClass: this.toIntOrNull(helixClass),
                comment,
                length: this.toIntOrNull(length),
            }
        })
    }
}

/***
 * COLUMNS       DATA  TYPE     FIELD          DEFINITION
 * -------------------------------------------------------------------------------------
 *  1 -  6        Record name   "SHEET "
 *  8 - 10        Integer       strand         Strand  number which starts at 1 for each
 *                                             strand within a sheet and increases by one.
 * 12 - 14        LString(3)    sheetID        Sheet  identifier.
 * 15 - 16        Integer       numStrands     Number  of strands in sheet.
 * 18 - 20        Residue name  initResName    Residue  name of initial residue.
 * 22             Character     initChainID    Chain identifier of initial residue
 *                                             in strand.
 * 23 - 26        Integer       initSeqNum     Sequence number of initial residue
 *                                             in strand.
 * 27             AChar         initICode      Insertion code of initial residue
 *                                             in  strand.
 * 29 - 31        Residue name  endResName     Residue name of terminal residue.
 * 33             Character     endChainID     Chain identifier of terminal residue.
 * 34 - 37        Integer       endSeqNum      Sequence number of terminal residue.
 * 38             AChar         endICode       Insertion code of terminal residue.
 * 39 - 40        Integer       sense          Sense of strand with respect to previous
 *                                             strand in the sheet. 0 if first strand,
 *                                             1 if  parallel,and -1 if anti-parallel.
 * 42 - 45        Atom          curAtom        Registration.  Atom name in current strand.
 * 46 - 48        Residue name  curResName     Registration.  Residue name in current strand
 * 50             Character     curChainId     Registration. Chain identifier in
 *                                             current strand.
 * 51 - 54        Integer       curResSeq      Registration.  Residue sequence number
 *                                             in current strand.
 * 55             AChar         curICode       Registration. Insertion code in
 *                                             current strand.
 * 57 - 60        Atom          prevAtom       Registration.  Atom name in previous strand.
 * 61 - 63        Residue name  prevResName    Registration.  Residue name in
 *                                             previous strand.
 * 65             Character     prevChainId    Registration.  Chain identifier in
 *                                             previous  strand.
 * 66 - 69        Integer       prevResSeq     Registration. Residue sequence number
 *                                             in previous strand.
 * 70             AChar         prevICode      Registration.  Insertion code in
 *                                             previous strand.
 */
export class SheetParser extends AbstractParser<Sheet[]> {

    protected match(line: string): boolean {
        return line.startsWith('SHEET ')
    }

    protected _parse(): Sheet[] {
        return this.lines.map(line => {
            const strand = line.extract(8, 10)
            const sheetID = line.extract(12, 14)
            const numStrands = line.extract(15, 16)

            const initResName = line.extract(18, 20)
            const initChainID = line.extract(22, 22)
            const initSeqNum = line.extract(23, 26)
            const initICode = line.extract(27, 27)

            const endResName = line.extract(29, 31)
            const endChainID = line.extract(33, 33)
            const endSeqNum = line.extract(34, 37)
            const endICode = line.extract(38, 38)

            const sense = line.extract(39, 40)

            const curAtom = line.extract(42, 45)
            const curResName = line.extract(46, 48)
            const curChainId = line.extract(50, 50)
            const curResSeq = line.extract(51, 54)
            const curICode = line.extract(55, 55)

            const prevAtom = line.extract(57, 60)
            const prevResName = line.extract(61, 63)
            const prevChainId = line.extract(65, 65)
            const prevResSeq = line.extract(66, 69)
            const prevICode = line.extract(70, 70)

            return {
                strand: this.toIntOrNull(strand),
                sheetID,
                numStrands: this.toIntOrNull(numStrands),

                initResName,
                initChainID,
                initSeqNum: this.toIntOrNull(initSeqNum),
                initICode,

                endResName,
                endChainID,
                endSeqNum: this.toIntOrNull(endSeqNum),
                endICode,

                sense: this.toIntOrNull(sense),

                curAtom,
                curResName,
                curChainId,
                curResSeq: this.toIntOrNull(curResSeq),
                curICode,

                prevAtom,
                prevResName,
                prevChainId,
                prevResSeq: this.toIntOrNull(prevResSeq),
                prevICode,
            }
        })
    }
}