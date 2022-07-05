/*
COLUMNS       DATA  TYPE     FIELD         DEFINITION
----------------------------------------------------------------------------------
 1 -  6       Record name    "TITLE "
 9 - 10       Continuation   continuation  Allows concatenation of multiple records.
11 - 80       String         title         Title of the  experiment.
 */

import {AbstractParser} from "./parser";
import '../extension/string';

class TitleParser extends AbstractParser<string | null> {

    match(line: string): boolean {
        return line.startsWith('TITLE ')
    }

    parse(): string | null {
        const title = this.lines.map(it => it.extract(11)).join(' ')
        if (title.isBlank()) {
            return null
        }
        return title
    }
}

export {TitleParser}