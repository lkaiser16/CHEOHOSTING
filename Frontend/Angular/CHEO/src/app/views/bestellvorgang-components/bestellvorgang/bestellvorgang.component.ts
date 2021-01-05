import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../../core/_services/login.service';
import { BestellungService } from '../../../core/_services/bestellung.service';
import { BestellungDto } from '../../../dtos/BestellungDto';
import { KeyValue } from 'src/app/shared/dropdown/dropdown.component';
import { PersonenDto } from 'src/app/dtos/PersonenDto';
import { PersonService } from 'src/app/core/_services/person.service';
import { FormControl } from '@angular/forms';
import { KostenstelleDto } from 'src/app/dtos/KostenstelleDto';
import { KostenstellenService } from 'src/app/core/_services/kostenstellen.service';
import { ArtikelService } from 'src/app/core/_services/artikel.service';
import { SimpleBestelldetailDto } from 'src/app/dtos/SimpleBestelldetailDto';
import { WarenkorbDto } from 'src/app/dtos/WarenkorbDto';
import { BestellVorgang1Dto } from 'src/app/dtos/BestellVorgang1Dto';
import { BestellVorgang2Dto } from 'src/app/dtos/BestellVorgang2Dto';
import { UserService } from 'src/app/core/_services/user.service';
import { BehaviorSubject } from 'rxjs';
import { SimpleBestellungDto } from 'src/app/dtos/SimpleBestellungDto';
import { UserDto } from 'src/app/dtos/UserDto';
import { Globals } from 'src/global-constants';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bestellvorgang',
  templateUrl: './bestellvorgang.component.html',
  styleUrls: ['./bestellvorgang.component.scss'],
})

export class BestellvorgangComponent implements OnInit {

  bestellungId = -1;

  //#region Input Validierung
  isBestellerValid = true;
  isDurchfuehrerValid = true;
  isKostenstelleValid = true;
  isStatusValid = true;
  isBestellungsNummberValid = true;
  //#endregion

  //#region Bestellvorgang 1 Komponente:
  // KeyValues:
  bestellerKeyValue: KeyValue[] = [];
  durchfuehrerKeyValue: KeyValue[] = [];


  // Input and Postrequest Data Bestellvorgang 1
  bestellerId = -1;
  durchfuehrerId = -1;
  date: Date = new Date();

  // Hinzugefügte Artikel Komponente
  addedArtikel: SimpleBestelldetailDto[] = [];
  //#endregion Bestellvorgang 1 Komponente

  ////#region  Bestellvorgang 2 Komponente:

  // KeyValues:
  kostenstelleKeyValue: KeyValue[] = [];
  zugehoerigkeitKeyValue: KeyValue[] = [];
  statusKeyValue: KeyValue[] = [];

  // Input and Postrequest Data Bestellvorgang 2
  kostenstellenId = -1;
  zugehoerigkeitId = -1;
  statusId = 1;

  sapNummer: string;
  angebotsNummer: string;
  bestellungsNummer: string;
  lieferDate: Date = new Date();
  //#endregion


  // Allgemein:
  stepOneActive = true;
  stepTwoActive = false;
  stepTwoAlreadyClicked = false;

  personenDtos: PersonenDto[];
  KostenstellenDtos: KostenstelleDto[];

  bestellungEditable = true;

  constructor(
    private personService: PersonService,
    private kostenstellenService: KostenstellenService,
    private artikelService: ArtikelService,
    private bestellService: BestellungService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private bestellungService: BestellungService,
    private globals: Globals,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    const currentUser = JSON.parse(window.localStorage.getItem('currentUser')) as UserDto;
    this.userService.getUserById(currentUser.userId).subscribe(x => {
      currentUser.rechte === 1 ? this.bestellungEditable = true : this.bestellungEditable = false;
    });

    // Bestellvorgang 1 Componente:
    this.loadAndSetData();

    this.setStatusKeyValue();
    this.setZuegehoerigkeitKeyValue();


    // tottest
    // this.addTestArtikel();
    // this.generateTestTryData();

    // Set Step One Active
    this.stepOneActive = true;
  }


  generateTestTryData() {
    this.sapNummer = 'asdfsd';
    this.angebotsNummer = 'asdfsd';
    this.bestellungsNummer = 'asdfsd';


    const bestellerkeydings: KeyValue = {
      key: 1, value: 'Harald'

    };
    const bestellerkeydings2: KeyValue = {
      key: 2, value: 'Sepp'

    };
    this.bestellerKeyValue.push(bestellerkeydings);
    this.bestellerKeyValue.push(bestellerkeydings2);
    this.bestellerId = 4;
    this.durchfuehrerKeyValue.push(bestellerkeydings);
    this.durchfuehrerKeyValue.push(bestellerkeydings2);
    this.durchfuehrerId = 2;


    this.kostenstelleKeyValue.push(bestellerkeydings);
    this.kostenstelleKeyValue.push(bestellerkeydings2);
    this.kostenstellenId = 2;


    this.statusId = 2;


    this.zugehoerigkeitId = 2;

  }
  // testing
  addTestArtikel() {
    const test: SimpleBestelldetailDto = {

      artikelBezeichnung: 'heyho',
      preis: 999,
      artikeld: 21,
      bestellungId: 1,
      kostenstellenId: 1,
      menge: 33,
      rabatt: 'lost',
      lieferantId: 1,
      bestelldetailId: -1,
    };
    this.addedArtikel.push(test);
  }

