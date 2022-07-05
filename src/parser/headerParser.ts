/*
COLUMNS       DATA  TYPE     FIELD             DEFINITION
------------------------------------------------------------------------------------
 1 -  6       Record name    "HEADER"
11 - 50       String(40)     classification    Classifies the molecule(s).
51 - 59       Date           depDate           Deposition date. This is the date the
                                               coordinates  were received at the PDB.
63 - 66       IDcode         idCode            This identifier is unique within the PDB.
 */

import {AbstractParser} from "./parser";
import '../extension/string';
import {Header} from "../model/header";

class HeaderParser extends AbstractParser<Header> {

    match(line: string): boolean {
        return line.startsWith('HEADER')
    }

    parse(): Header {
        const empty = {
            classification: null,
            depDate: null,
            idCode: null
        }

        if (this.lines.length == 0)
            return empty

        const line = this.lines[0]

        const classification = line.extract(11, 50)
        const depDate = line.extract(51, 59)
        const idCode = line.extract(63, 66)

        return {
            ...empty,
            classification,
            depDate,
            idCode
        }
    }
}

export {HeaderParser}