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

export interface Ssbond {
    serNum: number | null
    resName1: string | null
    chainID1: string | null
    seqNum1: number | null
    icode1: string | null
    resName2: string | null
    chainID2: string | null
    seqNum2: number | null
    icode2: string | null
    sym1: string | null
    sym2: string | null
    Length: number | null
}

export interface Hetsyn {
    hetID: string
    hetSynonyms: string | null
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

// remark 465
export interface MissingResidue {
    resName: string | null
    chainID: string | null
    seqNum: number | null
    iCode: string | null
}

// remark 470
export interface MissingAtom {
    resName: string | null
    chainID: string | null
    seqNum: number | null
    iCode: string | null
    atoms: string[]
}

export interface Dbref {
    idCode: string | null
    chainID: string | null
    seqBegin: number | null
    insertBegin: string | null
    seqEnd: number | null
    insertEnd: string | null
    database: string | null
    dbAccession: string | null
    dbIdCode: string | null
    dbseqBegin: number | null
    idbnsBeg: string | null
    dbseqEnd: number | null
    dbinsEnd: string | null
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

export interface Dbref1 {
    idCode: string | null
    chainID: string | null
    seqBegin: number | null
    insertBegin: string | null
    seqEnd: number | null
    insertEnd: string | null
    database: string | null
    dbIdCode: string | null
}

export interface Dbref2 {
    idCode: string | null
    chainID: string | null
    dbAccession: string | null
    seqBegin: number | null
    seqEnd: number | null
}

export interface Seqres {
    serNum: number | null
    chainID: string | null
    numRes: number | null
    resNames: string[]
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

// not yet

export interface Cispep {
    serNum: number | null
    pep1: string | null
    chainID1: string | null
    seqNum1: number | null
    icode1: string | null
    pep2: string | null
    chainID2: string | null
    seqNum2: number | null
    icode2: string | null
    modNum: number | null
    measure: number | null
}
