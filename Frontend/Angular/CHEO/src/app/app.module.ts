import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Globals } from '../global-constants';
import { BestellvorgangSchritt1Component } from './views/bestellvorgang-components/bestellvorgang-schritt1/bestellvorgang-schritt1.component';
import { BestellvorgangSchritt2Component } from './views/bestellvorgang-components/bestellvorgang-schritt2/bestellvorgang-schritt2.component';
import { TableHinzugefuegteArtikelComponent } from './shared/table-components/table-hinzugefuegte-artikel/table-hinzugefuegte-artikel.component';
import { CoreModule } from './core/core.module';
import { MaterialModulesModule } from './material-modules/material-modules.module';
import { SharedModule } from './shared/shared.module';
import { ViewsModule } from './views/views.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MaterialModulesModule,
    SharedModule,
    ViewsModule,
    AppRoutingModule,
  ],
  providers: [
    LoginComponent,
    Globals,
    BestellvorgangSchritt1Component,
    BestellvorgangSchritt2Component,
    TableHinzugefuegteArtikelComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
