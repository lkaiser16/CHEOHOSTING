import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PersonService } from 'src/app/core/_services/person.service';
import { UserService } from 'src/app/core/_services/user.service';
import { PersonenDto } from 'src/app/dtos/PersonenDto';
import { UserDto } from 'src/app/dtos/UserDto';
import { KeyValue } from 'src/app/shared/dropdown/dropdown.component';
import * as forge from 'node-forge';
import { Globals } from '../../../../../global-constants';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-verwaltung-user-detail-view',
  templateUrl: './verwaltung-user-detail-view.component.html',
  styleUrls: ['./verwaltung-user-detail-view.component.scss'],
})
export class VerwaltungUserDetailViewComponent implements OnInit {
  selectedRechte: number;
  rechteKeyValue = [new KeyValue(1, 0), new KeyValue(2, 1)];

  selectedPerson: number;
  personKeyValue = [];

  @Input() user: UserDto = new UserDto();

  userId: number = -1;

  constructor(
    private personService: PersonService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private globals: Globals,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.personService.getAllPersonen().subscribe((x) => {
      x.forEach((y) =>
        this.personKeyValue.push(
          new KeyValue(y.personId, `${y.vorname} ${y.nachname}`)
        )
      );

      this.route.params.subscribe((params: Params) => {
        this.userId = params.UserId;
      });
      if (this.userId !== -1 && this.userId !== undefined) {
        this.loadUserbyId(this.userId);
      }
    });
  }

  loadUserbyId(userId) {
    this.userService.getUserById(userId).subscribe((x) => {
      this.user = x;

      this.selectedPerson = this.personKeyValue.filter(
        (y) => y.key === x.personId
      )[0].key;
      this.selectedRechte = this.rechteKeyValue.filter(
        (y) => y.value === x.rechte
      )[0].key;
    });
  }

  userSpeichern() {
    if (this.validateUserInput()) {
      let userToDb = Object.assign({}, this.user);
      const rsa = forge.pki.publicKeyFromPem(this.globals.publicKey);
      // this.user.passwort = window.btoa(rsa.encrypt(this.user.passwort));
      userToDb.passwort = window.btoa(rsa.encrypt(this.user.passwort));

      console.log('USER ANLEGEN ---> ' + this.user.passwort);

      if (userToDb.userId !== null && userToDb.userId !== undefined) {
        this.userService.putUser(userToDb).subscribe((user) => {
          this.router.navigate(['/VerwaltungUser']);
        });
      } else {
        this.userService.postUser(userToDb).subscribe((user) => {
          this.router.navigate(['/VerwaltungUser']);
        });
      }
    }
  }

  userLoeschen() {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleteItem') {
        if (this.userId !== null && this.userId !== undefined) {
          this.userService.deleteUser(+this.userId).subscribe((x) => {
            this.router.navigate(['/VerwaltungUser']);
          });
        } else {
          this.user = null;
          this.router.navigate(['/VerwaltungUser']);
        }
      }
    });
  }

  rechteChanged(value: KeyValue) {
    if (value === null) {
      this.user.rechte = null;
    } else {
      this.user.rechte = value.value;
    }
  }

  personChanged(value: KeyValue) {
    if (value === null) {
      this.user.personId = null;
    } else {
      this.user.personId = value.key;
    }
  }

  clickChangePassword() {
    let dialogRef = this.dialog.open(PasswordDialogComponent, { data: { userId: this.userId } });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result ${result}`)
    // })
  }

  //#region Input Validierung

  usernameIsValid: boolean = true;
  passwortIsValid: boolean = true;
  rechteIsValid: boolean = true;
  personIsValid: boolean = true;

  validateUserInput() {
    if (this.user.username) this.usernameIsValid = true;
    else this.usernameIsValid = false;

    if (this.user.passwort) this.passwortIsValid = true;
    else this.passwortIsValid = false;

    console.log(this.user.rechte);
    if (this.user.rechte !== null && this.user.rechte !== undefined)
      this.rechteIsValid = true;
    else this.rechteIsValid = false;

    if (this.user.personId) this.personIsValid = true;
    else this.personIsValid = false;

    if (
      this.usernameIsValid &&
      this.passwortIsValid &&
      this.rechteIsValid &&
      this.personIsValid
    ) {
      return true;
    } else {
      return false;
    }
  }

  //#endregion
}