  //#region Bestellvorgang (Parent)


  loadStepOne() {
    this.stepOneActive = true;
    this.stepTwoActive = false;
  }

  loadStepTwo() {
    this.stepOneActive = false;
    this.stepTwoActive = true;
    this.stepTwoAlreadyClicked = true;
  }

  PostWarenKorb() {

    console.log('POST WARENKORB    >>>>>> ' + this.bestellungId);

    const currentBearbeiterId = this.userService.getCurrentUser().personId;
    const bestellvorgang1Dto: BestellVorgang1Dto = {
      bestellerId: this.bestellerId,
      date: this.date,
      durchfuehrerId: this.durchfuehrerId
    };
    const bestellvorgang2Dto: BestellVorgang2Dto = {
      angebotsnummer: this.angebotsNummer,
      bestellnummer: this.bestellungsNummer,
      kostenstellenId: this.kostenstellenId,
      letzterBearbeiterId: currentBearbeiterId,
      lieferdatum: this.lieferDate,
      sapNummer: this.sapNummer,
      status: this.statusKeyValue.find(x => x.key === this.statusId).value,
      zugehoerigkeit: this.zugehoerigkeitId !== -1 ? this.zugehoerigkeitKeyValue.find(x => x.key === this.zugehoerigkeitId).value : null,

    };

    const warenkorbDto: WarenkorbDto = {
      bestellungId: this.bestellungId,
      bestellVorgang1Dto: bestellvorgang1Dto,
      bestellVorgang2Dto: bestellvorgang2Dto,
      simpleBestelldetailDtos: this.addedArtikel,
    };
    console.log(warenkorbDto);

    if (this.bestellungId === -1 || this.bestellungId === undefined) {
      this.bestellService.postBestellung(warenkorbDto).subscribe(x => this.router.navigate(['/Bestellungsuebersicht']));
    }
    else {
      warenkorbDto.simpleBestelldetailDtos.forEach(x => {
        console.log(x);
        console.log("warenkorb.simplebestelldetailDtos-----------------------")
      });
      this.bestellService.putBestellung(warenkorbDto, this.bestellungId).subscribe(x => this.router.navigate(['/Bestellungsuebersicht']));
    }
  }

  deleteBestellung(bestellungsId: number): void {
    if (bestellungsId !== -1) {
      this.bestellService.deleteBestellung(bestellungsId).subscribe(x => this.router.navigate(['/Bestellungsuebersicht']));
    }
    else {
      this.router.navigate(['/Bestellungsuebersicht']);
    }
  }
  LoadBestellungFromParams(bestellungId: number): void {

    console.log('loadBestellungOfParams');
    console.log(bestellungId);
    this.bestellungService.getWarenkorbById(bestellungId).subscribe(x => this.setAllValues(x));


  }

  setAllValues(bestellung: WarenkorbDto) {
    const bestellvorgang1Dto: BestellVorgang1Dto = bestellung.bestellVorgang1Dto;
    const bestellvorgang2Dto: BestellVorgang2Dto = bestellung.bestellVorgang2Dto;
    const simpleBestelldetailDtos: SimpleBestelldetailDto[] = bestellung.simpleBestelldetailDtos;
    this.bestellungId = bestellung.bestellungId;
    // Bestellvorgang 1:
    this.bestellerId = bestellvorgang1Dto.bestellerId;
    this.durchfuehrerId = bestellvorgang1Dto.durchfuehrerId;
    this.date = bestellvorgang1Dto.date;

    // Bestellvorgang 2:
    this.kostenstellenId = bestellvorgang2Dto.kostenstellenId;
    // tslint:disable-next-line: max-line-length
    this.zugehoerigkeitId = bestellvorgang2Dto.zugehoerigkeit ? this.zugehoerigkeitKeyValue.find(x => x.value === bestellvorgang2Dto.zugehoerigkeit).key : -1;
    this.statusId = this.statusKeyValue.find(x => x.value === bestellvorgang2Dto.status).key;
    console.log('STATUSSSSS ' + this.statusId);

    this.sapNummer = bestellvorgang2Dto.sapNummer;
    this.angebotsNummer = bestellvorgang2Dto.angebotsnummer;
    this.bestellungsNummer = bestellvorgang2Dto.bestellnummer;
    this.lieferDate = bestellvorgang2Dto.lieferdatum;

    // SimpleBestellDetailDtos / hinzugefügteArtikel

    // this.addedArtikel = simpleBestelldetailDtos;
    simpleBestelldetailDtos.forEach(x => this.artikelService.nextMessage(x));

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    // let test: SimpleBestelldetailDto = {
    //   artikeld: -1,
    //   bestellungId: -1,
    //   kostenstellenId: -1,
    //   menge: 1,
    //   rabatt: 'test',
    //   artikelBezeichnung: 'initial_artikel',
    //   preis: 5,
    //   lieferantenId: -1,
    // };
    this.artikelService.sharedMessage = new BehaviorSubject<SimpleBestelldetailDto>(this.artikelService.test);


    this.artikelService.artikelAddedMessage = new BehaviorSubject(this.artikelService.test2);

    this.artikelService.searchValueChangedMessage = new BehaviorSubject('init_search');

  }
  //#endregion

