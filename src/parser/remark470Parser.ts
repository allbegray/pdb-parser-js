/*
Template for non NMR entries

         1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
REMARK 470
REMARK 470 MISSING ATOM
REMARK 470 THE FOLLOWING RESIDUES HAVE MISSING ATOMS (M=MODEL NUMBER;
REMARK 470 RES=RESIDUE NAME; C=CHAIN IDENTIFIER;  SSEQ=SEQUENCE NUMBER;
REMARK 470 I=INSERTION CODE):
REMARK 470   M RES  CSSEQI  ATOMS

Template for NMR entries (add)

         1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
REMARK 470 MISSING ATOM
REMARK 470 THE FOLLOWING RESIDUES HAVE MISSING ATOMS (RES=RESIDUE NAME;
REMARK 470 C=CHAIN IDENTIFIER; SSEQ=SEQUENCE NUMBER; I=INSERTION CODE):
REMARK 470   MODELS X-YYY
REMARK 470     RES CSSEQI  ATOMS
 */
import '../extension/string';
import {RemarkParser} from "./remarkParser";
import {MissingAtom} from "../model/model";

class Remark470Parser extends RemarkParser<MissingAtom[]> {
    readonly remarkNum: number = 470

    parse(): MissingAtom[] {
        const toMissingAtom: (
            resName: string | null,
            chainID: string | null,
            seqNum: string | null,
            iCode: string | null,
            atoms: string | null
        ) => MissingAtom = (resName, chainID, seqNum, iCode, atoms) => {
            const _atoms = atoms?.split(' ')?.map(it => it.trim())?.filter(it => it)
            return {
                resName,
                chainID,
                seqNum: seqNum ? parseInt(seqNum) : null,
                iCode,
                atoms: _atoms ? _atoms : [],
            }
        }

        const missingAtoms: MissingAtom[] = []

        let findNonNMR = false
        let findNMR = false

        for (let i in this.lines) {
            const line = this.lines[i]

            if (findNonNMR) {
                const resName = line.extract(16, 19)
                const chainID = line.extract(21, 21)
                const seqNum = line.extract(22, 25)
                const iCode = line.extract(26, 26)
                const atoms = line.extract(29)
                missingAtoms.push(toMissingAtom(resName, chainID, seqNum, iCode, atoms))
            } else if (findNMR) {
                const resName = line.extract(16, 19)
                const chainID = line.extract(20, 20)
                const seqNum = line.extract(21, 24)
                const iCode = line.extract(25, 25)
                const atoms = line.extract(28)
                missingAtoms.push(toMissingAtom(resName, chainID, seqNum, iCode, atoms))
            }

            if (!findNonNMR && line.includes('RES  CSSEQI  ATOMS')) {
                findNonNMR = true
            } else if (!findNMR && line.includes('RES CSSEQI  ATOMS')) {
                findNMR = true
            }
        }
        return missingAtoms
    }
}

export {Remark470Parser}
