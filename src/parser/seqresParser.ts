/*
COLUMNS        DATA TYPE      FIELD        DEFINITION
-------------------------------------------------------------------------------------
 1 -  6        Record name    "SEQRES"
 8 - 10        Integer        serNum       Serial number of the SEQRES record for  the
                                           current  chain. Starts at 1 and increments
                                           by one  each line. Reset to 1 for each chain.
12             Character      chainID      Chain identifier. This may be any single
                                           legal  character, including a blank which is
                                           is  used if there is only one chain.
14 - 17        Integer        numRes       Number of residues in the chain.
                                           This  value is repeated on every record.
20 - 22        Residue name   resName      Residue name.
24 - 26        Residue name   resName      Residue name.
28 - 30        Residue name   resName      Residue name.
32 - 34        Residue name   resName      Residue name.
36 - 38        Residue name   resName      Residue name.
40 - 42        Residue name   resName      Residue name.
44 - 46        Residue name   resName      Residue name.
48 - 50        Residue name   resName      Residue name.
52 - 54        Residue name   resName      Residue name.
56 - 58        Residue name   resName      Residue name.
60 - 62        Residue name   resName      Residue name.
64 - 66        Residue name   resName      Residue name.
68 - 70        Residue name   resName      Residue name.
 */

import {AbstractParser} from "./parser";
import '../extension/string';
import {Seqres} from "../model/model";

class SeqresParser extends AbstractParser<Seqres[]> {

    match(line: string): boolean {
        return line.startsWith('SEQRES')
    }

    parse(): Seqres[] {
        return this.lines.map(it => {
            const serNum = it.extract(8, 10)
            const chainID = it.extract(12, 12)
            const numRes = it.extract(14, 17)
            const resNames = [
                it.extract(20, 22),
                it.extract(24, 26),
                it.extract(28, 30),
                it.extract(32, 34),
                it.extract(36, 38),
                it.extract(40, 42),
                it.extract(44, 46),
                it.extract(48, 50),
                it.extract(52, 54),
                it.extract(56, 58),
                it.extract(60, 62),
                it.extract(64, 66),
                it.extract(68, 70),
            ].filter(it => it) as string[]
            return {
                serNum: serNum ? parseInt(serNum) : null,
                chainID,
                numRes: numRes ? parseInt(numRes) : null,
                resNames,
            }
        })
    }
}

export {SeqresParser}