  loadAndSetData() {
    this.personService.getAllPersonen().subscribe((personen) => {
      this.personenDtos = personen as PersonenDto[];
      this.personenDtos.forEach(x => {
        this.bestellerKeyValue.push(new KeyValue(x.personId, `${x.vorname} ${x.nachname}`));
      });
      // tslint:disable-next-line: no-shadowed-variable
      this.personService.getPersonsByUserId(1).subscribe((personen) => {
        this.personenDtos = personen as PersonenDto[];
        this.personenDtos.forEach(x => {
          this.durchfuehrerKeyValue.push(new KeyValue(x.personId, `${x.vorname} ${x.nachname}`));
        });
        this.kostenstellenService.getAllKostenstellen().subscribe((kostenstellen) => {
          this.KostenstellenDtos = kostenstellen as KostenstelleDto[];
          this.KostenstellenDtos.forEach(x => {
            this.kostenstelleKeyValue.push(new KeyValue(x.kostenstellenId, x.nummer));
          });
          this.route.params.subscribe((params: Params) => {
            this.bestellungId = params.BestellungsNr;
            if (this.bestellungId !== undefined && this.bestellungId !== -1) {
              this.LoadBestellungFromParams(this.bestellungId);
            }
          });
        });
      });
    });
  }

  //#region BestellVorgang1

  // Bestellvorgang 1 Componente OnChanges:
  selectedBestellerIdChanged(bestellerId: number) {
    this.bestellerId = bestellerId;
  }
  selectedDurchfuehrerIdChanged(durchfuehrerId: number) {
    this.durchfuehrerId = durchfuehrerId;
    // console.log(this.durchfuehrerId);

  }
  dateChanged(date: Date) {
    this.date = date;
    // console.log('DateChanged: ');
    // console.log(this.date);

  }
  // Artikel
  artikelAddedChanged(artikel: SimpleBestelldetailDto[]) {
    // console.log('bestellvorgang.component: artikelAddedChanged');
    // console.log(artikel);
    this.addedArtikel = artikel;

  }

  //#endregion

  //#region BestellVorgang2
  // Bestellvorgang 2 Componente Getter:

  setStatusKeyValue() {
    this.statusKeyValue = [
      { value: 'Aufgegeben', key: 1 },
      { value: 'In Bearbeitung', key: 2 },
      { value: 'Bestellt', key: 3 },
      { value: 'Geliefert', key: 4 },
      // { value: 'Abgeschlossen', key: 5 },
      // { value: 'In FiBu übertragen', key: 6 },
    ];
  }

  setZuegehoerigkeitKeyValue() {
    this.zugehoerigkeitKeyValue = [new KeyValue(1, 'Intern'), new KeyValue(2, 'Extern')];
  }

  saveBestellung() {
    if (this.checkInput()) {
      this.PostWarenKorb();
    }
  }

  deleteBestellungClicked() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleteItem') {
        this.deleteBestellung(this.bestellungId);
      }
    });
  }

  checkInput() {

    if (this.bestellerId !== -1) { this.isBestellerValid = true; }
    else { this.isBestellerValid = false; }

    if (this.durchfuehrerId !== -1) { this.isDurchfuehrerValid = true; }
    else { this.isDurchfuehrerValid = false; }

    if (this.kostenstellenId !== -1) { this.isKostenstelleValid = true; }
    else { this.isKostenstelleValid = false; }

    if (this.statusId !== -1) { this.isStatusValid = true; }
    else { this.isStatusValid = false; }

    if (this.bestellungsNummer !== null && this.bestellungsNummer !== undefined) { this.isBestellungsNummberValid = true; }
    else { this.isBestellungsNummberValid = false; }

    if (this.isBestellerValid && this.isDurchfuehrerValid && this.isKostenstelleValid && this.isStatusValid && this.isBestellungsNummberValid) {
      console.log('TRUE');
      return true;
    }
    else {
      console.log('FALSE');
      return false;
    }


  }

  // Bestellvorgang 2 Componente OnChanges:
  sapNummerChanged(value: string) {
    this.sapNummer = value;
  }
  angebotsNummerChanged(value: string) {
    this.angebotsNummer = value;
  }
  bestellungsNummerChanged(value: string) {
    this.bestellungsNummer = value;
  }
  lieferDateChanged(value: Date) {
    this.lieferDate = value;
    this.statusId = 4;
  }
  kostenstellenIdChanged(value: number) {
    this.kostenstellenId = value;
  }
  zugehoerigkeitsIdChanged(value: number) {
    this.zugehoerigkeitId = value;
  }
  statusIdChanged(value: number) {
    this.statusId = value;
    console.log('statusIdChange:' + value);
  }

  //#endregion
}
