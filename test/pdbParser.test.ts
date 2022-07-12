import {PdbParser} from "../src/pdb";
import * as fs from "fs";
import * as path from "path";

test('4cff PDB 추출', () => {
    const file = fs.readFileSync(path.join(__dirname, "./pdb", "4cff.pdb"), 'utf-8')

    const parser = new PdbParser()
    file.split('\n').forEach(line => {
        parser.collect(line)
    })
    const result = parser.parse()

    console.log(result)
});