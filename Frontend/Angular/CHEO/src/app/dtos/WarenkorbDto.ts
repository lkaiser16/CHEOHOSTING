import { BestellVorgang2Dto } from './BestellVorgang2Dto';
import { BestellVorgang1Dto } from './BestellVorgang1Dto';
import { SimpleBestelldetailDto } from './SimpleBestelldetailDto';
import { BestelldetailDto } from './BestelldetailDto';

export class WarenkorbDto {
    bestellungId: number;
    bestellVorgang1Dto: BestellVorgang1Dto;
    bestellVorgang2Dto: BestellVorgang2Dto;
    simpleBestelldetailDtos: SimpleBestelldetailDto[];

}
