import '../extension/string';
import {AbstractParser, Parser, SectionParser} from "../parser";
import {toIntOrNull} from "../extension/string";
import {Residue, Section} from "../model";

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

export interface CompndOrSource {
    [key: string]: string
}

export interface Caveat {
    idCode: string | null
    comment: string | null
}

export interface Revdat {
    modNum: number
    modDate: string | null
    modId: string | null
    modType: string | null
    records: string[]
}

export interface Sprsde {
    sprsdeDate: string | null
    idCode: string | null
    sIdCodes: string[]
}

/***
 * remark 465
 */
export interface MissingResidue extends Residue {
    // resName: string | null
    // chainID: string | null
    // seqNum: number | null
    // iCode: string | null
}

/***
 * remark 470
 */
export interface MissingAtom extends MissingResidue {
    // resName: string | null
    // chainID: string | null
    // seqNum: number | null
    // iCode: string | null
    atoms: string[]
}

/***
 * COLUMNS       DATA  TYPE     FIELD             DEFINITION
 * ------------------------------------------------------------------------------------
 *  1 -  6       Record name    "HEADER"
 * 11 - 50       String(40)     classification    Classifies the molecule(s).
 * 51 - 59       Date           depDate           Deposition date. This is the date the
 *                                                coordinates  were received at the PDB.
 * 63 - 66       IDcode         idCode            This identifier is unique within the PDB.
 */
export class HeaderParser extends AbstractParser<Header> {

    protected match(line: string): boolean {
        return line.startsWith('HEADER')
    }

    protected _parse(): Header {
        const empty = {
            classification: null,
            depDate: null,
            idCode: null
        }

        if (this.lines.length == 0)
            return empty
        const line = this.lines[0]

        const classification = line.extract(11, 50)
        const depDate = line.extract(51, 59)
        const idCode = line.extract(63, 66)

        return {
            ...empty,
            classification,
            depDate,
            idCode
        }
    }
}

/***
 * COLUMNS       DATA  TYPE     FIELD         DEFINITION
 * ---------------------------------------------------------------------------------------
 *  1 -  6       Record name   "OBSLTE"
 *  9 - 10       Continuation  continuation  Allows concatenation of multiple records
 * 12 - 20       Date          repDate       Date that this entry was replaced.
 * 22 - 25       IDcode        idCode        ID code of this entry.
 * 32 - 35       IDcode        rIdCode       ID code of entry that replaced this one.
 * 37 - 40       IDcode        rIdCode       ID code of entry that replaced this one.
 * 42 - 45       IDcode        rIdCode       ID code of entry  that replaced this one.
 * 47 - 50       IDcode        rIdCode       ID code of entry that replaced this one.
 * 52 - 55       IDcode        rIdCode       ID code of entry that replaced this one.
 * 57 - 60       IDcode        rIdCode       ID code of entry that replaced this one.
 * 62 - 65       IDcode        rIdCode       ID code of entry that replaced this one.
 * 67 - 70       IDcode        rIdCode       ID code of entry that replaced this one.
 * 72 - 75       IDcode        rIdCode       ID code of entry that replaced this one.
 */
export class ObslteParser extends AbstractParser<Obslte[]> {

    protected match(line: string): boolean {
        return line.startsWith('OBSLTE')
    }

    protected _parse(): Obslte[] {
        return this.lines.map(line => {
            const repDate = line.extract(12, 20)
            const idCode = line.extract(22, 25)
            const rIdCodes = [
                line.extract(32, 35),
                line.extract(37, 40),
                line.extract(42, 45),
                line.extract(47, 50),
                line.extract(52, 55),
                line.extract(57, 60),
                line.extract(62, 65),
                line.extract(67, 70),
                line.extract(72, 75),
            ]

            return {
                repDate,
                idCode,
                rIdCodes: rIdCodes.filter(it => it) as string[]
            }
        })
    }
}

