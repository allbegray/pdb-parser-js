// 100%
import '../extension/string';
import {AbstractParser} from "../parser";
import {toFloatOrNull, toIntOrNull} from "../extension/string";

export interface Cryst1 {
    a: number | null
    b: number | null
    c: number | null
    alpha: number | null
    beta: number | null
    gamma: number | null
    sGroup: string | null
    z: number | null
}

export interface Origx {
    recordName: string
    On1: number | null
    On2: number | null
    On3: number | null
    Tn: number | null
}

export interface Scale {
    recordName: string
    Sn1: number | null
    Sn2: number | null
    Sn3: number | null
    Un: number | null
}

export interface Mtrix {
    recordName: string
    serial: number | null
    Mn1: number | null
    Mn2: number | null
    Mn3: number | null
    Vn: number | null
    iGiven: number | null
}


/***
 * COLUMNS       DATA  TYPE    FIELD          DEFINITION
 * -------------------------------------------------------------
 *  1 -  6       Record name   "CRYST1"
 *  7 - 15       Real(9.3)     a              a (Angstroms).
 * 16 - 24       Real(9.3)     b              b (Angstroms).
 * 25 - 33       Real(9.3)     c              c (Angstroms).
 * 34 - 40       Real(7.2)     alpha          alpha (degrees).
 * 41 - 47       Real(7.2)     beta           beta (degrees).
 * 48 - 54       Real(7.2)     gamma          gamma (degrees).
 * 56 - 66       LString       sGroup         Space  group.
 * 67 - 70       Integer       z              Z value.
 */
export class Cryst1Parser extends AbstractParser<Cryst1 | null> {

    protected match(line: string): boolean {
        return line.startsWith('CRYST1')
    }

    protected _parse(): Cryst1 | null {
        if (this.lines.length == 0)
            return null
        const line = this.lines[0]

        const a = line.extract(7, 15)
        const b = line.extract(16, 24)
        const c = line.extract(25, 33)
        const alpha = line.extract(34, 40)
        const beta = line.extract(41, 47)
        const gamma = line.extract(48, 54)
        const sGroup = line.extract(56, 66)
        const z = line.extract(67, 70)

        return {
            a: toFloatOrNull(a),
            b: toFloatOrNull(b),
            c: toFloatOrNull(c),
            alpha: toFloatOrNull(alpha),
            beta: toFloatOrNull(beta),
            gamma: toFloatOrNull(gamma),
            sGroup,
            z: toIntOrNull(z)
        }
    }
}

/***
 * COLUMNS        DATA  TYPE     FIELD         DEFINITION
 * ----------------------------------------------------------------
 *  1 -  6         Record name   "ORIGXn"      n=1, 2, or 3
 * 11 - 20         Real(10.6)    o[n][1]       On1
 * 21 - 30         Real(10.6)    o[n][2]       On2
 * 31 - 40         Real(10.6)    o[n][3]       On3
 * 46 - 55         Real(10.5)    t[n]          Tn
 */
export class OrigxParser extends AbstractParser<Origx[]> {

    protected match(line: string): boolean {
        return line.startsWith('ORIGX1') || line.startsWith('ORIGX2') || line.startsWith('ORIGX3')
    }

    protected _parse(): Origx[] {
        return this.lines.map(line => {
            const recordName = line.extract(1, 6)
            const On1 = line.extract(11, 20)
            const On2 = line.extract(21, 30)
            const On3 = line.extract(31, 40)
            const Tn = line.extract(46, 55)

            return {
                recordName: recordName!,
                On1: toFloatOrNull(On1),
                On2: toFloatOrNull(On2),
                On3: toFloatOrNull(On3),
                Tn: toFloatOrNull(Tn),
            }
        })
    }
}

/***
 * COLUMNS         DATA  TYPE    FIELD              DEFINITION
 * ------------------------------------------------------------------
 *  1 -  6         Record name   "SCALEn" n=1,  2, or 3
 * 11 - 20         Real(10.6)    s[n][1]            Sn1
 * 21 - 30         Real(10.6)    s[n][2]            Sn2
 * 31 - 40         Real(10.6)    s[n][3]            Sn3
 * 46 - 55         Real(10.5)    u[n]               Un
 */
export class ScaleParser extends AbstractParser<Scale[]> {

    protected match(line: string): boolean {
        return line.startsWith('SCALE1') || line.startsWith('SCALE2') || line.startsWith('SCALE3')
    }

    protected _parse(): Scale[] {
        return this.lines.map(line => {
            const recordName = line.extract(1, 6)
            const Sn1 = line.extract(11, 20)
            const Sn2 = line.extract(21, 30)
            const Sn3 = line.extract(31, 40)
            const Un = line.extract(46, 55)

            return {
                recordName: recordName!,
                Sn1: toFloatOrNull(Sn1),
                Sn2: toFloatOrNull(Sn2),
                Sn3: toFloatOrNull(Sn3),
                Un: toFloatOrNull(Un),
            }
        })
    }
}

/***
 * COLUMNS        DATA  TYPE    FIELD         DEFINITION
 * -------------------------------------------------------------------------------
 *  1 -  6        Record name   "MTRIXn"      n=1, 2, or 3
 *  8 - 10        Integer       serial        Serial number.
 * 11 - 20        Real(10.6)    m[n][1]       Mn1
 * 21 - 30        Real(10.6)    m[n][2]       Mn2
 * 31 - 40        Real(10.6)    m[n][3]       Mn3
 * 46 - 55        Real(10.5)    v[n]          Vn
 * 60             Integer       iGiven        1 if coordinates for the  representations
 *                                            which  are approximately related by the
 *                                            transformations  of the molecule are
 *                                            contained in the entry. Otherwise, blank.
 */
export class MtrixParser extends AbstractParser<Mtrix[]> {

    protected match(line: string): boolean {
        return line.startsWith('MTRIX1') || line.startsWith('MTRIX2') || line.startsWith('MTRIX3')
    }

    protected _parse(): Mtrix[] {
        return this.lines.map(line => {
            const recordName = line.extract(1, 6)
            const serial = line.extract(8, 11)
            const Mn1 = line.extract(11, 20)
            const Mn2 = line.extract(21, 30)
            const Mn3 = line.extract(31, 40)
            const Vn = line.extract(46, 55)
            const iGiven = line.extract(60, 60)

            return {
                recordName: recordName!,
                serial: toIntOrNull(serial),
                Mn1: toFloatOrNull(Mn1),
                Mn2: toFloatOrNull(Mn2),
                Mn3: toFloatOrNull(Mn3),
                Vn: toFloatOrNull(Vn),
                iGiven: toIntOrNull(iGiven),
            }
        })
    }
}