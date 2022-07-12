import '../extension/string';
import {AbstractParser, Parser, SectionParser} from "../parser";
import {toFloatOrNull, toIntOrNull} from "../extension/string";
import {Residue, ResidueWithAtom, Section} from "../model";

export interface Model {
}

/***
 * https://www.wwpdb.org/documentation/file-format-content/format33/sect9.html#ANISOU
 */
export interface Anisou extends ResidueWithAtom {
    serial: number | null
    // name: string | null
    // altLoc: string | null
    // resName: string | null
    // chainID: string | null
    // resSeq: number | null
    // iCode: string | null
    u00: number | null
    u11: number | null
    u22: number | null
    u01: number | null
    u02: number | null
    u12: number | null
    element: string | null
    charge: string | null
}

interface CoordinateData extends ResidueWithAtom {
    serial: number | null
    // name: string | null
    // altLoc: string | null
    // resName: string | null
    // chainID: string | null
    // resSeq: number | null
    // iCode: string | null
    x: number | null
    y: number | null
    z: number | null
    occupancy: number | null
    tempFactor: number | null
    element: string | null
    charge: string | null
}

abstract class Coordinate {
    protected data: CoordinateData

    constructor(data: CoordinateData) {
        this.data = data;
    }

    toResidue(): Residue {
        return {
            resName: this.data.resName,
            chainID: this.data.chainID,
            resSeq: this.data.resSeq,
            iCode: this.data.iCode,
        }
    }

    static lineToCoordinate(line: string): CoordinateData {
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
            serial: toIntOrNull(serial),
            atom: name,
            altLoc,
            resName,
            chainID,
            resSeq: toIntOrNull(resSeq),
            iCode,
            x: toFloatOrNull(x),
            y: toFloatOrNull(y),
            z: toFloatOrNull(z),
            occupancy: toFloatOrNull(occupancy),
            tempFactor: toFloatOrNull(tempFactor),
            element,
            charge,
        }
    }
}

export class Hetatm extends Coordinate {
    isCrystalWater(): boolean {
        return this.data.resName == 'HOH'
    }

    isDummy(): boolean {
        return this.data.resName == 'DUM'
    }
}

export class Atom extends Coordinate {
}

export interface Ter {
}

export interface Endmdl {
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
            return new Atom(Coordinate.lineToCoordinate(line))
        })
    }
}

/***
 * COLUMNS       DATA  TYPE    FIELD          DEFINITION
 * -----------------------------------------------------------------
 *  1 - 6        Record name   "ANISOU"
 *  7 - 11       Integer       serial         Atom serial number.
 * 13 - 16       Atom          name           Atom name.
 * 17            Character     altLoc         Alternate location indicator
 * 18 - 20       Residue name  resName        Residue name.
 * 22            Character     chainID        Chain identifier.
 * 23 - 26       Integer       resSeq         Residue sequence number.
 * 27            AChar         iCode          Insertion code.
 * 29 - 35       Integer       u[0][0]        U(1,1)
 * 36 - 42       Integer       u[1][1]        U(2,2)
 * 43 - 49       Integer       u[2][2]        U(3,3)
 * 50 - 56       Integer       u[0][1]        U(1,2)
 * 57 - 63       Integer       u[0][2]        U(1,3)
 * 64 - 70       Integer       u[1][2]        U(2,3)
 * 77 - 78       LString(2)    element        Element symbol, right-justified.
 * 79 - 80       LString(2)    charge         Charge on the atom.
 */
export class AnisouParser extends AbstractParser<Anisou[]> {

    protected match(line: string): boolean {
        return line.startsWith('ANISOU')
    }

    protected _parse(): Anisou[] {
        return this.lines.map(line => {
            const serial = line.extract(7, 11)
            const name = line.extract(13, 16)
            const altLoc = line.extract(17, 17)
            const resName = line.extract(18, 20)
            const chainID = line.extract(22, 22)
            const resSeq = line.extract(23, 26)
            const iCode = line.extract(27, 27)
            const u00 = line.extract(29, 35)
            const u11 = line.extract(36, 42)
            const u22 = line.extract(43, 49)
            const u01 = line.extract(50, 56)
            const u02 = line.extract(57, 63)
            const u12 = line.extract(64, 70)
            const element = line.extract(77, 78)
            const charge = line.extract(79, 80)

            return {
                serial: toIntOrNull(serial),
                atom: name,
                altLoc,
                resName,
                chainID,
                resSeq: toIntOrNull(resSeq),
                iCode,
                u00: toIntOrNull(u00),
                u11: toIntOrNull(u11),
                u22: toIntOrNull(u22),
                u01: toIntOrNull(u01),
                u02: toIntOrNull(u02),
                u12: toIntOrNull(u12),
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
export class HetatmParser extends AbstractParser<Hetatm[]> {
    protected excludeDummy: boolean

    constructor(excludeDummy: boolean = true) {
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

    protected _parse(): Hetatm[] {
        return this.lines.map(line => {
            return new Hetatm(Coordinate.lineToCoordinate(line))
        })
    }
}

export interface CoordinateSection extends Section {
    atoms: Atom[]
    anisous: Anisou[]
    hetatms: Hetatm[]
}

export class CoordinateSectionParser extends SectionParser<CoordinateSection> {
    protected atomParer = new AtomParser()
    protected anisouParser: AnisouParser | null
    protected hetatmParser: HetatmParser

    constructor(excludeDummy: boolean = true, excludeAnisou: boolean = true) {
        super()
        this.hetatmParser = new HetatmParser(excludeDummy)
        this.anisouParser = excludeAnisou ? null : new AnisouParser()
    }

    protected parsers(): Parser<any>[] {
        return [this.atomParer, this.anisouParser, this.hetatmParser].filter(it => it) as Parser<any>[]
    }

    parse(): CoordinateSection {
        return {
            atoms: this.atomParer.parse(),
            anisous: this.anisouParser?.parse() ?? [],
            hetatms: this.hetatmParser.parse(),
        }
    }
}