/***
 * COLUMNS       DATA  TYPE     FIELD         DEFINITION
 * ----------------------------------------------------------------------------------
 *  1 -  6       Record name    "TITLE "
 *  9 - 10       Continuation   continuation  Allows concatenation of multiple records.
 * 11 - 80       String         title         Title of the  experiment.
 */
export class TitleParser extends AbstractParser<string | null> {

    protected match(line: string): boolean {
        return line.startsWith('TITLE ')
    }

    protected _parse(): string | null {
        const title = this.lines.map(it => it.extract(11)).join(' ')
        if (title.isBlank()) return null
        return title
    }
}

/***
 * COLUMNS        DATA TYPE     FIELD         DEFINITION
 * ----------------------------------------------------------------------------------
 *  1 -  6        Record  name  "SPLIT "
 *  9 - 10        Continuation  continuation  Allows concatenation of multiple records.
 * 12 - 15        IDcode        idCode        ID code of related entry.
 * 17 - 20        IDcode        idCode        ID code of related entry.
 * 22 - 25        IDcode        idCode        ID code of related entry.
 * 27 – 30        IDcode        idCode        ID code of related entry.
 * 32 - 35        IDcode        idCode        ID code of related entry.
 * 37 - 40        IDcode        idCode        ID code of related entry.
 * 42 - 45        IDcode        idCode        ID code of related entry.
 * 47 - 50        IDcode        idCode        ID code of related entry.
 * 52 - 55        IDcode        idCode        ID code of related entry.
 * 57 - 60        IDcode        idCode        ID code of related entry.
 * 62 - 65        IDcode        idCode        ID code of related entry.
 * 67 - 70        IDcode        idCode        ID code of related entry.
 * 72 - 75        IDcode        idCode        ID code of related entry.
 * 77 - 80        IDcode        idCode        ID code of related entry.
 */
export class SplitParser extends AbstractParser<string[]> {

    protected match(line: string): boolean {
        return line.startsWith('SPLIT ')
    }

    protected _parse(): string[] {
        return this.lines.flatMap(line => {
            return [
                line.extract(12, 15),
                line.extract(17, 20),
                line.extract(22, 25),
                line.extract(27, 30),
                line.extract(32, 35),
                line.extract(37, 40),
                line.extract(42, 45),
                line.extract(47, 50),
                line.extract(52, 55),
                line.extract(57, 60),
                line.extract(62, 65),
                line.extract(67, 70),
                line.extract(72, 75),
                line.extract(77, 80),
            ].filter(it => it) as string[]
        })
    }
}

/***
 * COLUMNS       DATA  TYPE    FIELD          DEFINITION
 * ---------------------------------------------------------------------------------------
 *   1 - 6       Record name   "CAVEAT"
 *  9 - 10       Continuation  continuation   Allows concatenation of multiple records.
 * 12 - 15       IDcode        idCode         PDB ID code of this entry.
 * 20 - 79       String        comment        Free text giving the reason for the  CAVEAT.
 */
export class CaveatParser extends AbstractParser<Caveat[]> {

    protected match(line: string): boolean {
        return line.startsWith('CAVEAT')
    }

    protected _parse(): Caveat[] {
        return this.lines.flatMap(line => {
            const idCode = line.extract(12, 15)
            const comment = line.extract(20, 79)

            return {
                idCode,
                comment,
            }
        })
    }
}

abstract class CompndOrSourceParser extends AbstractParser<CompndOrSource[]> {

    protected abstract tokens(): string[]

    private isTokenBegin(line: string): boolean {
        const tokens = this.tokens()
        for (const token of tokens) {
            if (line.startsWith(`${token}:`)) {
                return true
            }
        }
        return false
    }

