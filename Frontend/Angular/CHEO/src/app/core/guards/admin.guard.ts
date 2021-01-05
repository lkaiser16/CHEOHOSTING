import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/dtos/UserDto';
import { Globals } from 'src/global-constants';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private globals: Globals, private router: Router, private userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const currentUser = JSON.parse(window.localStorage.getItem('currentUser')) as UserDto;
    this.userService.getUserById(currentUser.userId).subscribe(x => {
      this.globals.currentUser = x;
      if (x.rechte !== 1) {
        this.router.navigate(['/Home']);

        return false;

      }
    });
    return true;


  }
}
