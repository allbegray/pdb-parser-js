/*
COLUMNS       DATA  TYPE     FIELD         DEFINITION
---------------------------------------------------------------------------------
 1 -  6       Record name   "HET   "
 8 - 10       LString(3)    hetID          Het identifier, right-justified.
13            Character     ChainID        Chain  identifier.
14 - 17       Integer       seqNum         Sequence  number.
18            AChar         iCode          Insertion  code.
21 - 25       Integer       numHetAtoms    Number of HETATM records for the group
                                           present in the entry.
31 - 70       String        text           Text describing Het group.
 */

import {AbstractParser} from "./parser";
import '../extension/string';
import {Het} from "../model/model";

class HetParser extends AbstractParser<Het[]> {

    match(line: string): boolean {
        return line.startsWith('HET   ')
    }

    parse(): Het[] {
        return this.lines.map(it => {
            const hetID = it.extract(8, 10)
            const ChainID = it.extract(13, 13)
            const seqNum = it.extract(14, 17)
            const iCode = it.extract(18, 18)
            const numHetAtoms = it.extract(21, 25)
            const text = it.extract(31, 70)
            return {
                hetID,
                ChainID,
                seqNum: seqNum ? parseInt(seqNum) : null,
                iCode,
                numHetAtoms: numHetAtoms ? parseInt(numHetAtoms) : null,
                text,
            }
        })
    }
}

export {HetParser}