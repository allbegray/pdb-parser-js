/*
COLUMNS       DATA  TYPE     FIELD         DEFINITION
-----------------------------------------------------------------------
 1 - 6        Record name    "HETATM"
 7 - 11       Integer        serial        Atom serial number.
13 - 16       Atom           name          Atom name.
17            Character      altLoc        Alternate location indicator.
18 - 20       Residue name   resName       Residue name.
22            Character      chainID       Chain identifier.
23 - 26       Integer        resSeq        Residue sequence number.
27            AChar          iCode         Code for insertion of residues.
31 - 38       Real(8.3)      x             Orthogonal coordinates for X.
39 - 46       Real(8.3)      y             Orthogonal coordinates for Y.
47 - 54       Real(8.3)      z             Orthogonal coordinates for Z.
55 - 60       Real(6.2)      occupancy     Occupancy.
61 - 66       Real(6.2)      tempFactor    Temperature factor.
77 - 78       LString(2)     element       Element symbol; right-justified.
79 - 80       LString(2)     charge        Charge on the atom.
 */

import '../extension/string';
import {AtomParser} from "./atomParser";

class HetatmParser extends AtomParser {

    match(line: string): boolean {
        return line.startsWith('HETATM')
    }
}

export {HetatmParser}