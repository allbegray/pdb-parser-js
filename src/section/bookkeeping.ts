// 100%
import '../extension/string';
import {AbstractParser} from "../parser";

export interface Master {
    numRemark: number | null
    // "0": number | null
    numHet: number | null
    numHelix: number | null
    numSheet: number | null
    numTurn: number | null
    numSite: number | null
    numXform: number | null
    numCoord: number | null
    numTer: number | null
    numConect: number | null
    numSeq: number | null
}

export interface End {
}

/***
 * COLUMNS         DATA TYPE     FIELD          DEFINITION
 * ----------------------------------------------------------------------------------
 *  1 -  6         Record name   "MASTER"
 * 11 - 15         Integer       numRemark      Number of REMARK records
 * 16 - 20         Integer       "0"
 * 21 - 25         Integer       numHet         Number of HET records
 * 26 - 30         Integer       numHelix       Number of HELIX records
 * 31 - 35         Integer       numSheet       Number of SHEET records
 * 36 - 40         Integer       numTurn        deprecated
 * 41 - 45         Integer       numSite        Number of SITE records
 * 46 - 50         Integer       numXform       Number of coordinate transformation
 *                                              records  (ORIGX+SCALE+MTRIX)
 * 51 - 55         Integer       numCoord       Number of atomic coordinate records
 *                                              records (ATOM+HETATM)
 * 56 - 60         Integer       numTer         Number of TER records
 * 61 - 65         Integer       numConect      Number of CONECT records
 * 66 - 70         Integer       numSeq         Number of SEQRES records
 */
export class MasterParser extends AbstractParser<Master | null> {

    protected match(line: string): boolean {
        return line.startsWith('MASTER')
    }

    protected _parse(): Master | null {
        if (this.lines.length == 0)
            return null
        const line = this.lines[0]

        const numRemark = line.extract(11, 15)
        const numHet = line.extract(21, 25)
        const numHelix = line.extract(26, 30)
        const numSheet = line.extract(31, 35)
        const numTurn = line.extract(36, 40)
        const numSite = line.extract(41, 45)
        const numXform = line.extract(46, 50)
        const numCoord = line.extract(51, 55)
        const numTer = line.extract(56, 60)
        const numConect = line.extract(61, 65)
        const numSeq = line.extract(66, 70)

        return {
            numRemark: this.toIntOrNull(numRemark),
            numHet: this.toIntOrNull(numHet),
            numHelix: this.toIntOrNull(numHelix),
            numSheet: this.toIntOrNull(numSheet),
            numTurn: this.toIntOrNull(numTurn),
            numSite: this.toIntOrNull(numSite),
            numXform: this.toIntOrNull(numXform),
            numCoord: this.toIntOrNull(numCoord),
            numTer: this.toIntOrNull(numTer),
            numConect: this.toIntOrNull(numConect),
            numSeq: this.toIntOrNull(numSeq),
        }
    }
}