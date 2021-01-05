import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './mat-buttons/icon-button/icon-button.component';
import { MaterialModulesModule } from '../material-modules/material-modules.module';
import { ViewTitleAndSubtitleComponent } from './view-title-and-subtitle/view-title-and-subtitle.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CustomDatePipe } from './_pipes/CustomDatePipe';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { BestellauftragChemikalienTableComponent } from './bestellauftrag-chemikalien-table/bestellauftrag-chemikalien-table.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideMenuContentComponent } from './side-menu-content/side-menu-content.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from '../app-routing.module';
import { TableArtikelComponent } from './table-components/table-artikel/table-artikel.component';
import { TableHinzugefuegteArtikelComponent } from './table-components/table-hinzugefuegte-artikel/table-hinzugefuegte-artikel.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { SliceStringPipe } from './_pipes/slice-string.pipe';

@NgModule({
  declarations: [

    BestellauftragChemikalienTableComponent,
    CustomDatePipe,
    CustomInputComponent,
    CustomTableComponent,
    DropdownComponent,
    IconButtonComponent,
    SearchBarComponent,
    SideMenuContentComponent,
    ToolbarComponent,
    ViewTitleAndSubtitleComponent,

    TableArtikelComponent,
    TableHinzugefuegteArtikelComponent,
    DeleteDialogComponent,
    LoadingScreenComponent,
    SliceStringPipe,
  ],
  imports: [
    CommonModule,
    MaterialModulesModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  exports: [
    BestellauftragChemikalienTableComponent,
    CustomDatePipe,
    CustomInputComponent,
    CustomTableComponent,
    DropdownComponent,
    IconButtonComponent,
    MaterialModulesModule,
    SearchBarComponent,
    SideMenuContentComponent,
    ToolbarComponent,
    ViewTitleAndSubtitleComponent,

    TableArtikelComponent,
    TableHinzugefuegteArtikelComponent,
    LoadingScreenComponent
  ],
  providers: [CustomDatePipe]
})
export class SharedModule { }