    protected _parse(): CompndOrSource[] {
        const lines = this.lines.map(line => line.extract(11, 80)).filter(it => it)

        const fixedLines: string[] = []
        for (const line of lines) {
            if (!line) continue

            const findToken = this.isTokenBegin(line);
            if (findToken) {
                fixedLines.push(line)
            } else {
                fixedLines[fixedLines.length - 1] += line
            }
        }

        const results: CompndOrSource[] = []
        let compnd: CompndOrSource | null = null
        for (const fixedLine of fixedLines) {
            if (fixedLine.startsWith('MOL_ID:')) {
                if (compnd != null) {
                    results.push(compnd)
                }
                compnd = {}
            }
            const indexOf = fixedLine.indexOf(':')
            const key = fixedLine.substring(0, indexOf)
            const value = fixedLine.substring(indexOf + 1).trim()

            compnd![key] = value.endsWith(';') ? value.slice(0, -1) : value
        }
        if (compnd != null) {
            results.push(compnd)
        }

        return results
    }
}

/***
 * COLUMNS       DATA TYPE       FIELD         DEFINITION
 * ----------------------------------------------------------------------------------
 *  1 -  6       Record name     "COMPND"
 *  8 - 10       Continuation    continuation  Allows concatenation of multiple records.
 * 11 - 80       Specification   compound      Description of the molecular components.
 *               list
 *
 * Details
 *
 * The compound record is a Specification list. The specifications, or tokens, that may be used are listed below:
 * TOKEN                  VALUE DEFINITION
 * -------------------------------------------------------------------------
 * MOL_ID                 Numbers each component; also used in  SOURCE to associate
 *                        the information.
 * MOLECULE               Name of the macromolecule.
 * CHAIN                  Comma-separated list of chain  identifier(s).
 * FRAGMENT               Specifies a domain or region of the  molecule.
 * SYNONYM                Comma-separated list of synonyms for  the MOLECULE.
 * EC                     The Enzyme Commission number associated  with the molecule.
 *                        If there is more than one EC number,  they are presented
 *                        as a comma-separated list.
 * ENGINEERED             Indicates that the molecule was  produced using
 *                        recombinant technology or by purely  chemical synthesis.
 * MUTATION               Indicates if there is a mutation.
 * OTHER_DETAILS          Additional comments.
 */
export class CompndParser extends CompndOrSourceParser {

    protected tokens(): string[] {
        return [
            'MOL_ID',
            'MOLECULE',
            'CHAIN',
            'FRAGMENT',
            'SYNONYM',
            'EC',
            'ENGINEERED',
            'MUTATION',
            'OTHER_DETAILS',
        ]
    }

    protected match(line: string): boolean {
        return line.startsWith('COMPND')
    }
}

