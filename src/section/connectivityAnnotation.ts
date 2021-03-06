// 100%
import '../extension/string';
import {AbstractParser, Parser, SectionParser} from "../parser";
import {toFloatOrNull, toIntOrNull} from "../extension/string";
import {Residue, ResidueWithAtom, Section} from "../model";

export interface Ssbond {
    serNum: number | null
    residue1: Residue
    // resName1: string | null
    // chainID1: string | null
    // seqNum1: number | null
    // icode1: string | null
    residue2: Residue
    // resName2: string | null
    // chainID2: string | null
    // seqNum2: number | null
    // icode2: string | null
    sym1: string | null
    sym2: string | null
    Length: number | null
}

export interface Link {
    residue1: ResidueWithAtom
    // name1: string | null
    // altLoc1: string | null
    // resName1: string | null
    // chainID1: string | null
    // resSeq1: number | null
    // iCode1: string | null
    residue2: ResidueWithAtom
    // name2: string | null
    // altLoc2: string | null
    // resName2: string | null
    // chainID2: string | null
    // resSeq2: number | null
    // iCode2: string | null
    sym1: string | null
    sym2: string | null
    Length: number | null
}

export interface Cispep {
    serNum: number | null
    residue1: Residue
    // pep1: string | null
    // chainID1: string | null
    // seqNum1: number | null
    // icode1: string | null
    residue2: Residue
    // pep2: string | null
    // chainID2: string | null
    // seqNum2: number | null
    // icode2: string | null
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
 * 74 ??? 78        Real(5.2)      Length           Disulfide bond distance
 */
export class SsbondParser extends AbstractParser<Ssbond[]> {

    protected match(line: string): boolean {
        return line.startsWith('SSBOND')
    }

    protected _parse(): Ssbond[] {
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
                serNum: toIntOrNull(serNum),
                residue1: {
                    resName: resName1 ?? 'CYS',
                    chainID: chainID1,
                    resSeq: toIntOrNull(seqNum1),
                    iCode: icode1,
                },
                residue2: {
                    resName: resName2 ?? 'CYS',
                    chainID: chainID2,
                    resSeq: toIntOrNull(seqNum2),
                    iCode: icode2,
                },
                sym1,
                sym2,
                Length: toFloatOrNull(Length),
            }
        })
    }
}

/***
 * COLUMNS         DATA TYPE      FIELD           DEFINITION
 * ------------------------------------------------------------------------------------
 *  1 -  6         Record name    "LINK  "
 * 13 - 16         Atom           name1           Atom name.
 * 17              Character      altLoc1         Alternate location indicator.
 * 18 - 20         Residue name   resName1        Residue  name.
 * 22              Character      chainID1        Chain identifier.
 * 23 - 26         Integer        resSeq1         Residue sequence number.
 * 27              AChar          iCode1          Insertion code.
 * 43 - 46         Atom           name2           Atom name.
 * 47              Character      altLoc2         Alternate location indicator.
 * 48 - 50         Residue name   resName2        Residue name.
 * 52              Character      chainID2        Chain identifier.
 * 53 - 56         Integer        resSeq2         Residue sequence number.
 * 57              AChar          iCode2          Insertion code.
 * 60 - 65         SymOP          sym1            Symmetry operator atom 1.
 * 67 - 72         SymOP          sym2            Symmetry operator atom 2.
 * 74 ??? 78         Real(5.2)      Length          Link distance
 */
export class LinkParser extends AbstractParser<Link[]> {

    protected match(line: string): boolean {
        return line.startsWith('LINK  ')
    }

    protected _parse(): Link[] {
        return this.lines.map(line => {
            const name1 = line.extract(13, 16)
            const altLoc1 = line.extract(17, 17)
            const resName1 = line.extract(18, 20)
            const chainID1 = line.extract(22, 22)
            const resSeq1 = line.extract(23, 26)
            const iCode1 = line.extract(27, 27)
            const name2 = line.extract(43, 46)
            const altLoc2 = line.extract(47, 47)
            const resName2 = line.extract(48, 50)
            const chainID2 = line.extract(52, 52)
            const resSeq2 = line.extract(53, 56)
            const iCode2 = line.extract(57, 57)
            const sym1 = line.extract(60, 65)
            const sym2 = line.extract(67, 72)
            const Length = line.extract(74, 78)

            return {
                residue1: {
                    atom: name1,
                    altLoc: altLoc1,
                    resName: resName1,
                    chainID: chainID1,
                    resSeq: toIntOrNull(resSeq1),
                    iCode: iCode1,
                },
                residue2: {
                    atom: name2,
                    altLoc: altLoc2,
                    resName: resName2,
                    chainID: chainID2,
                    resSeq: toIntOrNull(resSeq2),
                    iCode: iCode2,
                },
                sym1,
                sym2,
                Length: toFloatOrNull(Length),
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

    protected match(line: string): boolean {
        return line.startsWith('CISPEP')
    }

    protected _parse(): Cispep[] {
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
                serNum: toIntOrNull(serNum),
                residue1: {
                    resName: pep1,
                    chainID: chainID1,
                    resSeq: toIntOrNull(seqNum1),
                    iCode: icode1,
                },
                residue2: {
                    resName: pep2,
                    chainID: chainID2,
                    resSeq: toIntOrNull(seqNum2),
                    iCode: icode2,
                },
                modNum: toIntOrNull(modNum),
                measure: toFloatOrNull(measure),
            }
        })
    }
}

export interface ConnectivityAnnotationSection extends Section {
    ssbonds: Ssbond[]
    links: Link[]
    cispeps: Cispep[]
}

export class ConnectivityAnnotationSectionParser extends SectionParser<ConnectivityAnnotationSection> {
    protected ssbondParser = new SsbondParser()
    protected linkParser = new LinkParser()
    protected cispepParser = new CispepParser()

    protected parsers(): Parser<any>[] {
        return [this.ssbondParser, this.linkParser, this.cispepParser]
    }

    parse(): ConnectivityAnnotationSection {
        return {
            ssbonds: this.ssbondParser.parse(),
            links: this.linkParser.parse(),
            cispeps: this.cispepParser.parse(),
        }
    }
}
