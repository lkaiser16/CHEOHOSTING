import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { BestellungService } from 'src/app/core/_services/bestellung.service';
import { BestellungDto } from 'src/app/dtos/BestellungDto';
import { BestellVorgang1Dto } from 'src/app/dtos/BestellVorgang1Dto';
import { BestellVorgang2Dto } from 'src/app/dtos/BestellVorgang2Dto';
import { SimpleBestelldetailDto } from 'src/app/dtos/SimpleBestelldetailDto';
import { SimpleBestellungDto } from 'src/app/dtos/SimpleBestellungDto';
import { WarenkorbDto } from 'src/app/dtos/WarenkorbDto';
import { Globals } from 'src/global-constants';
import { LoginService } from '../../core/_services/login.service';
import { BestellvorgangSchritt1Component } from '../bestellvorgang-components/bestellvorgang-schritt1/bestellvorgang-schritt1.component';
import { BestellvorgangSchritt2Component } from '../bestellvorgang-components/bestellvorgang-schritt2/bestellvorgang-schritt2.component';

@Component({
  selector: 'app-bestellungsuebersicht',
  templateUrl: './bestellungsuebersicht.component.html',
  styleUrls: ['./bestellungsuebersicht.component.scss']
})
export class BestellungsuebersichtComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;
  bestellungenColumns = ['bestellungsNummer', 'kostenstellenName', 'lieferantenName', 'letzterBearbeiter', 'bestelldatum', 'status'];
  bestellungenDisplayedHeader = ['Bestellungsnummer', 'Kostenstelle', 'Lieferant', 'Letzter Bearbeiter', 'Bestelldatum', 'Status'];
  bestellungen: SimpleBestellungDto[];
  showBestellungen = false;
  searchReqestURL = 'URL NOT SET';

  dataisLoading = true;
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, public loginService: LoginService, private bestellungService: BestellungService, private globals: Globals) { }


  toggleCloseSideMenu(event) {
    this.sidenav.toggle();
  }

  toggleSideMenu() {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
    this.searchReqestURL = `${this.globals.URL}/Bestellung/searchBestellungen/`;
    this.bestellungen = [];
    const bestellung = {
      BestellNr: '123',
      Kostenstelle: 'K123',
      Lieferant: 'Martin',
      LetzterBearbeiter: 'Ich',
      // Bestelldatum: this.customDatePipe.transform(new Date()),
      Bestelldatum: new Date().toLocaleString(),
      Status: 'Aufgegeben'
    };
    this.getAllBestellungen();


    // const bestellung1 = {
    //   BestellNr: '456',
    //   Kostenstelle: 'K345',
    //   Lieferant: 'Lexi',
    //   LetzterBearbeiter: 'Ich',
    //   Bestelldatum: new Date().toLocaleString(),
    //   Status: 'Geliefert'
    // };

    // const bestellung2 = {
    //   BestellNr: '678',
    //   Kostenstelle: '1234123',
    //   Lieferant: 'Lexi',
    //   LetzterBearbeiter: 'Du',
    //   Bestelldatum: new Date().toLocaleString(),
    //   Status: 'In FiBu übertragen'
    // };

    // this.bestellungen.push(bestellung);
    // this.bestellungen.push(bestellung1);
    // this.bestellungen.push(bestellung2);
    // this.bestellungen.push(bestellung2);
    // this.bestellungen.push(bestellung2);
    // this.bestellungen.push(bestellung2);
    // this.bestellungen.push(bestellung2);

  }

  logoutClick() {
    this.loginService.logout();
    this.router.navigate(['/Login']);
  }

  getAllBestellungen() {
    this.bestellungService.getAllBestellungen().subscribe(x => {
      this.bestellungen = x; this.showBestellungen = true; this.dataisLoading = false;
    });
  }

  bestellungRowClicked(row: BestellungDto) {
    // console.log("bestellungRowclicke: row" + row);
    // this.bestellungService.getWarenkorbById(row.bestellungId).subscribe(x => this.writeClickedBestellungToLocalstorage(x));
    this.navigateToDetailView(row.bestellungId);

  }
  navigateToDetailView(bestellungId: number): void {
    console.log('navToDetailview');
    this.router.navigate(['/Bestelldetails', bestellungId]);
  }

  writeClickedBestellungToLocalstorage(warenkorb: WarenkorbDto) {

    this.writeBestellung1Dto(warenkorb.bestellVorgang1Dto).then(() => {
      this.writeBestellung2Dto(warenkorb.bestellVorgang2Dto).then(() => {
        this.writeArtikelDto(warenkorb.simpleBestelldetailDtos).then(() => {
          console.log('Bestellungsübesicht: writeClickedBestellungToLocalstorage');
          console.log(JSON.parse(localStorage.getItem(this.globals.localstorageBestellvorgang2)));
          this.routeToDetailView();
        });
      });

    });

  }

  writeBestellung1Dto(bestellvorgangSchritt1Component: BestellVorgang1Dto) {
    return Promise.resolve().then(() => {
      localStorage.setItem(this.globals.localstorageBestellvorgang1, JSON.stringify(bestellvorgangSchritt1Component));

    });
  }
  writeBestellung2Dto(bestellvorgangSchritt2Component: BestellVorgang2Dto) {

    return Promise.resolve().then(() => {
      localStorage.setItem(this.globals.localstorageBestellvorgang2, JSON.stringify(bestellvorgangSchritt2Component));

    });
  }
  writeArtikelDto(artikel: SimpleBestelldetailDto[]) {
    return Promise.resolve().then(() => {
      localStorage.setItem(this.globals.localstorageArtikel, JSON.stringify(artikel));

    });
  }

  routeToDetailView() {
    this.router.navigate(['/Bestellvorgang']);
  }

}