/***
 * COLUMNS      DATA  TYPE     FIELD          DEFINITION
 * --------------------------------------------------------------------------------------
 *  1 -  6      Record name    "SOURCE"
 *  8 - 10      Continuation   continuation   Allows concatenation of multiple records.
 * 11 - 79      Specification  srcName        Identifies the source of the
 *              List                          macromolecule in a  token: value format.
 *
 * Details
 *
 * TOKEN                                VALUE  DEFINITION
 * --------------------------------------------------------------------------------------
 * MOL_ID                               Numbers each  molecule. Same as appears in COMPND.
 * SYNTHETIC                            Indicates a  chemically-synthesized source.
 * FRAGMENT                             A domain or  fragment of the molecule may be
 *                                      specified.
 * ORGANISM_SCIENTIFIC                  Scientific name of the  organism.
 * ORGANISM_COMMON                      Common name of the  organism.
 * ORGANISM_TAXID                       NCBI Taxonomy ID number  of the organism.
 * STRAIN                               Identifies the  strain.
 * VARIANT                              Identifies the  variant.
 * CELL_LINE                            The specific line of  cells used in the experiment.
 * ATCC                                 American Type  Culture Collection tissue
 *                                      culture  number.
 * ORGAN                                Organized group of  tissues that carries on
 *                                      a specialized function.
 * TISSUE                               Organized group  of cells with a common
 *                                      function and  structure.
 * CELL                                 Identifies the  particular cell type.
 * ORGANELLE                            Organized structure  within a cell.
 * SECRETION                            Identifies the secretion, such as  saliva, urine,
 *                                      or venom,  from which the molecule was isolated.
 * CELLULAR_LOCATION                    Identifies the location  inside/outside the cell.
 * PLASMID                              Identifies the plasmid  containing the gene.
 * GENE                                 Identifies the  gene.
 * EXPRESSION_SYSTEM                    Scientific name of the organism in  which the
 *                                      molecule was expressed.
 * EXPRESSION_SYSTEM_COMMON             Common name of the organism in  which the molecule
 *                                      was  expressed.
 * EXPRESSION_SYSTEM_TAXID              NCBI Taxonomy ID of the organism  used as the
 *                                      expression  system.
 * EXPRESSION_SYSTEM_STRAIN             Strain of the organism in which  the molecule
 *                                      was  expressed.
 * EXPRESSION_SYSTEM_VARIANT            Variant of the organism used as the
 *                                      expression  system.
 * EXPRESSION_SYSTEM_CELL_LINE          The specific line of cells used as  the
 *                                      expression  system.
 * EXPRESSION_SYSTEM_ATCC_NUMBER        Identifies the ATCC number of the  expression system.
 * EXPRESSION_SYSTEM_ORGAN              Specific organ which expressed  the molecule.
 * EXPRESSION_SYSTEM_TISSUE             Specific tissue which expressed  the molecule.
 * EXPRESSION_SYSTEM_CELL               Specific cell type which  expressed the molecule.
 * EXPRESSION_SYSTEM_ORGANELLE          Specific organelle which expressed  the molecule.
 * EXPRESSION_SYSTEM_CELLULAR_LOCATION  Identifies the location inside or outside
 *                                      the cell  which expressed the molecule.
 * EXPRESSION_SYSTEM_VECTOR_TYPE        Identifies the type of vector used,  i.e.,
 *                                      plasmid,  virus, or cosmid.
 * EXPRESSION_SYSTEM_VECTOR             Identifies the vector used.
 * EXPRESSION_SYSTEM_PLASMID            Plasmid used in the recombinant experiment.
 * EXPRESSION_SYSTEM_GENE               Name of the gene used in  recombinant experiment.
 * OTHER_DETAILS                        Used to present  information on the source which
 *                                      is not  given elsewhere.
 */
export class SourceParser extends CompndOrSourceParser {

    protected tokens(): string[] {
        return [
            'MOL_ID',
            'SYNTHETIC',
            'FRAGMENT',
            'ORGANISM_SCIENTIFIC',
            'ORGANISM_COMMON',
            'ORGANISM_TAXID',
            'STRAIN',
            'VARIANT',
            'CELL_LINE',
            'ATCC',
            'ORGAN',
            'TISSUE',
            'CELL',
            'ORGANELLE',
            'SECRETION',
            'CELLULAR_LOCATION',
            'PLASMID',
            'GENE',
            'EXPRESSION_SYSTEM',
            'EXPRESSION_SYSTEM_COMMON',
            'EXPRESSION_SYSTEM_TAXID',
            'EXPRESSION_SYSTEM_STRAIN',
            'EXPRESSION_SYSTEM_VARIANT',
            'EXPRESSION_SYSTEM_CELL_LINE',
            'EXPRESSION_SYSTEM_ATCC_NUMBER',
            'EXPRESSION_SYSTEM_ORGAN',
            'EXPRESSION_SYSTEM_TISSUE',
            'EXPRESSION_SYSTEM_CELL',
            'EXPRESSION_SYSTEM_ORGANELLE',
            'EXPRESSION_SYSTEM_CELLULAR_LOCATION',
            'EXPRESSION_SYSTEM_VECTOR_TYPE',
            'EXPRESSION_SYSTEM_VECTOR',
            'EXPRESSION_SYSTEM_PLASMID',
            'EXPRESSION_SYSTEM_GENE',
            'OTHER_DETAILS',
        ]
    }

