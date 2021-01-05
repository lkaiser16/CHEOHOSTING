import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CHEO';
  currentUser = null;
  hideLogin = false;
  splitscreenActive = true;

  @ViewChild('sidenav') sidenav: any;

  toggleCloseSideMenu(event) {
    this.sidenav.toggle();
  }

  toggleSideMenu() {
    this.sidenav.toggle();
  }

  checkRoute(): boolean {
    if (location.pathname !== '/Login') {
      return true;
    }
    else {
      return false;
    }
  }

}
