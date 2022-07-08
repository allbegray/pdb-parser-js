export interface Residue {
    resName: string | null
    chainID: string | null
    resSeq: number | null
    iCode: string | null
}

export interface ResidueWithAtom {
    atom: string | null
}