import {TitleSection, TitleSectionParser} from "./section/title";
import {PrimaryStructureSection, PrimaryStructureSectionParser} from "./section/primaryStructure";
import {HeterogenSection, HeterogenSectionParser} from "./section/heterogen";
import {SecondaryStructureSection, SecondaryStructureSectionParser} from "./section/secondaryStructure";
import {ConnectivityAnnotationSection, ConnectivityAnnotationSectionParser} from "./section/connectivityAnnotation";
import {MiscellaneousFeaturesSection, MiscellaneousFeaturesSectionParser} from "./section/miscellaneousFeatures";
import {
    CrystallographicAndCoordinateTransformationSection, CrystallographicAndCoordinateTransformationSectionParser
} from "./section/crystallographicAndCoordinateTransformation";
import {CoordinateSection, CoordinateSectionParser} from "./section/coordinate";
import {ConnectivitySection, ConnectivitySectionParser} from "./section/connectivity";
import {BookkeepingSection, BookkeepingSectionParser} from "./section/bookkeeping";
import {Parser, SectionParser} from "./parser";

export class Pdb {
    title: TitleSection
    primaryStructure: PrimaryStructureSection
    heterogen: HeterogenSection
    secondaryStructure: SecondaryStructureSection
    connectivityAnnotation: ConnectivityAnnotationSection
    miscellaneousFeatures: MiscellaneousFeaturesSection
    crystallographicAndCoordinateTransformation: CrystallographicAndCoordinateTransformationSection
    coordinate: CoordinateSection
    connectivity: ConnectivitySection
    bookkeeping: BookkeepingSection

    constructor(title: TitleSection, primaryStructure: PrimaryStructureSection, heterogen: HeterogenSection, secondaryStructure: SecondaryStructureSection, connectivityAnnotation: ConnectivityAnnotationSection, miscellaneousFeatures: MiscellaneousFeaturesSection, crystallographicAndCoordinateTransformation: CrystallographicAndCoordinateTransformationSection, coordinate: CoordinateSection, connectivity: ConnectivitySection, bookkeeping: BookkeepingSection) {
        this.title = title;
        this.primaryStructure = primaryStructure;
        this.heterogen = heterogen;
        this.secondaryStructure = secondaryStructure;
        this.connectivityAnnotation = connectivityAnnotation;
        this.miscellaneousFeatures = miscellaneousFeatures;
        this.crystallographicAndCoordinateTransformation = crystallographicAndCoordinateTransformation;
        this.coordinate = coordinate;
        this.connectivity = connectivity;
        this.bookkeeping = bookkeeping;
    }
}

export class PdbParser extends SectionParser<Pdb> {
    protected titleSectionParser = new TitleSectionParser()
    protected primaryStructureSectionParser = new PrimaryStructureSectionParser()
    protected heterogenSectionParser = new HeterogenSectionParser()
    protected secondaryStructureSectionParser = new SecondaryStructureSectionParser()
    protected connectivityAnnotationSectionParser = new ConnectivityAnnotationSectionParser()
    protected miscellaneousFeaturesSectionParser = new MiscellaneousFeaturesSectionParser()
    protected crystallographicAndCoordinateTransformationSectionParser = new CrystallographicAndCoordinateTransformationSectionParser()
    protected coordinateSectionParser: CoordinateSectionParser
    protected connectivitySectionParser = new ConnectivitySectionParser()
    protected bookkeepingSectionParser = new BookkeepingSectionParser()

    constructor(excludeDummy: boolean = true, excludeAnisou: boolean = true) {
        super();
        this.coordinateSectionParser = new CoordinateSectionParser(excludeDummy, excludeAnisou)
    }

    protected parsers(): Parser<any>[] {
        return [
            this.titleSectionParser,
            this.primaryStructureSectionParser,
            this.heterogenSectionParser,
            this.secondaryStructureSectionParser,
            this.connectivityAnnotationSectionParser,
            this.miscellaneousFeaturesSectionParser,
            this.crystallographicAndCoordinateTransformationSectionParser,
            this.coordinateSectionParser,
            this.connectivitySectionParser,
            this.bookkeepingSectionParser,
        ];
    }

    parse(): Pdb {
        return new Pdb(
            this.titleSectionParser.parse(),
            this.primaryStructureSectionParser.parse(),
            this.heterogenSectionParser.parse(),
            this.secondaryStructureSectionParser.parse(),
            this.connectivityAnnotationSectionParser.parse(),
            this.miscellaneousFeaturesSectionParser.parse(),
            this.crystallographicAndCoordinateTransformationSectionParser.parse(),
            this.coordinateSectionParser.parse(),
            this.connectivitySectionParser.parse(),
            this.bookkeepingSectionParser.parse(),
        )
    }
}