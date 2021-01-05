import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PersonService } from '../../../core/_services/person.service';
import { BestellVorgang1Dto } from '../../../dtos/BestellVorgang1Dto';
import { KeyValue } from 'src/app/shared/dropdown/dropdown.component';
import { Globals } from 'src/global-constants';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SimpleBestelldetailDto } from 'src/app/dtos/SimpleBestelldetailDto';
import { ArtikelService } from 'src/app/core/_services/artikel.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-bestellvorgang-schritt1',
  templateUrl: './bestellvorgang-schritt1.component.html',
  styleUrls: ['./bestellvorgang-schritt1.component.scss'],
})
export class BestellvorgangSchritt1Component implements OnInit {

  @Input() bestellerKeyValue: KeyValue[] = [];
  @Input() durchfuehrerKeyValue: KeyValue[] = [];

  @Input() selectedBestellerId = -1;
  @Input() selectedDurchfuehrerId = -1;
  @Input() date: Date = new Date();

  @Input() isBestellerValid = true;
  @Input() isDurchfuehrerValid = true;

  @Output() selectedBestellerIdChanged = new EventEmitter<number>();
  @Output() selectedDurchfuehrerIdChanged = new EventEmitter<number>();
  @Output() dateChanged = new EventEmitter<string>();

  // Artikel
  @Input() artikelAdded: SimpleBestelldetailDto[] = [];
  @Output() artikelAddedChanged = new EventEmitter<SimpleBestelldetailDto[]>();

  constructor(private artikelService: ArtikelService, private router: Router, public datepipe: DatePipe) { }

  ngOnInit(): void {
    console.log(this.selectedBestellerId);
    console.log(this.bestellerKeyValue);
    console.log('bestellerid schritt1');
  }

  btnAddArtikelClick(){
    this.router.navigate(['/VerwaltungArtikelDetail']);
  }

  bestellerChanged(keyValue: KeyValue) {
    this.selectedBestellerIdChanged.emit(keyValue.key);
  }

  durchfuehrerChanged(keyValue: KeyValue) {
    this.selectedDurchfuehrerIdChanged.emit(keyValue.key);
  }

  dateChangedEvent(event: string) {
    // console.log("DateChanged: " + event);
    this.dateChanged.emit(event);
  }

  artikelAddedEvent(artikel: SimpleBestelldetailDto[]) {
    this.artikelAddedChanged.emit(artikel);
    // console.log('ArtikelAddedEvent: Bestellvorgangschritt 1');
    // console.log(artikel);
  }

  artikelSearchFieldTextChanged(value: string) {
    this.artikelService.notifySearchValueChanged(value);
  }
}
