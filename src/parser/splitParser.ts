/*
COLUMNS        DATA TYPE     FIELD         DEFINITION
----------------------------------------------------------------------------------
 1 -  6        Record  name  "SPLIT "
 9 - 10        Continuation  continuation  Allows concatenation of multiple records.
12 - 15        IDcode        idCode        ID code of related entry.
17 - 20        IDcode        idCode        ID code of related entry.
22 - 25        IDcode        idCode        ID code of related entry.
27 – 30        IDcode        idCode        ID code of related entry.
32 - 35        IDcode        idCode        ID code of related entry.
37 - 40        IDcode        idCode        ID code of related entry.
42 - 45        IDcode        idCode        ID code of related entry.
47 - 50        IDcode        idCode        ID code of related entry.
52 - 55        IDcode        idCode        ID code of related entry.
57 - 60        IDcode        idCode        ID code of related entry.
62 - 65        IDcode        idCode        ID code of related entry.
67 - 70        IDcode        idCode        ID code of related entry.
72 - 75        IDcode        idCode        ID code of related entry.
77 - 80        IDcode        idCode        ID code of related entry.
 */

import {AbstractParser} from "./parser";
import '../extension/string';

class SplitParser extends AbstractParser<string[]> {

    match(line: string): boolean {
        return line.startsWith('SPLIT ')
    }

    parse(): string[] {
        return this.lines.flatMap(it => {
            return [
                it.extract(12, 15),
                it.extract(17, 20),
                it.extract(22, 25),
                it.extract(27, 30),
                it.extract(32, 35),
                it.extract(37, 40),
                it.extract(42, 45),
                it.extract(47, 50),
                it.extract(52, 55),
                it.extract(57, 60),
                it.extract(62, 65),
                it.extract(67, 70),
                it.extract(72, 75),
                it.extract(77, 80),
            ].filter(it => it) as string[]
        })
    }
}

export {SplitParser}