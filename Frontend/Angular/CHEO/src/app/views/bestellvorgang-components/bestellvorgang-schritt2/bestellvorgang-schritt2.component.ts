import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KostenstellenService } from 'src/app/core/_services/kostenstellen.service';
import { KostenstelleDto } from 'src/app/dtos/KostenstelleDto';
import { KeyValue } from 'src/app/shared/dropdown/dropdown.component';


@Component({
  selector: 'app-bestellvorgang-schritt2',
  templateUrl: './bestellvorgang-schritt2.component.html',
  styleUrls: ['./bestellvorgang-schritt2.component.scss']
})
export class BestellvorgangSchritt2Component implements OnInit {

  @Output() saveBestellungClicked = new EventEmitter<string>();
  @Output() deleteBestellungClicked = new EventEmitter<string>();

  @Input() isStatusValid = true;
  @Input() isKostenstelleValid = true;
  @Input() isBestellungsNummberValid = true;

  //#region Variablen
  // Values Inputs und Outputs
  @Input() sapNummer: string;
  @Input() angebotsNummer: string;
  @Input() bestellungsNummer: string;
  @Input() lieferDate: Date = new Date();

  @Output() sapNummerChanged = new EventEmitter<string>();
  @Output() angebotsNummerChanged = new EventEmitter<string>();
  @Output() bestellungsNummerChanged = new EventEmitter<string>();
  @Output() lieferDateChanged = new EventEmitter<string>();

  // Ids Inputs und Outputs
  @Input() zugehoerigkeitsId = -1;
  @Input() kostenstellenId: number;
  @Input() statusId = 1;

  @Output() zugehoerigkeitsIdChanged = new EventEmitter<number>();
  @Output() kostenstellenIdChanged = new EventEmitter<number>();
  @Output() statusIdChanged = new EventEmitter<number>();

  // KeyValues Inputs
  @Input() statusKeyValue = [];
  @Input() zugehoerigkeitKeyValue = [];
  @Input() kostenstelleKeyValue = [];

  constructor() { }

  ngOnInit(): void { }

  sapNummerChangedEvent(value: string) {
    this.sapNummerChanged.emit(value);
  }

  angebotsnummerChangedEvent(value: string) {
    this.angebotsNummerChanged.emit(value);
  }

  zugehoerigkeitChanged(keyValue: KeyValue) {
    this.zugehoerigkeitsIdChanged.emit(keyValue.key);
  }

  bestellungsnummerChangedEvent(value: string) {
    this.bestellungsNummerChanged.emit(value);
  }

  kostenstelleChanged(keyValue: KeyValue) {
    this.kostenstellenIdChanged.emit(keyValue.key);
  }

  statusChanged(keyValue: KeyValue) {
    console.log(keyValue.key);
    this.statusIdChanged.emit(keyValue.key);
  }

  dateChangedEvent(event: string) {
    this.lieferDateChanged.emit(event);
  }

  saveBestellung() {

    this.saveBestellungClicked.emit('SaveBestellungClicked!');
  }

  deleteBestellung() {
    this.deleteBestellungClicked.emit('deleteClicked');
  }
}