import '../extension/string';
import {AbstractParser} from "../parser";

export interface Site {
    seqNum: number | null
    siteID: string | null
    numRes: number | null
    residues: Residue[]
}

export interface Residue {
    resName: string | null
    chainID: string | null
    seq: number | null
    iCode: string | null
}

/***
 * COLUMNS        DATA  TYPE    FIELD         DEFINITION
 * ---------------------------------------------------------------------------------
 *  1 -  6        Record name   "SITE  "
 *  8 - 10        Integer       seqNum        Sequence number.
 * 12 - 14        LString(3)    siteID        Site name.
 * 16 - 17        Integer       numRes        Number of residues that compose the site.
 * 19 - 21        Residue name  resName1      Residue name for first residue that
 *                                            creates the site.
 * 23             Character     chainID1      Chain identifier for first residue of site.
 * 24 - 27        Integer       seq1          Residue sequence number for first residue
 *                                            of the  site.
 * 28             AChar         iCode1        Insertion code for first residue of the site.
 * 30 - 32        Residue name  resName2      Residue name for second residue that
 *                                            creates the site.
 * 34             Character     chainID2      Chain identifier for second residue of
 *                                            the  site.
 * 35 - 38        Integer       seq2          Residue sequence number for second
 *                                            residue of the site.
 * 39             AChar         iCode2        Insertion code for second residue
 *                                            of the  site.
 * 41 - 43        Residue name  resName3      Residue name for third residue that
 *                                            creates  the site.
 * 45             Character     chainID3      Chain identifier for third residue
 *                                            of the site.
 * 46 - 49        Integer       seq3          Residue sequence number for third
 *                                            residue of the site.
 * 50             AChar         iCode3        Insertion code for third residue
 *                                            of the site.
 * 52 - 54        Residue name  resName4      Residue name for fourth residue that
 *                                            creates  the site.
 * 56             Character     chainID4      Chain identifier for fourth residue
 *                                            of the site.
 * 57 - 60        Integer       seq4          Residue sequence number for fourth
 *                                            residue of the site.
 * 61             AChar         iCode4        Insertion code for fourth residue
 *                                            of the site.
 */
export class SiteParser extends AbstractParser<Site[]> {

    match(line: string): boolean {
        return line.startsWith('SITE  ')
    }

    parse(): Site[] {
        const toResidue: (
            resName: string | null,
            chainID: string | null,
            seq: string | null,
            iCode: string | null,
        ) => Residue | null = (resName, chainID, seq, iCode) => {
            if (resName == null || chainID == null || seq == null) {
                return null
            }
            return {
                resName,
                chainID,
                seq: this.toIntOrNull(seq),
                iCode,
            }
        }

        return this.lines.map(line => {
            const seqNum = line.extract(8, 10)
            const siteID = line.extract(12, 14)
            const numRes = line.extract(16, 17)

            const resName1 = line.extract(19, 21)
            const chainID1 = line.extract(23, 23)
            const seq1 = line.extract(24, 27)
            const iCode1 = line.extract(28, 28)

            const resName2 = line.extract(30, 32)
            const chainID2 = line.extract(34, 34)
            const seq2 = line.extract(35, 38)
            const iCode2 = line.extract(39, 39)

            const resName3 = line.extract(41, 43)
            const chainID3 = line.extract(45, 45)
            const seq3 = line.extract(46, 49)
            const iCode3 = line.extract(50, 50)

            const resName4 = line.extract(52, 54)
            const chainID4 = line.extract(56, 56)
            const seq4 = line.extract(57, 60)
            const iCode4 = line.extract(61, 61)

            return {
                seqNum: this.toIntOrNull(seqNum),
                siteID,
                numRes: this.toIntOrNull(numRes),
                residues: [
                    toResidue(resName1, chainID1, seq1, iCode1),
                    toResidue(resName2, chainID2, seq2, iCode2),
                    toResidue(resName3, chainID3, seq3, iCode3),
                    toResidue(resName4, chainID4, seq4, iCode4),
                ].filter(it => it) as Residue[]
            }
        })
    }
}