/*
COLUMNS       DATA TYPE     FIELD          DEFINITION
----------------------------------------------------------------------------
 1 -  6       Record name   "HETSYN"
 9 - 10       Continuation  continuation   Allows concatenation of multiple records.
12 - 14       LString(3)    hetID          Het identifier, right-justified.
16 - 70       SList         hetSynonyms    List of synonyms.
 */

import '../extension/string';
import {AbstractParser} from "./parser";
import {Hetsyn} from "../model/model";

class HetsynParser extends AbstractParser<Hetsyn[]> {

    match(line: string): boolean {
        return line.startsWith('HETSYN')
    }

    parse(): Hetsyn[] {
        const groupBy = this.lines.map(it => {
            const hetID = it.extract(12, 14)!
            const hetSynonyms = it.extract(16, 70)
            return {
                hetID,
                hetSynonyms
            }
        }).reduce((r, a) => {
            r[a.hetID] = r[a.hetID] || [];
            r[a.hetID].push(a.hetSynonyms);
            return r;
        }, Object.create(null))

        const items: Hetsyn[] = []
        for (const key in groupBy) {
            const list: string[] = groupBy[key]
            items.push({
                hetID: key,
                hetSynonyms: list.join(' ')
                    .split(';')
                    .map(it => it.trim())
                    .filter(it => it)
            })
        }

        return items
    }
}

export {HetsynParser}