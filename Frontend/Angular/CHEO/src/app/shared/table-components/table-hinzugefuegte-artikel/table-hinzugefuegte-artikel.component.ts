import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, Output, Input, SimpleChange, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BestellungService } from '../../../core/_services/bestellung.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ArtikelService } from '../../../core/_services/artikel.service';
import { SimpleBestelldetailDto } from 'src/app/dtos/SimpleBestelldetailDto';
import { EMPTY } from 'rxjs';

export interface ArtikelTableData {
  name: string;
  menge: number;
  stueckpreis: number;
}

@Component({
  selector: 'app-table-hinzugefuegte-artikel',
  templateUrl: './table-hinzugefuegte-artikel.component.html',
  styleUrls: ['./table-hinzugefuegte-artikel.component.scss']
})
export class TableHinzugefuegteArtikelComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'name',
    'menge',
    'stueckpreis',
    'button'
  ];
  dataSource: MatTableDataSource<SimpleBestelldetailDto>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  Vorname = 'Alexander';
  Nachname = 'Edinger';
  @Input() artikel: SimpleBestelldetailDto[] = [];
  @Output() stepTwoAlreadyClickedChanged = new EventEmitter<boolean>();

  public EMPTY: object = new Object();


  // called when artikel is added or removed --> and at init
  // @Output() artikelAdded = new EventEmitter<SimpleBestelldetailDto[]>();

  constructor(private bestellungsService: BestellungService, public artikelService: ArtikelService) {
    // this.artikel = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // this.getAllBestellungen();



  }

  ngOnChanges(changes: SimpleChange) {
    // console.log("ngOnChanges called");

    // console.log(changes.firstChange);
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    // console.log("ngONinit tablehinzugefüget art")
    // console.log(this.artikel);
    // this.artikelAdded.emit(this.artikel);

    // on rejoining bestellvorgang 1:
    // this.notifyArtikelTable();


    this.dataSource = new MatTableDataSource(this.artikel);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // subscribe to when getting added new Artikel,
    this.artikelService.sharedMessage.subscribe(message => {
      if (message.artikelBezeichnung !== 'initial_artikel') {
        if (!this.artikelAlreadyadded(message)) {
          this.artikel.push(message);
          // notify artikeltable to filter by lieferant

          // console.log(JSON.stringify(message) + "heidiii");
          if (this.artikel.length > 0) {
            this.notifyArtikelTable();

          }

        }
        // this.artikelAdded.emit(this.artikel);

      }
      this.dataSource.data = this.artikel;

    });
    // this.readFromLocalStorate();
  }
  artikelAlreadyadded(message: SimpleBestelldetailDto): boolean {
    console.log('artikelAlreadyadded');
    const derartikel = this.artikel.find(x => x.artikeld === message.artikeld);
    if (derartikel !== undefined) {

      derartikel.menge += 1;


      return true;
    }

    return false;
  }

  click() {
    // console.log('Test');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // getAllBestellungen() {
  //   this.bestellungsService.getAllBestellungen().subscribe(data => {
  //     console.log(data);
  //     this.artikel = data;
  //     this.dataSource = new MatTableDataSource(this.artikel);

  //     console.log(this.artikel);
  //   });
  // }

  getRecord(row) {


    var indexToDelete = this.artikel.indexOf(row);
    this.artikel.splice(indexToDelete, 1);
    this.dataSource.data = this.artikel;
    this.notifyArtikelTable();

    // this.artikelAdded.emit(this.artikel);

  }

  writeToLocalStorage() {

    localStorage.setItem('bestellvorgangArtikel', JSON.stringify(this.artikel));
  }

  readFromLocalStorate(): SimpleBestelldetailDto[] {
    const derartikel = JSON.parse(localStorage.getItem('bestellvorgangArtikel'));
    if (derartikel != null && derartikel !== undefined) {
      this.artikel = derartikel;
      this.dataSource.data = this.artikel;
    }
    return derartikel;
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.writeToLocalStorage();
  }

  notifyArtikelTable() {
    this.artikelService.notifyArtikelAddedMessage(this.artikel);

  }

}

function createNewUser(id: number): SimpleBestelldetailDto {
  return {
    artikelBezeichnung: 'Aceton',
    menge: 4,
    preis: 33.33,
    artikeld: -1,
    bestellungId: -1,
    kostenstellenId: -1,
    rabatt: '',
    bestelldetailId: -1,
    lieferantId: 1,
  };

}
