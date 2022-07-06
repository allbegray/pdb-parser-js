/*
COLUMNS       DATA  TYPE    FIELD           DEFINITION
----------------------------------------------------------------------------
 1 -  6       Record name   "HETNAM"
 9 - 10       Continuation  continuation    Allows concatenation of multiple records.
12 - 14       LString(3)    hetID           Het identifier, right-justified.
16 - 70       String        text            Chemical name.
 */

import '../extension/string';
import {AbstractParser} from "./parser";
import {Hetnam} from "../model/model";

class HetnamParser extends AbstractParser<Hetnam[]> {

    match(line: string): boolean {
        return line.startsWith('HETNAM')
    }

    parse(): Hetnam[] {
        const groupBy = this.lines.map(it => {
            const hetID = it.extract(12, 14)!
            const text = it.extract(16, 70)
            return {
                hetID,
                text
            }
        }).reduce((acc, next) => {
            acc[next.hetID] = acc[next.hetID] || []
            acc[next.hetID].push(next.text)
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

export {HetnamParser}