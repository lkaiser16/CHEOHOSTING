import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../core/_services/login.service';
import { DashBoardService } from '../../core/_services/dashboard.service';
import { UserService } from '../../core/_services/user.service';
import { UserDto } from '../../dtos/UserDto';
import { PersonService } from '../../core/_services/person.service';
import { PersonenDto } from '../../dtos/PersonenDto';
import { CustomDatePipe } from '../../shared/_pipes/CustomDatePipe';
import { getLocaleDateFormat } from '@angular/common';
import { SimpleBestellungDto } from 'src/app/dtos/SimpleBestellungDto';
import { BestellauftragDto } from 'src/app/dtos/BestellauftragDto';
import { BestellungDto } from 'src/app/dtos/BestellungDto';
import { Globals } from 'src/global-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bestelllistenName = '';

  Vorname = 'Alexander';
  message: string;

  bestellungen: SimpleBestellungDto[];
  bestellungenColumns = ['bestellungsNummer', 'kostenstellenName', 'lieferantenName', 'letzterBearbeiter', 'bestelldatum', 'status'];
  bestellungenDisplayedHeader = ['Bestellungsnummer', 'Kostenstelle', 'Lieferant', 'Letzter Bearbeiter', 'Bestelldatum', 'Status'];

  bestellauftraege: BestellauftragDto[];
  bestellauftraegeColumns = ['datum', 'personName', 'auftragsinhalt', 'status'];
  bestellauftraegeDisplayedHeader = ['Datum', 'Auftraggeber', 'Auftraginhalt', 'Status'];

  currentUser: UserDto = null;

  toggle = false;

  dataisLoading = true;

  currentPerson: PersonenDto = null;
  // searchValue = 'Test';
  @ViewChild('sidenav') sidenav: any;

  showBestellungsuebersicht = false;
  showBestellauftraege = false;
  constructor(
    private router: Router, public loginService: LoginService, public dashboardService: DashBoardService,
    public userService: UserService, public personService: PersonService, private customDatePipe: CustomDatePipe, public globals: Globals) {
    // console.log(loginService.getCurrentUser());
    // einkommentieren um Loginfunktion zu aktivieren
    // if (loginService.getCurrentUser() == null) {
    //   this.router.navigate(['/Login']);
    // }
  }

  toggleCloseSideMenu(event) {
    this.sidenav.toggle();
  }

  toggleSideMenu() {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
    this.bestelllistenName = this.dashboardService.gettableMessage();
    this.currentUser = this.userService.getCurrentUser();
    this.userService.getUserById(this.currentUser.userId).subscribe(x => {
      this.globals.currentUser = x;
      this.globals.noAdmin = this.globals.currentUser.rechte === 1 ? false : true;
    });

    this.currentPerson = this.personService.getCurrentPerson();

    this.Vorname = this.currentPerson.vorname;

    let currentUser = JSON.parse(window.localStorage.getItem('currentUser')) as UserDto;
    this.userService.getUserById(currentUser.userId).subscribe(x => {
      this.globals.currentUser = x;
      switch (this.globals.currentUser.rechte) {
        case 0:
          this.fillEigeneBestellaufträge();
          break;
        case 1: this.fillOffeneBestellungen(); break;
      }

    });

    // this.getAllData();

    //#region Dummy Daten für Bestellungen

    // this.bestellungen = [];
    // let bestellung = {
    //   BestellNr: "123",
    //   Kostenstelle: "K123",
    //   Lieferant: "Martin",
    //   LetzterBearbeiter: "Ich",
    //   // Bestelldatum: this.customDatePipe.transform(new Date()),
    //   Bestelldatum: new Date().toLocaleString(),
    //   Status: "Aufgegeben"
    // };

    // let bestellung1 = {
    //   BestellNr: "456",
    //   Kostenstelle: "K345",
    //   Lieferant: "Lexi",
    //   LetzterBearbeiter: "Ich",
    //   Bestelldatum: new Date().toLocaleString(),
    //   Status: "Geliefert"
    // };

    // let bestellung2 = {
    //   BestellNr: "678",
    //   Kostenstelle: "1234123",
    //   Lieferant: "Lexi",
    //   LetzterBearbeiter: "Du",
    //   Bestelldatum: new Date().toLocaleString(),
    //   Status: "In FiBu übertragen"
    // };

    // this.bestellungen.push(bestellung);
    // this.bestellungen.push(bestellung1);
    // this.bestellungen.push(bestellung2);
    // this.bestellungen.push(bestellung2);
    // this.bestellungen.push(bestellung2);
    // this.bestellungen.push(bestellung2);
    // this.bestellungen.push(bestellung2);

    //#endregion

    //#region Dummy Daten für Bestellaufträge
    // this.bestellauftraege = [];
    // const bestellauftrag =   {
    //   Datum: new Date().toLocaleString(),
    //   Person: 'Alexander Stefan Edinger',
    //   Auftragsinhalt: '5-Mal Aceton zu je 5Liter Flaschen',
    //   Status: 'Aufgegeben'
    // };

    // const bestellauftrag1 = {
    //   Datum: new Date().toLocaleString(),
    //   Person: 'Alex',
    //   Auftragsinhalt: '5-Mal Aceton zu je 5Liter Flaschen',
    //   Status: 'Abgelehnt'
    // };

    // const bestellauftrag2 = {
    //   Datum: new Date().toLocaleString(),
    //   Person: 'Alex',
    //   Auftragsinhalt: '5-Mal Aceton zu je 5Liter Flaschen',
    //   Status: 'Erledigt'
    // };

    // this.bestellauftraege.push(bestellauftrag);
    // this.bestellauftraege.push(bestellauftrag1);
    // this.bestellauftraege.push(bestellauftrag2);
    // this.bestellauftraege.push(bestellauftrag2);
    // this.bestellauftraege.push(bestellauftrag2);
    // this.bestellauftraege.push(bestellauftrag2);
    // this.bestellauftraege.push(bestellauftrag2);

    // //#endregion
  }




  fillOffeneBestellungen() {

    console.log('filterOffeneBestellungen: HOMECOMPONENT' + this.showBestellungsuebersicht);

    // tslint:disable-next-line: max-line-length
    this.dashboardService.getOffeneBestellugngenList().subscribe(x => {
      console.log(x);
      this.bestellungen = x;
      this.showBestellungsuebersicht = true;
      this.dataisLoading = false;
    });

  }

  fillEigeneBestellaufträge() {
    // tslint:disable-next-line: max-line-length
    this.dashboardService.getAufträgeByPersonId(this.currentUser.personId).subscribe(x => { console.log(x); this.bestellauftraege = x; this.showBestellauftraege = true; this.dataisLoading = false });

  }

  BestellungsUebersichtTableClicked(row: BestellungDto) {
    this.router.navigate(['Bestelldetails', row.bestellungId]);


  }
  BestellungsAuftragTableClicked(row: BestellauftragDto) {
    this.router.navigate(['Bestellauftragdetails', row.bestellauftragId]);

  }




  // receiveMessage($event) {
  //   this.message = $event;
  //   this.bestellungen = $event;
  //   // console.log("öadföasjdflöajsdf"+ JSON.stringify($event));

  // }

}
