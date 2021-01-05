import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BestellauftragService } from 'src/app/core/_services/bestellauftrag.service';
import { BestellauftragDto } from 'src/app/dtos/BestellauftragDto';
import { LoginService } from '../../core/_services/login.service';

@Component({
  selector: 'app-bestellauftrags-uebersicht',
  templateUrl: './bestellauftrags-uebersicht.component.html',
  styleUrls: ['./bestellauftrags-uebersicht.component.scss']
})
export class BestellauftragsUebersichtComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;

  bestellauftraegeColumns = ['datum', 'personName', 'auftragsinhalt', 'status'];
  bestellauftraegeDisplayedHeader = ['Datum', 'Auftraggeber', 'Auftraginhalt', 'Status'];
  bestellauftraege: BestellauftragDto[];
  showBestellauftraege = false;
  dataisLoading = true;

  constructor(private router: Router, public loginService: LoginService, private bestellAuftragsService: BestellauftragService) { }


  toggleCloseSideMenu(event) {
    this.sidenav.toggle();
  }

  toggleSideMenu() {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
    // this.bestellauftraege = [];
    // let bestellauftrag = {
    //   Datum: new Date().toLocaleString(),
    //   Person: "Alexander Stefan Edinger",
    //   Auftragsinhalt: '5-Mal Aceton zu je 5Liter Flaschen',
    //   Status: "Aufgegeben"
    // };

    // let bestellauftrag1 = {
    //   Datum: new Date().toLocaleString(),
    //   Person: "Alex",
    //   Auftragsinhalt: '5-Mal Aceton zu je 5Liter Flaschen',
    //   Status: "Abgelehnt"
    // };

    // let bestellauftrag2 = {
    //   Datum: new Date().toLocaleString(),
    //   Person: "Alex",
    //   Auftragsinhalt: '5-Mal Aceton zu je 5Liter Flaschen',
    //   Status: "Erledigt"
    // };

    // this.bestellauftraege.push(bestellauftrag);
    // this.bestellauftraege.push(bestellauftrag1);
    // this.bestellauftraege.push(bestellauftrag2);
    // this.bestellauftraege.push(bestellauftrag2);
    // this.bestellauftraege.push(bestellauftrag2);
    // this.bestellauftraege.push(bestellauftrag2);
    // this.bestellauftraege.push(bestellauftrag2);

    this.getAllBestellaufträge();


  }

  logoutClick() {
    this.loginService.logout();
    this.router.navigate(['/Login']);
  }

  getAllBestellaufträge() {
    this.bestellAuftragsService.getAllBestellauftrag().subscribe(x => {
      this.bestellauftraege = x;
      this.showBestellauftraege = true;
      this.dataisLoading = false;
    });
  }
  tableRowClicked(row: BestellauftragDto) {
    // console.log("bestelllauftragsübersicht:RowClicked" + JSON.stringify(row));
    this.router.navigate(['Bestellauftragdetails', row.bestellauftragId]);

  }

}
