export interface Header {
    classification: string | null
    depDate: string | null
    idCode: string | null
}

export interface Obslte {
    repDate: string | null
    idCode: string | null
    rIdCodes: string[]
}

export interface Atom {
    serial: number | null
    name: string | null
    altLoc: string | null
    resName: string | null
    chainID: string | null
    resSeq: number | null
    iCode: string | null
    x: number | null
    y: number | null
    z: number | null
    occupancy: number | null
    tempFactor: number | null
    element: string | null
    charge: string | null
}

export interface Hetatm extends Atom {
}

// not yet

export interface Ssbond {
    serNum: number | null
    chainID1: string | null
    seqNum1: number | null
    icode1: string | null
    chainID2: string | null
    seqNum2: number | null
    icode2: string | null
    sym1: string | null
    sym2: string | null
    Length: number | null
}

export interface Het {
    hetID: string | null
    ChainID: string | null
    seqNum: number | null
    iCode: string | null
    numHetAtoms: number | null
    text: string | null
}

export interface Hetnam {
    hetID: string | null
    text: string | null
}

export interface Modres {
    idCode: string | null
    resName: string | null
    chainID: string | null
    seqNum: number | null
    iCode: string | null
    stdRes: string | null
    comment: string | null
}

export interface Seqadv {
    idCode: string | null
    resName: string | null
    chainID: string | null
    seqNum: number | null
    iCode: string | null
    database: string | null
    dbAccession: string | null
    dbRes: string | null
    dbSeq: number | null
    conflict: string | null
}

export interface Seqres {
    serNum: string | null
    chainID: string | null
    numRes: number | null
    resNames: string[]
}
