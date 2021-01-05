import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../core/_services/login.service';
import { BestellauftragService } from '../../core/_services/bestellauftrag.service';
import { BestellauftragDto } from '../../dtos/BestellauftragDto';
import { UserService } from '../../core/_services/user.service';
import { UserDto } from '../../dtos/UserDto';
import { BestellauftragChemikalieDto } from 'src/app/dtos/BestellauftragChemikalieDto';
import { KeyValue } from 'src/app/shared/dropdown/dropdown.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-bestellauftrag-anlegen',
  templateUrl: './bestellauftrag-anlegen.component.html',
  styleUrls: ['./bestellauftrag-anlegen.component.scss'],
})
export class BestellauftragAnlegenComponent implements OnInit {
  bestellauftragId = -1;
  status = 'Aufgegeben';
  bestellzusatz;
  selectedStatus: number = 1;
  currentUser: UserDto;
  @ViewChild('sidenav') sidenav: any;
  remainingText = 0;
  statusKeyValue = [
    { value: 'Aufgegeben', key: 1 },
    { value: 'Bestellt', key: 2 },
    { value: 'Geliefert', key: 3 },
  ];
  // tslint:disable-next-line: ban-types
  chemikalien: BestellauftragChemikalieDto[] = [
    this.initialBestellauftragChemikalie(),
  ];

  // tslint:disable-next-line: max-line-length
  constructor(
    private router: Router,
    public loginService: LoginService,
    public bestellAuftragService: BestellauftragService,
    public userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    // console.log(loginService.getCurrentUser());
    // einkommentieren um Loginfunktion zu aktivieren
    // if (loginService.getCurrentUser() == null) {
    //   this.router.navigate(['/Login']);
    // }
  }

  myControl = new FormControl();
  options: string[] = ['Aufgegeben', 'Angenommen', 'Abgelehnt', 'Erledigt'];

  filteredOptions: Observable<string[]>;
  defaultBesteller;
  date = null;

  saveButtonClicked = false;
  changesAllowed = true;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );

    this.route.params.subscribe(
      (params: Params) => {
        if (params.BestellauftragId !== undefined) {
          this.bestellauftragId = +params.BestellauftragId; console.log(this.bestellauftragId);
        }

      }
    );
    if (this.bestellauftragId !== -1 && this.bestellauftragId !== undefined) {
      this.loadBestellungsAuftragbyId(this.bestellauftragId);
    }

    this.currentUser = this.userService.getCurrentUser();
  }
  loadBestellungsAuftragbyId(bestellauftragId: number) {
    let thisBestellungsAuftrag: BestellauftragDto;
    this.bestellAuftragService.getBestellauftragById(bestellauftragId).subscribe(data => {
      thisBestellungsAuftrag = data;
      console.log(thisBestellungsAuftrag);
      this.status = thisBestellungsAuftrag.status;
      this.selectedStatus = this.statusKeyValue.filter(x => x.value === thisBestellungsAuftrag.status)[0].key;
      this.bestellzusatz = thisBestellungsAuftrag.auftragsinhalt;
      this.date = thisBestellungsAuftrag.datum;
      this.remainingText = this.bestellzusatz === undefined ? 0 : this.bestellzusatz?.length;
      this.chemikalien = thisBestellungsAuftrag.bestellauftragChemikalie;
    });

  }



  statusChanged(value: KeyValue) {
    this.status = value.value;
  }

  updateChemikalien(chemikalien) {
    this.chemikalien = chemikalien;
    console.log(chemikalien);
    // Datenbank implementierung fehlt noch
    console.log(this.chemikalien);
  }

  valueChange() {
    this.remainingText = this.bestellzusatz.length;
  }

  toggleCloseSideMenu(event) {
    this.sidenav.toggle();
  }

  toggleSideMenu() {
    this.sidenav.toggle();
  }

  logoutClick() {
    this.loginService.logout();
    this.router.navigate(['/Login']);
  }

  displayFn(user: string): string {
    return user ? user : '';
  }

  bestellungauftragSpeichern() {
    // console.log(this.options[1]);
    console.log(this.bestellauftragId);
    console.log(this.status);
    console.log(this.saveButtonClicked);
    console.log(this.chemikalien)

    if (this.validateUserInput() === true) {

      // TODO Chemikalien Table in Datenbank speichern

      if (this.status === this.options[1] && this.currentUser.rechte === 0) {
        this.changesAllowed = false;
      } else {
        this.changesAllowed = true;
      }

      if (this.saveButtonClicked === false && this.changesAllowed) {
        this.saveButtonClicked = true;
        if (this.bestellauftragId === -1 || this.bestellauftragId === undefined || isNaN(this.bestellauftragId)) {
          // console.log(this.status);
          // console.log(this.bestellzusatz);
          // console.log('bestellauftrag anlegen' + JSON.stringify(this.chemikalien));
          const data: BestellauftragDto = this.createBestellauftragDto(-1);
          this.bestellAuftragService.postBestellauftrag(data).subscribe(x => {
            console.log('returnvalue postBestellauftrag');
            console.log(x);
            this.status = '';
            this.bestellzusatz = '';

            this.router.navigate(['/Bestellauftragsuebersicht']);

          },
            (error) => (this.saveButtonClicked = false)
          );
        } else {
          const data: BestellauftragDto = this.createBestellauftragDto(
            this.bestellauftragId
          );

          this.bestellAuftragService.putBestellauftrag(data).subscribe(
            (x) => {
              console.log(x);
              this.status = '';
              this.bestellzusatz = '';

              this.router.navigate(['/Bestellauftragsuebersicht']);
            },
            (error) => (this.saveButtonClicked = false)
          );
        }
      }
    }
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  bestellungauftragLoeschen() {

    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleteItem') {
        if (this.date === null || this.bestellauftragId === -1) {
        } else {
          if (this.bestellauftragId !== -1) {
            console.log('ich bin da');
            this.bestellAuftragService.deleteBestellauftrag(this.bestellauftragId).subscribe(x => this.router.navigate(['/Bestellauftragsuebersicht']));
          }
        }
      }
    })
  }

  addChemikalienRow() {
    this.chemikalien.push(new BestellauftragChemikalieDto());
  }

  createBestellauftragDto(currentbestellauftragId: number) {
    const data: BestellauftragDto = {
      bestellauftragId: currentbestellauftragId,
      auftragsinhalt: this.bestellzusatz,
      personId: this.currentUser.personId,
      status: this.status,
      bestellauftragChemikalie: this.chemikalien,
      datum: new Date(),
    };
    return data;
  }
  initialBestellauftragChemikalie() {
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


  statusValid: boolean = true;

  validateUserInput() {

    if (this.selectedStatus !== null && this.selectedStatus !== undefined) {
      this.statusValid = true;
      return true;
    }
    else {
      this.statusValid = false;
      console.log('Status --> ' + this.statusValid)
      return false;
    }
  }
}
