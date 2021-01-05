import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  DoCheck,
} from '@angular/core';
import { VERSION } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../core/_services/login.service';
import { Globals } from '../../../global-constants';
import { UserDto } from '../../dtos/UserDto';
import { PersonService } from '../../core/_services/person.service';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import * as forge from 'node-forge';
import { LocalStorageNotifier } from 'src/app/core/_services/localStorageNotifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
  implements OnInit, OnDestroy, AfterViewInit, DoCheck {
  title = `Angular ${VERSION.full} is rad!`;

  username: string = null;
  password: string = null;

  showError = false;
  errorText: string = null;
  loggedInPerson = null;

  returnUrl: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    public globals: Globals,
    public personService: PersonService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private localStorageNotifier: LocalStorageNotifier
  ) {}

  ngAfterViewInit() {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot?.queryParams?.returnUrl || '/';
  }

  ngDoCheck() {}

  ngOnDestroy() {}

  btnLoginClick() {
    this.loginAndReset();
  }

  inputPasswordKeyDown() {
    this.loginAndReset();
  }

  loginAndReset() {
    if (
      this.stringNullOrEmpty(this.username) &&
      this.stringNullOrEmpty(this.password)
    ) {
      this.errorText = 'Benutzername und Passwort müssen gesetzt werden';
      this.showError = true;
    } else if (this.stringNullOrEmpty(this.username)) {
      this.errorText = 'Benutzername muss gesetzt werden';
      this.showError = true;
    } else if (this.stringNullOrEmpty(this.password)) {
      this.errorText = 'Passwort muss gesetzt werden';
      this.showError = true;
    } else {
      this.errorText = null;
      this.showError = false;
      this.checkIfUserAndPswdValid();

      this.username = null;
      this.password = null;

      document.getElementById('input-username').focus();
    }
  }

  private stringNullOrEmpty(stringToCheck: string): boolean {
    if (stringToCheck === null || stringToCheck === '') {
      return true;
    } else {
      return false;
    }
  }

  checkIfUserAndPswdValid() {

    console.log(this.globals.publicKey);
    const rsa = forge.pki.publicKeyFromPem(this.globals.publicKey);
    let password = window.btoa(rsa.encrypt(this.password));

    console.log('encrypt ---------> ' + password);

    this.authenticationService.login(this.username, password).subscribe(
      (x) => {

        this.loginService.setCurrentPerson(x.personDto).then(x => { });
        this.loginService.setCurrentUser(x.userDto).then(x => { });
        this.localStorageNotifier.notify(x.personDto);
        this.router.navigate(['/Home']);
      },
      (error) => {
        this.errorText = 'Username oder Passwort ist falsch';
        this.showError = true;
      }
    );
  }
}
