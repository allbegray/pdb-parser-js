import '../extension/string';
import {AbstractParser} from "../parser";

export interface Het {
    hetID: string | null
    ChainID: string | null
    seqNum: number | null
    iCode: string | null
    numHetAtoms: number | null
    text: string | null
}

export interface Hetnam {
    hetID: string | null
    text: string | null
}

export interface Hetsyn {
    hetID: string
    hetSynonyms: string | null
}

// TODO
export interface Formul {

}

/***
 * COLUMNS       DATA  TYPE     FIELD         DEFINITION
 * ---------------------------------------------------------------------------------
 *  1 -  6       Record name   "HET   "
 *  8 - 10       LString(3)    hetID          Het identifier, right-justified.
 * 13            Character     ChainID        Chain  identifier.
 * 14 - 17       Integer       seqNum         Sequence  number.
 * 18            AChar         iCode          Insertion  code.
 * 21 - 25       Integer       numHetAtoms    Number of HETATM records for the group
 *                                            present in the entry.
 * 31 - 70       String        text           Text describing Het group.
 */
export class HetParser extends AbstractParser<Het[]> {

    match(line: string): boolean {
        return line.startsWith('HET   ')
    }

    parse(): Het[] {
        return this.lines.map(line => {
            const hetID = line.extract(8, 10)
            const ChainID = line.extract(13, 13)
            const seqNum = line.extract(14, 17)
            const iCode = line.extract(18, 18)
            const numHetAtoms = line.extract(21, 25)
            const text = line.extract(31, 70)

            return {
                hetID,
                ChainID,
                seqNum: this.toIntOrNull(seqNum),
                iCode,
                numHetAtoms: this.toIntOrNull(numHetAtoms),
                text,
            }
        })
    }
}

/***
 * COLUMNS       DATA  TYPE    FIELD           DEFINITION
 * ----------------------------------------------------------------------------
 *  1 -  6       Record name   "HETNAM"
 *  9 - 10       Continuation  continuation    Allows concatenation of multiple records.
 * 12 - 14       LString(3)    hetID           Het identifier, right-justified.
 * 16 - 70       String        text            Chemical name.
 */
export class HetnamParser extends AbstractParser<Hetnam[]> {

    match(line: string): boolean {
        return line.startsWith('HETNAM')
    }

    parse(): Hetnam[] {
        const groupBy = this.lines.map(line => {
            const hetID = line.extract(12, 14)!
            const text = line.extract(16, 70)
            return [
                hetID,
                text
            ] as [string, string | null]
        }).reduce((acc, [hetID, text]) => {
            acc[hetID] = acc[hetID] ?? []
            acc[hetID].push(text)
            return acc
        }, {} as { [key: string]: (string | null)[] })

        const items: Hetnam[] = []
        for (const key in groupBy) {
            const value = groupBy[key].join(' ')
            items.push({
                hetID: key,
                text: !value.isBlank() ? value : null
            })
        }

        return items
    }
}

/***
 * COLUMNS       DATA TYPE     FIELD          DEFINITION
 * ----------------------------------------------------------------------------
 *  1 -  6       Record name   "HETSYN"
 *  9 - 10       Continuation  continuation   Allows concatenation of multiple records.
 * 12 - 14       LString(3)    hetID          Het identifier, right-justified.
 * 16 - 70       SList         hetSynonyms    List of synonyms.
 */
export class HetsynParser extends AbstractParser<Hetsyn[]> {

    match(line: string): boolean {
        return line.startsWith('HETSYN')
    }

    parse(): Hetsyn[] {
        const groupBy = this.lines.map(line => {
            const hetID = line.extract(12, 14)!
            const hetSynonyms = line.extract(16, 70)
            return [
                hetID,
                hetSynonyms
            ] as [string, string | null]
        }).reduce((acc, [hetID, hetSynonyms]) => {
            acc[hetID] = acc[hetID] ?? []
            acc[hetID].push(hetSynonyms)
            return acc
        }, {} as { [key: string]: (string | null)[] })

        const items: Hetsyn[] = []
        for (const key in groupBy) {
            const value = groupBy[key].join(' ')
            items.push({
                hetID: key,
                hetSynonyms: !value.isBlank() ? value : null
            })
        }

        return items
    }
}
