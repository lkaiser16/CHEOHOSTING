import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/_services/login.service';

@Component({
  selector: 'app-verwaltung-home',
  templateUrl: './verwaltung-home.component.html',
  styleUrls: ['./verwaltung-home.component.scss']
})
export class VerwaltungHomeComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;

  constructor(private router: Router, public loginService: LoginService) {
    // console.log(loginService.getCurrentUser());
    //einkommentieren um Loginfunktion zu aktivieren
    // if (loginService.getCurrentUser() == null) {
    //   this.router.navigate(['/Login']);
    // }
  }

  toggleCloseSideMenu(event){
    this.sidenav.toggle();
  }

  toggleSideMenu(){
    this.sidenav.toggle();
  }

  ngOnInit(): void {

  }

  logoutClick()
  {
    this.loginService.logout();
    this.router.navigate(['/Login']);
  }

}
