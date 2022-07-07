/*
Template for non NMR entries

         1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
REMARK 465
REMARK 465 MISSING RESIDUES
REMARK 465 THE FOLLOWING RESIDUES WERE NOT LOCATED IN  THE
REMARK 465 EXPERIMENT. (M=MODEL NUMBER; RES=RESIDUE NAME;  C=CHAIN
REMARK 465 IDENTIFIER; SSSEQ=SEQUENCE NUMBER; I=INSERTION  CODE.)
REMARK 465
REMARK 465   M RES C SSSEQI

Template for NMR entries (new)

         1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
REMARK 465
REMARK 465 MISSING RESIDUES
REMARK 465 THE FOLLOWING RESIDUES WERE NOT LOCATED IN THE
REMARK 465 EXPERIMENT. (RES=RESIDUE NAME; C=CHAIN IDENTIFIER;
REMARK 465 SSSEQ=SEQUENCE NUMBER; I=INSERTION CODE.)
REMARK 465   MODELS X-YYY
REMARK 465     RES C SSSEQI
 */
import '../extension/string';
import {RemarkParser} from "./remarkParser";
import {MissingResidue} from "../model/model";

class Remark465Parser extends RemarkParser<MissingResidue[]> {
    readonly remarkNum: number = 465

    parse(): MissingResidue[] {
        const missingResidues: MissingResidue[] = []
        let find = false
        for (const line of this.lines) {
            if (find) {
                const resName = line.extract(16, 19)
                const chainID = line.extract(20, 20)
                const seqNum = line.extract(22, 26)
                const iCode = line.extract(27, 27)
                missingResidues.push({
                    resName,
                    chainID,
                    seqNum: seqNum ? parseInt(seqNum) : null,
                    iCode,
                })
            } else {
                if (line.includes('RES C SSSEQI')) {
                    find = true
                }
            }
        }
        return missingResidues
    }
}

export {Remark465Parser}