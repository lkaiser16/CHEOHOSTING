import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ArtikelService } from '../../../core/_services/artikel.service';
import { SimpleArtikelDto } from '../../../dtos/SimpleArtikelDto';
import { ArtikelDto } from 'src/app/dtos/ArtikelDto';
import { asapScheduler } from 'rxjs';
import { SimpleBestelldetailDto } from 'src/app/dtos/SimpleBestelldetailDto';

@Component({
  selector: 'app-table-artikel',
  templateUrl: './table-artikel.component.html',
  styleUrls: ['./table-artikel.component.scss']
})
export class TableArtikelComponent implements OnInit {

  displayedColumns: string[] = [
    'artikelNr',
    'bezeichnung',
    'stueckpreis',
    'button'
  ];
  dataSource!: MatTableDataSource<SimpleArtikelDto>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  allArtikel: SimpleArtikelDto[] = [];
  Vorname = 'Alexander';
  Nachname = 'Edinger';
  artikel: SimpleArtikelDto[] = [];
  currentLieferantId!: number;
  currentArtikelList!: SimpleArtikelDto[];
  //  = {
  //   artikelId: -1,
  //   artikelNr: "asd",
  //   preis:5.99,
  //   Bezeichnung: 'Aceton',
  // };

  constructor(private artikelService: ArtikelService) {



  }

  ngOnInit() {
    // test: SimpleBestelldetailDto = {
    //   artikeld: -1,
    //   bestellungId: -1,
    //   kostenstellenId: -1,
    //   menge: 1,
    //   rabatt: 'test',
    //   artikelBezeichnung: 'initial_artikel',
    //   preis: 5,
    //   };
    // this.proofCurrenLieferantAndFilterArtikel();

    // subscribe to addedArtikel to filter List by ArtikelId and then call searchValuelistener in it
    this.getAllArtikel();



    const test: SimpleArtikelDto = {
      artikelId: 1,
      artikelNr: 'axdf',
      bezeichnung: 'asdf',
      preis: 345,
      lieferantId: 1,
    };
    const test2: SimpleArtikelDto = {
      artikelId: 22,
      artikelNr: '2',
      bezeichnung: '2',
      preis: 222,
      lieferantId: 2,
    };
    // this.artikel.push(test);
    // this.artikel.push(test2);

    this.dataSource = new MatTableDataSource(this.artikel);


  }
  SetCurrentLieferantId(addedArtikel: SimpleBestelldetailDto[]) {
    console.log('SetCurrentLieferantId');
    // console.log(this.allArtikel);
    console.log(addedArtikel);
    if (addedArtikel[0] && addedArtikel[0].artikelBezeichnung !== 'initial_artikel') {
      // console.log(addedArtikel[0]);
      this.currentLieferantId = addedArtikel[0].lieferantId;
      console.log('Lieferant set to:' + this.currentLieferantId);
    }
    else {
      this.currentLieferantId = -1;
    }
  }
  FilterArtikelByLieferantId() {
    console.log('FilterArtikelByLieferantId');
    if (this.currentLieferantId !== -1) {

      this.artikel = this.artikel.filter(x => x.lieferantId === +this.currentLieferantId);
      this.dataSource = new MatTableDataSource(this.artikel);
    }
    else {
      this.artikel = this.allArtikel;
      this.dataSource = new MatTableDataSource(this.artikel);

    }
    // set currentArtikelList to filter when Search Notifier Calls (filterAllArtikel())
    this.currentArtikelList = this.artikel;

  }

  click() {
    console.log('Test');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllArtikel() {
    this.artikelService.getAllArtikel().subscribe(data => {
      // console.log(data);
      this.artikel = data;
      this.allArtikel = this.artikel;
      this.dataSource = new MatTableDataSource(this.artikel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.artikel);
      this.applyNotifySubscriber(); // Starts to search for changes in addedList
    });
  }

  getRecord(row: any) {
    // console.log(row);
    console.log('table-artikel.component:getRecord');
    // console.log(this.allArtikel);
    this.sendMessage(this.parseRowToSimpleBestelldetail(row));
  }

  sendMessage(data: SimpleBestelldetailDto) {

    this.artikelService.nextMessage(data);

  }
  parseRowToSimpleBestelldetail(row: ArtikelDto): SimpleBestelldetailDto {
    const simpleBestellDto: SimpleBestelldetailDto = {
      bestelldetailId: -1,
      artikelBezeichnung: row.bezeichnung,
      artikeld: row.artikelId,
      bestellungId: -1,
      preis: row.preis,
      kostenstellenId: -1,
      menge: 1,
      rabatt: '',
      lieferantId: row.lieferantId,
    };

    return simpleBestellDto;
  }

  applyNotifySubscriber() {
    this.artikelService.artikelAddedMessage.subscribe(x => { this.SetCurrentLieferantId(x); this.FilterArtikelByLieferantId(); });
    this.artikelService.searchValueChangedMessage.subscribe(x => this.filterAllArtikel(x));
  }
  filterAllArtikel(ev: string): void {
    if (!(ev === 'init_search')) {
      const searchValue = ev;
      if (searchValue === null || searchValue === '') {
        this.artikel = this.currentArtikelList;
      }
      else {
        console.log("ich suche geradeeeeeeeeeeeeeeeeeeeeeeeeeee");

        this.artikel = this.currentArtikelList.filter(x => x.artikelNr.toLowerCase().includes(searchValue.toLowerCase()));
        console.log(this.artikel);
        // this.dataSource.data.filter(x => x.artikelNr.toLowerCase().includes(searchValue.toLowerCase()));

      }
      // console.log('asdf' + searchValue + 'asd');
      this.dataSource = new MatTableDataSource(this.artikel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }

  }

  // proofCurrenLieferantAndFilterArtikel() { //called when adding a new Artikel, on init and after reading all Artikels

  //   console.log("proofCurrenLieferantAndFilterArtikel");
  //   console.log(this.allArtikel);
  //   this.initAllArtikel = this.artikel;

  //   if (this.allArtikel[0] !== undefined) {
  //     const currentLieferantenId = this.allArtikel[0].lieferantenId;
  //     console.log("proofCurrenLieferantAndFilterArtikel");
  //     const filteredArtikel = this.artikel.filter(x => x.lieferantenId === currentLieferantenId);
  //     this.artikel = filteredArtikel;
  //     this.dataSource = new MatTableDataSource(this.artikel);


  //   }
  //   else {
  //     this.dataSource = new MatTableDataSource(this.initAllArtikel);

  //   }
  // }


}