    protected match(line: string): boolean {
        return line.startsWith('SOURCE')
    }
}

/***
 * COLUMNS       DATA  TYPE     FIELD         DEFINITION
 * ---------------------------------------------------------------------------------
 *  1 -  6       Record name    "KEYWDS"
 *  9 - 10       Continuation   continuation  Allows concatenation of records if necessary.
 * 11 - 79       List           keywds        Comma-separated list of keywords relevant
 *                                            to the entry.
 */
export class KeywdsParser extends AbstractParser<string[]> {

    protected match(line: string): boolean {
        return line.startsWith('KEYWDS')
    }

    protected _parse(): string[] {
        return this.lines.map(it => it.extract(11))
            .filter(it => it)
            .join('')
            .split(",")
            .map(it => it.trim())
            .filter(it => it) as string[]
    }
}

/***
 * COLUMNS       DATA TYPE      FIELD         DEFINITION
 * ------------------------------------------------------------------------------------
 *  1 -  6       Record name    "EXPDTA"
 *  9 - 10       Continuation   continuation  Allows concatenation of multiple records.
 * 11 - 79       SList          technique     The experimental technique(s) with
 *                                            optional comment describing the
 *                                            sample or experiment.
 */
export class ExpdtaParser extends AbstractParser<string[]> {

    protected match(line: string): boolean {
        return line.startsWith('EXPDTA')
    }

    protected _parse(): string[] {
        return this.lines.map(it => it.extract(11))
            .filter(it => it) as string[]
    }
}

/***
 * COLUMNS      DATA TYPE      FIELD         DEFINITION
 * ------------------------------------------------------------------------------------
 *  1 -  6      Record name    "NUMMDL"
 * 11 - 14      Integer        modelNumber   Number of models.
 */
export class NummdlParser extends AbstractParser<number | null> {

    protected match(line: string): boolean {
        return line.startsWith('NUMMDL')
    }

    protected _parse(): number | null {
        if (this.lines.length == 0)
            return null
        const line = this.lines[0]

        const modelNumber = line.extract(11, 14)
        return toIntOrNull(modelNumber)
    }
}

/***
 * COLUMNS      DATA TYPE      FIELD         DEFINITION
 * ------------------------------------------------------------------------------------
 *  1 -  6      Record name    "MDLTYP"
 *  9 - 10      Continuation   continuation  Allows concatenation of multiple records.
 * 11 - 80      SList          comment       Free Text providing  additional structural
 *                                           annotation.
 */
export class MdltypParser extends AbstractParser<string[]> {

    protected match(line: string): boolean {
        return line.startsWith('MDLTYP')
    }

    protected _parse(): string[] {
        return this.lines.map(line => line.extract(11, 48))
            .filter(it => it) as string[]
    }
}

/***
 * COLUMNS      DATA  TYPE      FIELD         DEFINITION
 * ------------------------------------------------------------------------------------
 *  1 -  6      Record name     "AUTHOR"
 *  9 - 10      Continuation    continuation  Allows concatenation of multiple records.
 * 11 - 79      List            authorList    List of the author names, separated
 *                                            by commas.
 */
export class AuthorParser extends AbstractParser<string[]> {

    protected match(line: string): boolean {
        return line.startsWith('AUTHOR')
    }

    protected _parse(): string[] {
        return this.lines.map(it => it.extract(11))
            .filter(it => it)
            .join('')
            .split(",")
            .map(it => it.trim())
            .filter(it => it) as string[]
    }
}

