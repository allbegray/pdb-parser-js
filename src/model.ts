export interface Residue {
    resName: string | null
    chainID: string | null
    resSeq: number | null
    iCode: string | null
}

export interface ResidueWithAtom extends Residue {
    atom: string | null
    altLoc?: string | null
}

export interface Section {
}

export type Point4D = [number | null, number | null, number | null, number | null]

export interface Matrixable {
    toPoint4D(): Point4D
}