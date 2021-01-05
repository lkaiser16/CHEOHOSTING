import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../../core/_services/login.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/core/_services/user.service';
import { Globals } from 'src/global-constants';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;
  @Input() showButtons = false;
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter();

  toggle = false;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService, private globals: Globals) { }

  ngOnInit(): void {
  }

  toggleCloseSideMenu(event) {
    this.sidenav.toggle();
  }

  toggleSideMenu() {
    this.toggleMenu.emit(true);
  }

  logoutClick() {
    this.loginService.logout();
    this.router.navigate(['/Login']);
  }

  checkRoute(): boolean {
    if (location.pathname !== '/Login') {
      return true;
    }
    else {
      return false;
    }
  }

  clickLogo() {
    if (this.checkRoute()) {
      this.router.navigate(['/Home']);
    }
  }

  backButtonClick(): void {
    this.location.back();
  }
}
