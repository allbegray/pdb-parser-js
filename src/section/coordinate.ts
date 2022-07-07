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

    protected match(line: string): boolean {
        return line.startsWith('ATOM  ')
    }

    protected _parse(): Atom[] {
        return this.lines.map(line => {
            const serial = line.extract(7, 11)
            const name = line.extract(13, 16)
            const altLoc = line.extract(17, 17)
            const resName = line.extract(18, 20)
            const chainID = line.extract(22, 22)
            const resSeq = line.extract(23, 26)
            const iCode = line.extract(27, 27)
            const x = line.extract(31, 38)
            const y = line.extract(39, 46)
            const z = line.extract(47, 54)
            const occupancy = line.extract(55, 60)
            const tempFactor = line.extract(61, 66)
            const element = line.extract(77, 78)
            const charge = line.extract(79, 80)

            return {
                serial: this.toIntOrNull(serial),
                name,
                altLoc,
                resName,
                chainID,
                resSeq: this.toIntOrNull(resSeq),
                iCode,
                x: this.toFloatOrNull(x),
                y: this.toFloatOrNull(y),
                z: this.toFloatOrNull(z),
                occupancy: this.toFloatOrNull(occupancy),
                tempFactor: this.toFloatOrNull(tempFactor),
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
    protected excludeDummy: boolean

    protected constructor(excludeDummy: boolean = true) {
        super()
        this.excludeDummy = excludeDummy
    }

    protected match(line: string): boolean {
        if (this.excludeDummy) {
            const resName = line.extract(18, 20)
            if (resName == 'DUM') return false
        }
        return line.startsWith('HETATM')
    }
}
