import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/core/_services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Globals } from 'src/global-constants';
import * as forge from 'node-forge';
import { UpdatePasswortDto } from 'src/app/dtos/UpdatePasswortDto';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
})
export class PasswordDialogComponent implements OnInit {
  altesPasswort: string = '';
  neuesPasswort: string = '';
  neuesPasswortWdh: string = '';

  altesPasswortValid: boolean = true;
  neuesPasswortValid: boolean = true;
  neuesPasswortWdhValid: boolean = true;

  validierungsMsgPwdWdh = 'Passwort muss gesetzt werden';
  validierungsMsgAltesPdwKorrekt = 'Passwort muss gesetzt werden';

  constructor(
    private dialogRef: MatDialogRef<PasswordDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private globals: Globals
  ) {}

  ngOnInit() {}

  closeDialog() {
    if (this.checkInput()) {

      const rsa = forge.pki.publicKeyFromPem(this.globals.publicKey);

      let oldPw = window.btoa(rsa.encrypt(this.altesPasswort)).toString();
      let newPw = window.btoa(rsa.encrypt(this.neuesPasswort)).toString();
      let newPwWdh = window.btoa(rsa.encrypt(this.neuesPasswortWdh)).toString();
      
      let updatePasswortDto = new UpdatePasswortDto();
      updatePasswortDto.userId = +this.data.userId;
      updatePasswortDto.oldPassword = oldPw;
      updatePasswortDto.newPassword = newPw;

      this.userService.updateUserPassword(+this.data.userId, updatePasswortDto).subscribe(x => {
        if(x === null){
          this.altesPasswortValid = false;
          this.validierungsMsgAltesPdwKorrekt = 'Altes Passwort ist inkorrekt';
        }
        else {
          this.altesPasswortValid = true;
          this.validierungsMsgAltesPdwKorrekt = 'Passwort muss gesetzt werden';
          this.dialogRef.close();
        }
      });
    }
  }

  checkInput() {
    if (this.altesPasswort) this.altesPasswortValid = true;
    else this.altesPasswortValid = false;

    if (this.neuesPasswort){
      if(this.neuesPasswort === this.neuesPasswortWdh){
        this.neuesPasswortValid = true;
        this.validierungsMsgPwdWdh = 'Passwort muss gesetzt werden';
      }
      else {
        this.validierungsMsgPwdWdh = 'Passwörter müssen übereinstimmen';
        this.neuesPasswortValid = false;
        this.neuesPasswortWdhValid = false;
      }
    } 
    else this.neuesPasswortValid = false;

    if (this.neuesPasswortWdh){
      if(this.neuesPasswort === this.neuesPasswortWdh){
        this.neuesPasswortWdhValid = true;
        this.validierungsMsgPwdWdh = 'Passwort muss gesetzt werden';
      }
      else {
        this.validierungsMsgPwdWdh = 'Passwörter müssen übereinstimmen';
        this.neuesPasswortValid = false;
        this.neuesPasswortWdhValid = false;
      }
    } 
    else this.neuesPasswortWdhValid = false;

    if (
      this.altesPasswortValid &&
      this.neuesPasswortValid &&
      this.neuesPasswortWdhValid
    ) {
      return true;
    } else {
      return false;
    }

    return true;
  }
}
