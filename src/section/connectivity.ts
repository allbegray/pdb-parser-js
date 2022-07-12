// 100%
import '../extension/string';
import {AbstractParser, Parser, SectionParser} from "../parser";
import {toIntOrNull} from "../extension/string";
import {Section} from "../model";

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
                atomSeqNum: toIntOrNull(atomSeqNum)!,
                bondedAtomSeqNums: bondedAtomSeqNums.filter(it => it).map(it => toIntOrNull(it)!) as number[]
            }
        })
    }
}

export interface ConnectivitySection extends Section {
    conects: Conect[]
}

export class ConnectivitySectionParser extends SectionParser<ConnectivitySection> {
    protected conectParser = new ConectParser()

    protected parsers(): Parser<any>[] {
        return [this.conectParser]
    }

    parse(): ConnectivitySection {
        return {
            conects: this.conectParser.parse(),
        }
    }
}
