import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MaterialModulesModule } from '../material-modules/material-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VerwaltungHomeComponent } from './verwaltung/verwaltung-home/verwaltung-home.component';
import { BestellungsuebersichtComponent } from './bestellungsuebersicht/bestellungsuebersicht.component';
import { BestellvorgangComponent } from './bestellvorgang-components/bestellvorgang/bestellvorgang.component';
import { BestellvorgangSchritt1Component } from './bestellvorgang-components/bestellvorgang-schritt1/bestellvorgang-schritt1.component';
import { BestellvorgangSchritt2Component } from './bestellvorgang-components/bestellvorgang-schritt2/bestellvorgang-schritt2.component';
import { BestellauftragsUebersichtComponent } from './bestellauftrags-uebersicht/bestellauftrags-uebersicht.component';
import { ReportComponent } from './report/report.component';
import { BestellauftragAnlegenComponent } from './bestellauftrag-anlegen/bestellauftrag-anlegen.component';
import { VerwaltungLieferantComponent } from './verwaltung/verwaltung-lieferant/verwaltung-lieferant.component';
import { VerwaltungKostenstelleComponent } from './verwaltung/verwaltung-kostenstelle/verwaltung-kostenstelle.component';
import { VerwaltungArtikelComponent } from './verwaltung/verwaltung-artikel/verwaltung-artikel.component';
import { VerwaltungArtikelDetailViewComponent } from './verwaltung/detail-views/verwaltung-artikel-detail-view/verwaltung-artikel-detail-view.component';
import { VerwaltungKostenstelleDetailViewComponent } from './verwaltung/detail-views/verwaltung-kostenstelle-detail-view/verwaltung-kostenstelle-detail-view.component';
import { VerwaltungLieferantDetailViewComponent } from './verwaltung/detail-views/verwaltung-lieferant-detail-view/verwaltung-lieferant-detail-view.component';
import { VerwaltungUserDetailViewComponent } from './verwaltung/detail-views/verwaltung-user-detail-view/verwaltung-user-detail-view.component';
import { VerwaltungPersonComponent } from './verwaltung/verwaltung-person/verwaltung-person.component';
import { VerwaltungUserComponent } from './verwaltung/verwaltung-user/verwaltung-user.component';
import { VerwaltungPersonDetailViewComponent } from './verwaltung/detail-views/verwaltung-person-detail-view/verwaltung-person-detail-view.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PasswordDialogComponent } from './verwaltung/detail-views/password-dialog/password-dialog.component';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    VerwaltungHomeComponent,
    BestellungsuebersichtComponent,
    BestellvorgangComponent,
    BestellvorgangSchritt1Component,
    BestellvorgangSchritt2Component,
    BestellauftragsUebersichtComponent,
    ReportComponent,
    BestellauftragAnlegenComponent,
    VerwaltungLieferantComponent,
    VerwaltungKostenstelleComponent,
    VerwaltungArtikelComponent,
    VerwaltungArtikelDetailViewComponent,
    VerwaltungKostenstelleDetailViewComponent,
    VerwaltungLieferantDetailViewComponent,
    VerwaltungUserDetailViewComponent,
    VerwaltungPersonComponent,
    VerwaltungUserComponent,
    VerwaltungPersonDetailViewComponent,
    PasswordDialogComponent,

],
entryComponents:[ PasswordDialogComponent ],
imports: [
    CommonModule,
    MaterialModulesModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    VerwaltungHomeComponent,
    BestellungsuebersichtComponent,
    BestellvorgangComponent,
    BestellvorgangSchritt1Component,
    BestellvorgangSchritt2Component,
    BestellauftragsUebersichtComponent,
    ReportComponent,
    BestellauftragAnlegenComponent,
    VerwaltungLieferantComponent,
    VerwaltungKostenstelleComponent,
    VerwaltungArtikelComponent,
    VerwaltungArtikelDetailViewComponent,
    VerwaltungKostenstelleDetailViewComponent,
    VerwaltungLieferantDetailViewComponent,
    VerwaltungUserDetailViewComponent,
    VerwaltungPersonComponent,
    VerwaltungUserComponent,
    VerwaltungPersonDetailViewComponent,
  ],
  providers: [CurrencyPipe, DatePipe, MatDatepickerModule, { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
]
})
export class ViewsModule { }
