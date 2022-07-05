/*
COLUMNS       DATA  TYPE     FIELD         DEFINITION
---------------------------------------------------------------------------------
 1 -  6       Record name    "KEYWDS"
 9 - 10       Continuation   continuation  Allows concatenation of records if necessary.
11 - 79       List           keywds        Comma-separated list of keywords relevant
                                           to the entry.
 */

import {AbstractParser} from "./parser";
import '../extension/string';

class KeywdsParser extends AbstractParser<string[]> {

    match(line: string): boolean {
        return line.startsWith('KEYWDS')
    }

    parse(): string[] {
        return this.lines.map(it => it.extract(11))
            .filter(it => it)
            .join('')
            .split(",")
            .map(it => it.trim()) as string[]
    }
}

export {KeywdsParser}