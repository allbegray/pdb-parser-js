/*
COLUMNS       DATA TYPE      FIELD         DEFINITION
------------------------------------------------------------------------------------
 1 -  6       Record name    "EXPDTA"
 9 - 10       Continuation   continuation  Allows concatenation of multiple records.
11 - 79       SList          technique     The experimental technique(s) with
                                           optional comment describing the
                                           sample or experiment.
 */

import {AbstractParser} from "./parser";
import '../extension/string';

class ExpdtaParser extends AbstractParser<string[]> {

    match(line: string): boolean {
        return line.startsWith('EXPDTA')
    }

    parse(): string[] {
        return this.lines.map(it => it.extract(11))
            .filter(it => it) as string[]
    }
}

export {ExpdtaParser}