/***
 * COLUMNS       DATA  TYPE     FIELD         DEFINITION
 * -------------------------------------------------------------------------------------
 *  1 -  6       Record name    "REVDAT"
 *  8 - 10       Integer        modNum        Modification number.
 * 11 - 12       Continuation   continuation  Allows concatenation of multiple records.
 * 14 - 22       Date           modDate       Date of modification (or release  for
 *                                            new entries)  in DD-MMM-YY format. This is
 *                                            not repeated on continued lines.
 * 24 - 27       IDCode         modId         ID code of this entry. This is not repeated on
 *                                            continuation lines.
 * 32            Integer        modType       An integer identifying the type of
 *                                            modification. For all  revisions, the
 *                                            modification type is listed as 1
 * 40 - 45       LString(6)     record        Modification detail.
 * 47 - 52       LString(6)     record        Modification detail.
 * 54 - 59       LString(6)     record        Modification detail.
 * 61 - 66       LString(6)     record        Modification detail.
 */
export class RevdatParser extends AbstractParser<Revdat[]> {
    protected sortDesc: boolean

    constructor(sortDesc = true) {
        super();
        this.sortDesc = sortDesc
    }

    protected match(line: string): boolean {
        return line.startsWith('REVDAT')
    }

    protected _parse(): Revdat[] {
        const revdats: Revdat[] = this.lines.map(line => {
            const modNum = line.extract(8, 10)
            const modDate = line.extract(14, 22)
            const modId = line.extract(24, 27)
            const modType = line.extract(32, 32)
            const records = [
                line.extract(40, 45),
                line.extract(47, 52),
                line.extract(54, 59),
                line.extract(61, 66),
            ]

            return {
                modNum: toIntOrNull(modNum)!,
                modDate,
                modId,
                modType,
                records: records.filter(it => it) as string[]
            }
        })

        const fixedRevdats: Revdat[] = []
        let prevModNum: number | null = null
        for (const revdat of revdats) {
            if (revdat.modNum == prevModNum) {
                const lastIndex = fixedRevdats.length - 1
                const {records, ...last} = {...fixedRevdats[lastIndex]}

                fixedRevdats[lastIndex] = {
                    ...last,
                    records: [
                        ...records,
                        ...revdat.records
                    ]
                }
            } else {
                fixedRevdats.push(revdat)
            }
            prevModNum = revdat.modNum
        }
        return fixedRevdats.sort(a => a.modNum * (this.sortDesc ? 1 : -1))
    }
}

/***
 * COLUMNS        DATA TYPE     FIELD         DEFINITION
 * -----------------------------------------------------------------------------------
 *  1 -  6        Record name   "SPRSDE"
 *  9 - 10        Continuation  continuation  Allows for multiple ID codes.
 * 12 - 20        Date          sprsdeDate    Date this entry superseded the listed
 *                                            entries. This field is not copied on
 *                                            continuations.
 * 22 - 25        IDcode        idCode        ID code of this entry. This field is  not
 *                                            copied on continuations.
 * 32 - 35        IDcode        sIdCode       ID code of a superseded entry.
 * 37 - 40        IDcode        sIdCode       ID code of a superseded entry.
 * 42 - 45        IDcode        sIdCode       ID code of a superseded entry.
 * 47 - 50        IDcode        sIdCode       ID code of a superseded entry.
 * 52 - 55        IDcode        sIdCode       ID code of a superseded entry.
 * 57 - 60        IDcode        sIdCode       ID code of a superseded entry.
 * 62 - 65        IDcode        sIdCode       ID code of a superseded entry.
 * 67 - 70        IDcode        sIdCode       ID code of a superseded entry.
 * 72 - 75        IDcode        sIdCode       ID code of a superseded entry.
 */
export class SprsdeParser extends AbstractParser<Sprsde[]> {

    protected match(line: string): boolean {
        return line.startsWith('SPRSDE')
    }

    protected _parse(): Sprsde[] {
        return this.lines.map(line => {
            const sprsdeDate = line.extract(12, 20)
            const idCode = line.extract(22, 25)
            const sIdCodes = [
                line.extract(32, 35),
                line.extract(37, 40),
                line.extract(42, 45),
                line.extract(47, 50),
                line.extract(52, 55),
                line.extract(57, 60),
                line.extract(62, 65),
                line.extract(67, 70),
                line.extract(72, 75),
            ]

            return {
                sprsdeDate,
                idCode,
                sIdCodes: sIdCodes.filter(it => it) as string[]
            }
        })
    }
}

