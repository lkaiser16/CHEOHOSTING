import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../core/_services/login.service';
import { BestellauftragService } from '../../core/_services/bestellauftrag.service';
import { UserService } from '../../core/_services/user.service';
import { KostenstelleDto } from '../../dtos/KostenstelleDto';
import { KostenstellenService } from '../../core/_services/kostenstellen.service';
import { KeyValue } from 'src/app/shared/dropdown/dropdown.component';
import { ReportService } from 'src/app/core/_services/report.service';
import { saveAs } from 'file-saver';
import { PersonService } from 'src/app/core/_services/person.service';
import { Globals } from 'src/global-constants';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  exportformatValues: string[] = ['CSV', 'JSON'];

  KostenstellenDtos: KostenstelleDto[];
  kostenstellen: string[];
  kostenstellenId = -1;
  exportformat: string;

  selectedPerson = -1;
  personKeyValue = [];

  jahr = -1;

  kostenstelleKeyValue = [];
  exportformatKeyValue = [new KeyValue(1, 'CSV')];


  @ViewChild('sidenav') sidenav: any;

  // tslint:disable-next-line: max-line-length
  constructor(
    private router: Router,
    public loginService: LoginService,
    public bestellAuftragService: BestellauftragService,
    public userService: UserService,
    private kostenstellenService: KostenstellenService,
    private route: ActivatedRoute,
    private reportService: ReportService,
    private personService: PersonService,
    private globals: Globals
  ) {
    // console.log(loginService.getCurrentUser());
    // einkommentieren um Loginfunktion zu aktivieren
    // if (loginService.getCurrentUser() == null) {
    //   this.router.navigate(['/Login']);
    // }
  }

  ngOnInit() {
    this.personService.getAllPersonen().subscribe((x) => {
      x.forEach((y) =>
        this.personKeyValue.push(
          new KeyValue(y.personId, `${y.vorname} ${y.nachname}`)
        )
      );

      this.kostenstellenService.getAllKostenstellen().subscribe((kostenstellen) => {
        this.KostenstellenDtos = kostenstellen as KostenstelleDto[];
        this.kostenstellen = this.KostenstellenDtos.map((a) => `${a.nummer}`);

        // tslint:disable-next-line: no-shadowed-variable
        this.KostenstellenDtos.forEach(x => {
          this.kostenstelleKeyValue.push(new KeyValue(x.kostenstellenId, x.nummer));
        });
      });
    });
  }

  displayFn(user: string): string {
    return user ? user : '';
  }

  getReport() {
    window.open(`${this.globals.URL}/report?kostenstellenId=${this.kostenstellenId}&personId=${this.selectedPerson}&jahr=${this.jahr}`, "_blank");
  }

  logoutClick() {
    this.loginService.logout();
    this.router.navigate(['/Login']);
  }

  toggleCloseSideMenu(event) {
    this.sidenav.toggle();
  }

  toggleSideMenu() {
    this.sidenav.toggle();
  }

  kostenstelleChanged(value) {
    this.kostenstellenId = value.key !== null ? value.key : -1;
  }

  exportformatChanged(value) {
    this.exportformat = value !== null ? value : -1;
  }

  jahrChanged(value){
    this.jahr = value !== null && value !== "" ? value : -1;
  }

  personChanged(value: KeyValue) {
    this.selectedPerson = value !== null ? value.key : -1;
  }
}
