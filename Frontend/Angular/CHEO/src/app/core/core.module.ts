import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtikelService } from './_services/artikel.service';
import { BestellauftragService } from './_services/bestellauftrag.service';
import { BestellungService } from './_services/bestellung.service';
import { DashBoardService } from './_services/dashboard.service';
import { KostenstellenService } from './_services/kostenstellen.service';
import { LieferantService } from './_services/lieferant.service';
import { LoginService } from './_services/login.service';
import { PersonService } from './_services/person.service';
import { UserService } from './_services/user.service';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ArtikelService,
    BestellauftragService,
    BestellungService,
    DashBoardService,
    KostenstellenService,
    LieferantService,
    LoginService,
    PersonService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class CoreModule { }