// TODO : JRNL


/***
 * COLUMNS       DATA TYPE     FIELD         DEFINITION
 * --------------------------------------------------------------------------------------
 *  1 -  6       Record name   "REMARK"
 *  8 - 10       Integer       remarkNum     Remark  number. It is not an error for
 *                                           remark n to exist in an entry when
 *                                           remark n-1 does not.
 * 12 - 79       LString       empty         Left  as white space in first line
 *                                           of each  new remark.
 */
abstract class RemarkParser<T> extends AbstractParser<T> {

    protected abstract readonly remarkNum: number

    protected match(line: string): boolean {
        if (line.startsWith('REMARK')) {
            const remarkNum = toIntOrNull(line.extract(8, 10)!)
            if (this.remarkNum == remarkNum) return true
        }
        return false
    }
}

/***
 * Template for non NMR entries
 *
 *          1         2         3         4         5         6         7         8
 * 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 * REMARK 465
 * REMARK 465 MISSING RESIDUES
 * REMARK 465 THE FOLLOWING RESIDUES WERE NOT LOCATED IN  THE
 * REMARK 465 EXPERIMENT. (M=MODEL NUMBER; RES=RESIDUE NAME;  C=CHAIN
 * REMARK 465 IDENTIFIER; SSSEQ=SEQUENCE NUMBER; I=INSERTION  CODE.)
 * REMARK 465
 * REMARK 465   M RES C SSSEQI
 *
 * Template for NMR entries (new)
 *
 *          1         2         3         4         5         6         7         8
 * 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 * REMARK 465
 * REMARK 465 MISSING RESIDUES
 * REMARK 465 THE FOLLOWING RESIDUES WERE NOT LOCATED IN THE
 * REMARK 465 EXPERIMENT. (RES=RESIDUE NAME; C=CHAIN IDENTIFIER;
 * REMARK 465 SSSEQ=SEQUENCE NUMBER; I=INSERTION CODE.)
 * REMARK 465   MODELS X-YYY
 * REMARK 465     RES C SSSEQI
 */
export class Remark465Parser extends RemarkParser<MissingResidue[]> {
    protected readonly remarkNum: number = 465

