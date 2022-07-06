/*
COLUMNS       DATA TYPE     FIELD         DEFINITION
--------------------------------------------------------------------------------------
 1 -  6       Record name   "REMARK"
 8 - 10       Integer       remarkNum     Remark  number. It is not an error for
                                          remark n to exist in an entry when
                                          remark n-1 does not.
12 - 79       LString       empty         Left  as white space in first line
                                          of each  new remark.
 */

import {AbstractParser} from "./parser";
import '../extension/string';

abstract class RemarkParser<T> extends AbstractParser<T> {

    abstract readonly remarkNum: number

    match(line: string): boolean {
        if (line.startsWith('REMARK')) {
            const remarkNum = parseInt(line.extract(8, 10)!)
            if (this.remarkNum == remarkNum) return true
        }
        return false
    }
}

export {RemarkParser}