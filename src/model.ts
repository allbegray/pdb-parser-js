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

export const AminoAcids = {
    'ALA': 'A', // Alanine
    'ARG': 'R', // Arginine
    'ASN': 'N', // Asparagine
    'ASP': 'D', // Aspartic Acid
    'CYS': 'C', // Cysteine
    'GLU': 'E', // Glutamic Acid
    'GLN': 'Q', // Glutamine
    'GLY': 'G', // Glycine
    'HIS': 'H', // Histidine
    'ILE': 'I', // Isoleucine
    'LEU': 'L', // Leucine
    'LYS': 'K', // Lysine
    'MET': 'M', // Methionine
    'PHE': 'F', // Phenylalanine
    'PRO': 'P', // Proline
    'SER': 'S', // Serine
    'THR': 'T', // Threonine
    'TRP': 'W', // Tryptophan
    'TYR': 'Y', // Tyrosine
    'VAL': 'V', // Valine
}
