import '../extension/string';
import {RemarkParser} from "./remarkParser";
import {MissingResidue} from "../model/model";

class Remark465Parser extends RemarkParser<MissingResidue[]> {
    readonly remarkNum: number = 465

    parse(): MissingResidue[] {
        const missingResidues: MissingResidue[] = []
        let find = false
        for (let i in this.lines) {
            const line = this.lines[i]
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
            }
            if (line.includes('RES C SSSEQI')) {
                find = true
            }
        }
        return missingResidues
    }
}

export {Remark465Parser}