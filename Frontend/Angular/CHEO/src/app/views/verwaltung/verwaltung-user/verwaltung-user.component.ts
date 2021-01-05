import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/_services/user.service';
import { UserDto } from 'src/app/dtos/UserDto';

@Component({
  selector: 'app-verwaltung-user',
  templateUrl: './verwaltung-user.component.html',
  styleUrls: ['./verwaltung-user.component.scss']
})
export class VerwaltungUserComponent implements OnInit {

  user: UserDto[] = [];
  userColumns: string[] = ['username', 'rechte'];
  userDisplayedHeader = ['Username', 'Rechte'];
  loaded = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((x) => {
      this.user = x;
      console.log(this.user);
      this.loaded = true;
    });
  }

  btnUserAnlegen() {
    this.router.navigate(['/VerwaltungUserDetail']);
  }

  userRowClick(row: UserDto) {
    this.router.navigate(['VerwaltungUserDetail', row.userId]);
  }

}
