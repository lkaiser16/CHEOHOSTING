import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PersonService } from 'src/app/core/_services/person.service';
import { PersonenDto } from 'src/app/dtos/PersonenDto';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { KeyValue } from 'src/app/shared/dropdown/dropdown.component';

@Component({
  selector: 'app-verwaltung-person-detail-view',
  templateUrl: './verwaltung-person-detail-view.component.html',
  styleUrls: ['./verwaltung-person-detail-view.component.scss']
})
export class VerwaltungPersonDetailViewComponent implements OnInit {

  selectedZugehoerigkeit: number;
  zugehoerigkeitKeyValue = [new KeyValue(1, 'Intern'), new KeyValue(2, 'Extern')];

  @Input() person: PersonenDto = new PersonenDto();

  personId: number;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.personId = params.PersonId;
    });
    if (this.personId !== -1 && this.personId !== undefined) {
      this.loadArtikelbyId(this.personId);
    }
  }

  loadArtikelbyId(personId) {
    this.personService.getPersonById(personId).subscribe((x) => {
      this.person = x;
      if (x.zugehörigkeit) this.selectedZugehoerigkeit = this.zugehoerigkeitKeyValue.filter(y => y.value === x.zugehörigkeit)[0].key;
      else this.selectedZugehoerigkeit = null;
    });
  }

  personSpeichern() {
    if (this.validateUserInput()) {
      if (this.personId !== null && this.personId !== undefined) {
        this.personService.putPerson(this.person).subscribe((person) => {
          this.router.navigate(['/VerwaltungPerson']);
        });
      } else {
        this.personService.postPerson(this.person).subscribe((person) => {
          this.router.navigate(['/VerwaltungPerson']);
        });
      }
    }
  }

  personLoeschen() {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleteItem') {
        if (this.personId !== null && this.personId !== undefined) {
          this.personService.checkIfPersonIsUsed(+this.personId).subscribe(cannotDelete => {
            if (cannotDelete === true) {
              alert('Person kann nicht gelöscht werden, da sie in einer Bestellung oder einem Bestellauftrag angeführt ist.');
            }
            else {
              this.personService.deletePerson(+this.personId).subscribe((x) => {
                this.router.navigate(['/VerwaltungPerson']);
              });
            }
          });
        }
        else {
          this.person = null;
          this.router.navigate(['/VerwaltungPerson']);
        }
      }
    });
  }

  zugehoerigkeitChanged(value: KeyValue) {
    this.person.zugehörigkeit = value.value;
  }

  //#region Input Validierung

  vornameIsValid: boolean = true;
  nachnameIsValid: boolean = true;
  akNummerIsValid: boolean = true;
  raumnummerIsValid: boolean = true;

  validateUserInput() {

    if (this.person.vorname) this.vornameIsValid = true;
    else this.vornameIsValid = false;

    if (this.person.nachname) this.nachnameIsValid = true;
    else this.nachnameIsValid = false;

    if (this.person.akNummer) this.akNummerIsValid = true;
    else this.akNummerIsValid = false;

    if (this.person.raumnummer) this.raumnummerIsValid = true;
    else this.raumnummerIsValid = false;

    if (this.vornameIsValid && this.nachnameIsValid && this.akNummerIsValid && this.raumnummerIsValid) {
      return true;
    }
    else {
      return false;
    }
  }

  //#endregion
}
