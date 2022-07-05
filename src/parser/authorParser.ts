/*
COLUMNS      DATA  TYPE      FIELD         DEFINITION
------------------------------------------------------------------------------------
 1 -  6      Record name     "AUTHOR"
 9 - 10      Continuation    continuation  Allows concatenation of multiple records.
11 - 79      List            authorList    List of the author names, separated
                                           by commas.
 */

import {AbstractParser} from "./parser";
import '../extension/string';

class AuthorParser extends AbstractParser<string[]> {

    match(line: string): boolean {
        return line.startsWith('AUTHOR')
    }

    parse(): string[] {
        return this.lines.map(it => it.extract(11))
            .filter(it => it)
            .join('')
            .split(",")
            .map(it => it.trim()) as string[]
    }
}

export {AuthorParser}