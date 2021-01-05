import { BestellauftragChemikalieDto } from './BestellauftragChemikalieDto';

export class BestellauftragDto {
    bestellauftragId: number;
    personId: number;
    status: string;
    auftragsinhalt: string;
    datum: Date;
    bestellauftragChemikalie: BestellauftragChemikalieDto[];

}
