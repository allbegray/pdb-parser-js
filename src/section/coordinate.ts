import '../extension/string';
import {AbstractParser} from "../parser";

export interface Atom {
    serial: number | null
    name: string | null
    altLoc: string | null
    resName: string | null
    chainID: string | null
    resSeq: number | null
    iCode: string | null
    x: number | null
    y: number | null
    z: number | null
    occupancy: number | null
    tempFactor: number | null
    element: string | null
    charge: string | null
}

export interface Hetatm extends Atom {
}

/***
 * COLUMNS        DATA  TYPE    FIELD        DEFINITION
 * -------------------------------------------------------------------------------------
 *  1 -  6        Record name   "ATOM  "
 *  7 - 11        Integer       serial       Atom  serial number.
 * 13 - 16        Atom          name         Atom name.
 * 17             Character     altLoc       Alternate location indicator.
 * 18 - 20        Residue name  resName      Residue name.
 * 22             Character     chainID      Chain identifier.
 * 23 - 26        Integer       resSeq       Residue sequence number.
 * 27             AChar         iCode        Code for insertion of residues.
 * 31 - 38        Real(8.3)     x            Orthogonal coordinates for X in Angstroms.
 * 39 - 46        Real(8.3)     y            Orthogonal coordinates for Y in Angstroms.
 * 47 - 54        Real(8.3)     z            Orthogonal coordinates for Z in Angstroms.
 * 55 - 60        Real(6.2)     occupancy    Occupancy.
 * 61 - 66        Real(6.2)     tempFactor   Temperature  factor.
 * 77 - 78        LString(2)    element      Element symbol, right-justified.
 * 79 - 80        LString(2)    charge       Charge  on the atom.
 */
export class AtomParser extends AbstractParser<Atom[]> {

    match(line: string): boolean {
        return line.startsWith('ATOM  ')
    }

    parse(): Atom[] {
        return this.lines.map(it => {
            const serial = it.extract(7, 11)
            const name = it.extract(13, 16)
            const altLoc = it.extract(17, 17)
            const resName = it.extract(18, 20)
            const chainID = it.extract(22, 22)
            const resSeq = it.extract(23, 26)
            const iCode = it.extract(27, 27)
            const x = it.extract(31, 38)
            const y = it.extract(39, 46)
            const z = it.extract(47, 54)
            const occupancy = it.extract(55, 60)
            const tempFactor = it.extract(61, 66)
            const element = it.extract(77, 78)
            const charge = it.extract(79, 80)
            return {
                serial: serial ? parseInt(serial) : null,
                name,
                altLoc,
                resName,
                chainID,
                resSeq: resSeq ? parseInt(resSeq) : null,
                iCode,
                x: x ? parseFloat(x) : null,
                y: y ? parseFloat(y) : null,
                z: z ? parseFloat(z) : null,
                occupancy: occupancy ? parseFloat(occupancy) : null,
                tempFactor: tempFactor ? parseFloat(tempFactor) : null,
                element,
                charge,
            }
        })
    }
}

/***
 * COLUMNS       DATA  TYPE     FIELD         DEFINITION
 * -----------------------------------------------------------------------
 *  1 - 6        Record name    "HETATM"
 *  7 - 11       Integer        serial        Atom serial number.
 * 13 - 16       Atom           name          Atom name.
 * 17            Character      altLoc        Alternate location indicator.
 * 18 - 20       Residue name   resName       Residue name.
 * 22            Character      chainID       Chain identifier.
 * 23 - 26       Integer        resSeq        Residue sequence number.
 * 27            AChar          iCode         Code for insertion of residues.
 * 31 - 38       Real(8.3)      x             Orthogonal coordinates for X.
 * 39 - 46       Real(8.3)      y             Orthogonal coordinates for Y.
 * 47 - 54       Real(8.3)      z             Orthogonal coordinates for Z.
 * 55 - 60       Real(6.2)      occupancy     Occupancy.
 * 61 - 66       Real(6.2)      tempFactor    Temperature factor.
 * 77 - 78       LString(2)     element       Element symbol; right-justified.
 * 79 - 80       LString(2)     charge        Charge on the atom.
 */
export class HetatmParser extends AtomParser {
    excludeDummy: boolean

    constructor(excludeDummy: boolean = true) {
        super()
        this.excludeDummy = excludeDummy
    }

    match(line: string): boolean {
        if (this.excludeDummy) {
            const resName = line.extract(18, 20)
            if (resName == 'DUM') return false
        }
        return line.startsWith('HETATM')
    }
}
