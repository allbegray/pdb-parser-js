// 100%
import '../extension/string';
import {AbstractParser} from "../parser";

export interface Conect {
    atomSeqNum: number
    bondedAtomSeqNums: number[]
}

/***
 * COLUMNS       DATA  TYPE      FIELD        DEFINITION
 * -------------------------------------------------------------------------
 *  1 -  6        Record name    "CONECT"
 *  7 - 11        Integer        serial       Atom  serial number
 * 12 - 16        Integer        serial       Serial number of bonded atom
 * 17 - 21        Integer        serial       Serial number of bonded atom
 * 22 - 26        Integer        serial       Serial number of bonded atom
 * 27 - 31        Integer        serial       Serial number of bonded atom
 */
export class ConectParser extends AbstractParser<Conect[]> {

    protected match(line: string): boolean {
        return line.startsWith('CONECT')
    }

    protected _parse(): Conect[] {
        return this.lines.map(line => {
            const atomSeqNum = line.extract(7, 11)
            const bondedAtomSeqNums = [
                line.extract(12, 16),
                line.extract(17, 21),
                line.extract(22, 26),
                line.extract(27, 31),
            ]

            return {
                atomSeqNum: this.toIntOrNull(atomSeqNum)!,
                bondedAtomSeqNums: bondedAtomSeqNums.filter(it => it).map(it => this.toIntOrNull(it)!) as number[]
            }
        })
    }
}