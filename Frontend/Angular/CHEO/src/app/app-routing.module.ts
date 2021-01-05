import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { VerwaltungHomeComponent } from './views/verwaltung/verwaltung-home/verwaltung-home.component';
import { BestellungsuebersichtComponent } from './views/bestellungsuebersicht/bestellungsuebersicht.component';
import { BestellvorgangComponent } from './views/bestellvorgang-components/bestellvorgang/bestellvorgang.component';
import { BestellauftragAnlegenComponent } from './views/bestellauftrag-anlegen/bestellauftrag-anlegen.component';
import { BestellauftragsUebersichtComponent } from './views/bestellauftrags-uebersicht/bestellauftrags-uebersicht.component';
import { ReportComponent } from './views/report/report.component';
import { VerwaltungArtikelComponent } from './views/verwaltung/verwaltung-artikel/verwaltung-artikel.component';
import { VerwaltungKostenstelleComponent } from './views/verwaltung/verwaltung-kostenstelle/verwaltung-kostenstelle.component';
import { VerwaltungLieferantComponent } from './views/verwaltung/verwaltung-lieferant/verwaltung-lieferant.component';
import { VerwaltungArtikelDetailViewComponent } from './views/verwaltung/detail-views/verwaltung-artikel-detail-view/verwaltung-artikel-detail-view.component';
import { VerwaltungKostenstelleDetailViewComponent } from './views/verwaltung/detail-views/verwaltung-kostenstelle-detail-view/verwaltung-kostenstelle-detail-view.component';
import { VerwaltungLieferantDetailViewComponent } from './views/verwaltung/detail-views/verwaltung-lieferant-detail-view/verwaltung-lieferant-detail-view.component';
import { VerwaltungUserDetailViewComponent } from './views/verwaltung/detail-views/verwaltung-user-detail-view/verwaltung-user-detail-view.component';
import { VerwaltungPersonComponent } from './views/verwaltung/verwaltung-person/verwaltung-person.component';
import { VerwaltungPersonDetailViewComponent } from './views/verwaltung/detail-views/verwaltung-person-detail-view/verwaltung-person-detail-view.component';
import { VerwaltungUserComponent } from './views/verwaltung/verwaltung-user/verwaltung-user.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },

  {
    path: '', canActivate: [AuthGuard], children: [
      {
        path: '',
        children: [

          { path: '', redirectTo: 'Home', pathMatch: 'full' },

          { path: 'Home', component: HomeComponent },
          { path: 'Bestellungsuebersicht', component: BestellungsuebersichtComponent },
          { path: 'Bestellvorgang', component: BestellvorgangComponent, canActivate: [AdminGuard] },
          { path: 'Bestellauftrag', component: BestellauftragAnlegenComponent },
          { path: 'Bestellauftragsuebersicht', component: BestellauftragsUebersichtComponent },
          { path: 'Bestelldetails/:BestellungsNr', component: BestellvorgangComponent,  },
          { path: 'Bestellauftragdetails/:BestellauftragId', component: BestellauftragAnlegenComponent },
          { path: 'Report', component: ReportComponent },
          {
            // Admin Views
            path: '', canActivate: [AdminGuard], children: [
              // Verwaltung
              { path: 'VerwaltungHome', component: VerwaltungHomeComponent, canActivate: [AdminGuard] },
              { path: 'VerwaltungArtikel', component: VerwaltungArtikelComponent, canActivate: [AdminGuard] },
              { path: 'VerwaltungKostenstelle', component: VerwaltungKostenstelleComponent, canActivate: [AdminGuard] },
              { path: 'VerwaltungLieferant', component: VerwaltungLieferantComponent, canActivate: [AdminGuard] },
              { path: 'VerwaltungPerson', component: VerwaltungPersonComponent, canActivate: [AdminGuard] },
              { path: 'VerwaltungUser', component: VerwaltungUserComponent, canActivate: [AdminGuard] },

              // Verwaltung Detail Views

              { path: 'VerwaltungArtikelDetail/:ArtikelId', component: VerwaltungArtikelDetailViewComponent, },
              { path: 'VerwaltungArtikelDetail', component: VerwaltungArtikelDetailViewComponent, },
              { path: 'VerwaltungKostenstelleDetail/:KostenstellenId', component: VerwaltungKostenstelleDetailViewComponent, },
              { path: 'VerwaltungKostenstelleDetail', component: VerwaltungKostenstelleDetailViewComponent, },
              { path: 'VerwaltungLieferantDetail/:LieferantenId', component: VerwaltungLieferantDetailViewComponent, },
              { path: 'VerwaltungLieferantDetail', component: VerwaltungLieferantDetailViewComponent, },
              { path: 'VerwaltungPersonDetail/:PersonId', component: VerwaltungPersonDetailViewComponent, },
              { path: 'VerwaltungPersonDetail', component: VerwaltungPersonDetailViewComponent, },
              { path: 'VerwaltungUserDetail/:UserId', component: VerwaltungUserDetailViewComponent, },
              { path: 'VerwaltungUserDetail', component: VerwaltungUserDetailViewComponent, },
            ]
          }
        ]
      }
    ]
  },

  { path: '**', redirectTo: 'Home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