    protected _parse(): MissingResidue[] {
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
                    resSeq: toIntOrNull(seqNum),
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

/***
 * Template for non NMR entries
 *
 *          1         2         3         4         5         6         7         8
 * 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 * REMARK 470
 * REMARK 470 MISSING ATOM
 * REMARK 470 THE FOLLOWING RESIDUES HAVE MISSING ATOMS (M=MODEL NUMBER;
 * REMARK 470 RES=RESIDUE NAME; C=CHAIN IDENTIFIER;  SSEQ=SEQUENCE NUMBER;
 * REMARK 470 I=INSERTION CODE):
 * REMARK 470   M RES  CSSEQI  ATOMS
 *
 * Template for NMR entries (add)
 *
 *          1         2         3         4         5         6         7         8
 * 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 * REMARK 470 MISSING ATOM
 * REMARK 470 THE FOLLOWING RESIDUES HAVE MISSING ATOMS (RES=RESIDUE NAME;
 * REMARK 470 C=CHAIN IDENTIFIER; SSEQ=SEQUENCE NUMBER; I=INSERTION CODE):
 * REMARK 470   MODELS X-YYY
 * REMARK 470     RES CSSEQI  ATOMS
 */
export class Remark470Parser extends RemarkParser<MissingAtom[]> {
    protected readonly remarkNum: number = 470

    protected _parse(): MissingAtom[] {
        const toMissingAtom: (
            resName: string | null,
            chainID: string | null,
            seqNum: string | null,
            iCode: string | null,
            atoms: string | null
        ) => MissingAtom = (resName, chainID, seqNum, iCode, atoms) => {
            return {
                resName,
                chainID,
                resSeq: toIntOrNull(seqNum),
                iCode,
                atoms: atoms?.split(' ')?.map(it => it.trim())?.filter(it => it) ?? []
            }
        }

        const missingAtoms: MissingAtom[] = []
        let find: 'NonNMR' | 'NMR' | null = null
        for (const line of this.lines) {
            switch (find) {
                case 'NonNMR': {
                    const resName = line.extract(16, 19)
                    const chainID = line.extract(21, 21)
                    const seqNum = line.extract(22, 25)
                    const iCode = line.extract(26, 26)
                    const atoms = line.extract(29)

                    missingAtoms.push(toMissingAtom(resName, chainID, seqNum, iCode, atoms))
                    break
                }
                case 'NMR': {
                    const resName = line.extract(16, 19)
                    const chainID = line.extract(20, 20)
                    const seqNum = line.extract(21, 24)
                    const iCode = line.extract(25, 25)
                    const atoms = line.extract(28)

                    missingAtoms.push(toMissingAtom(resName, chainID, seqNum, iCode, atoms))
                    break
                }
                default:
                    if (line.includes('RES  CSSEQI  ATOMS')) {
                        find = "NonNMR"
                    } else if (line.includes('RES CSSEQI  ATOMS')) {
                        find = "NMR"
                    }
                    break
            }
        }
        return missingAtoms
    }
}

export interface TitleSection extends Section {
    header: Header
    obsltes: Obslte[]
    title: string | null
    splits: string[]
    caveats: Caveat[]
    compnds: CompndOrSource[]
    sources: CompndOrSource[]
    keywdss: string[]
    expdtas: string[]
    nummdl: number | null
    mdltyps: string[]
    authors: string[]
    revdats: Revdat[]
    sprsdes: Sprsde[]
    missingResidues: MissingResidue[]
    missingAtoms: MissingAtom[]
}

export class TitleSectionParser extends SectionParser<TitleSection> {
    protected headerParser = new HeaderParser()
    protected obslteParser = new ObslteParser()
    protected titleParser = new TitleParser()
    protected splitParser = new SplitParser()
    protected caveatParser = new CaveatParser()
    protected compndParser = new CompndParser()
    protected sourceParser = new SourceParser()
    protected keywdsParser = new KeywdsParser()
    protected expdtaParser = new ExpdtaParser()
    protected nummdlParser = new NummdlParser()
    protected mdltypParser = new MdltypParser()
    protected authorParser = new AuthorParser()
    protected revdatParser = new RevdatParser()
    protected sprsdeParser = new SprsdeParser()
    protected remark465Parser = new Remark465Parser()
    protected remark470Parser = new Remark470Parser()

    protected parsers(): Parser<any>[] {
        return [
            this.headerParser,
            this.obslteParser,
            this.titleParser,
            this.splitParser,
            this.caveatParser,
            this.compndParser,
            this.sourceParser,
            this.keywdsParser,
            this.expdtaParser,
            this.nummdlParser,
            this.mdltypParser,
            this.authorParser,
            this.revdatParser,
            this.sprsdeParser,
            this.remark465Parser,
            this.remark470Parser,
        ]
    }

    parse(): TitleSection {
        return {
            header: this.headerParser.parse(),
            obsltes: this.obslteParser.parse(),
            title: this.titleParser.parse(),
            splits: this.splitParser.parse(),
            caveats: this.caveatParser.parse(),
            compnds: this.compndParser.parse(),
            sources: this.sourceParser.parse(),
            keywdss: this.keywdsParser.parse(),
            expdtas: this.expdtaParser.parse(),
            nummdl: this.nummdlParser.parse(),
            mdltyps: this.mdltypParser.parse(),
            authors: this.authorParser.parse(),
            revdats: this.revdatParser.parse(),
            sprsdes: this.sprsdeParser.parse(),
            missingResidues: this.remark465Parser.parse(),
            missingAtoms: this.remark470Parser.parse(),
        }
    }
}
