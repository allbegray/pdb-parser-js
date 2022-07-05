/*
COLUMNS       DATA  TYPE     FIELD         DEFINITION
---------------------------------------------------------------------------------------
 1 -  6       Record name   "OBSLTE"
 9 - 10       Continuation  continuation  Allows concatenation of multiple records
12 - 20       Date          repDate       Date that this entry was replaced.
22 - 25       IDcode        idCode        ID code of this entry.
32 - 35       IDcode        rIdCode       ID code of entry that replaced this one.
37 - 40       IDcode        rIdCode       ID code of entry that replaced this one.
42 - 45       IDcode        rIdCode       ID code of entry  that replaced this one.
47 - 50       IDcode        rIdCode       ID code of entry that replaced this one.
52 - 55       IDcode        rIdCode       ID code of entry that replaced this one.
57 - 60       IDcode        rIdCode       ID code of entry that replaced this one.
62 - 65       IDcode        rIdCode       ID code of entry that replaced this one.
67 - 70       IDcode        rIdCode       ID code of entry that replaced this one.
72 - 75       IDcode        rIdCode       ID code of entry that replaced this one.
 */

import {AbstractParser} from "./parser";
import '../extension/string';
import {Obslte} from "../model/model";

class ObslteParser extends AbstractParser<Obslte[]> {

    match(line: string): boolean {
        return line.startsWith('OBSLTE')
    }

    parse(): Obslte[] {
        return this.lines.map(it => {
            const repDate = it.extract(12, 20)
            const idCode = it.extract(22, 25)
            const rIdCodes = [
                it.extract(32, 35),
                it.extract(37, 40),
                it.extract(42, 45),
                it.extract(47, 50),
                it.extract(52, 55),
                it.extract(57, 60),
                it.extract(62, 65),
                it.extract(67, 70),
                it.extract(72, 75),
            ].filter(it => it) as string[]
            return {repDate, idCode, rIdCodes}
        })
    }
}

export {ObslteParser}