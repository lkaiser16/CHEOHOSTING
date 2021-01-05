export class BestellungDto{
    bestellungId: number;
    bestellungsNummer: string;
    personId: number;
    durchführer: string;
    bestelldatum: Date;
    angebot: string;
    angebotsnummer: string;
    lieferdatum: Date;
    fiBuRechnung: string;
    sapNummer: string;
    status: string;
    letzterBearbeiter: string;
}
