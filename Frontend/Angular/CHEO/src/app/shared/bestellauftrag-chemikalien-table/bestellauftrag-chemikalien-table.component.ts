import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BestellauftragChemikalieDto } from '../../dtos/BestellauftragChemikalieDto';

@Component({
  selector: 'app-bestellauftrag-chemikalien-table',
  templateUrl: './bestellauftrag-chemikalien-table.component.html',
  styleUrls: ['./bestellauftrag-chemikalien-table.component.scss']
})
export class BestellauftragChemikalienTableComponent implements OnInit {

  @Input() chemikalien: BestellauftragChemikalieDto[] = [];

  @Output() chemikalienList: EventEmitter<BestellauftragChemikalieDto[]> = new EventEmitter<BestellauftragChemikalieDto[]>();

  constructor() { }

  ngOnInit(): void {
    const initChemikalie = new BestellauftragChemikalieDto();
    // this.chemikalien.push(initChemikalie);
    console.log(this.chemikalien);
  }

  log() {
    console.log(this.chemikalien);
  }

  addChemikalienRow() {
    const chemikalie = this.createChemikalienEintrag();
    this.chemikalien.push(chemikalie);
    console.log(this.chemikalien);
  }

  chemikalienListChanged() {
    this.chemikalienList.emit(this.chemikalien);
  }

  createChemikalienEintrag() {
    const x: BestellauftragChemikalieDto = {
      name: '',
      bestellauftragId: -1,
      bestellauftragChemikalieId: -1,
      menge: '',
      preis: null,
      reinheit: '',
    };

    return x;
  }

  roundPrice(preis: string) {
    console.log(Math.round((+preis + Number.EPSILON) * 100) / 100)
    return Math.round((+preis + Number.EPSILON) * 100) / 100;
  }
}

export class Chemikalie {
  name: string;
  reinheit: string;
  menge: number;
  stueckpreis: number;
}


