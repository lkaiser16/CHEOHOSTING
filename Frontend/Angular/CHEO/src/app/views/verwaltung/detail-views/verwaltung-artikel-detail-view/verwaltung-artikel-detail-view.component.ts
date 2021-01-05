import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArtikelService } from 'src/app/core/_services/artikel.service';
import { LieferantService } from 'src/app/core/_services/lieferant.service';
import { ArtikelDto } from 'src/app/dtos/ArtikelDto';
import { LieferantDto } from 'src/app/dtos/LieferantDto';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { KeyValue } from 'src/app/shared/dropdown/dropdown.component';

@Component({
  selector: 'app-verwaltung-artikel-detail-view',
  templateUrl: './verwaltung-artikel-detail-view.component.html',
  styleUrls: ['./verwaltung-artikel-detail-view.component.scss'],
})
export class VerwaltungArtikelDetailViewComponent implements OnInit {
  @Input() artikel: ArtikelDto = new ArtikelDto();

  lieferantKeyValue = [];
  artikelId: string;

  selectedKategorie: number = -1;
  kategorieKeyValue = [
    { value: 'Verbrauchsmaterial', key: 1 },
    { value: 'Chemikalie', key: 2 },
  ];

  constructor(
    private lieferantService: LieferantService,
    private artikelService: ArtikelService,
    private route: ActivatedRoute,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.lieferantService.getAllLieferanten().subscribe((lieferanten) => {
      lieferanten.forEach((x) => {
        this.lieferantKeyValue.push(new KeyValue(x.lieferantId, x.name));

        this.route.params.subscribe((params: Params) => {
          this.artikelId = params.ArtikelId;
        });
        if (this.artikelId !== '' && this.artikelId !== undefined) {
          this.loadArtikelbyId(this.artikelId);
        }
      });
    });
  }

  loadArtikelbyId(artikelId) {
    this.artikelService.getArtikelById(artikelId).subscribe((x) => {
      this.artikel = x;
      this.selectedKategorie = this.kategorieKeyValue.filter(y => y.value === x.kategorie)[0]?.key;
      console.log(this.selectedKategorie)
      this.artikel.artikelId = +artikelId;
    });
  }

  artikelSpeichern() {
    if (this.validateUserInput()) {
      this.artikel.preis ? this.artikel.preis = Math.round((this.artikel?.preis + Number.EPSILON) * 100) / 100 : this.artikel.preis = null;
      if (this.artikelId !== null && this.artikelId !== undefined) {
        this.artikelService.putArtikel(this.artikel).subscribe((x) => {
          this.router.navigate(['/VerwaltungArtikel']);
        });
      } else {
        this.artikelService.postArtikel(this.artikel).subscribe((artikel) => {
          this.router.navigate(['/VerwaltungArtikel']);
        });
      }
    }
  }

  artikelLoeschen() {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleteItem') {
        if (this.artikelId !== null && this.artikelId !== undefined) {
          this.artikelService.checkIfBestellungContainsArtikel(+this.artikelId).subscribe(cannotDelete => {
            if (cannotDelete === true) {
              alert('Artikel kann nicht gelöscht werden, da er in einer Bestellung enthalten ist.');
            }
            else {
              this.artikelService.deleteArtikel(+this.artikelId).subscribe((x) => {
                this.router.navigate(['/VerwaltungArtikel']);
              });
            }
          });
        }
        else {
          this.artikel = null;
          this.router.navigate(['/VerwaltungArtikel']);
        }
      }
    });
  }

  lieferantChanged(value: KeyValue) {
    if (value !== null) {
      this.artikel.lieferantId = value.key;
    } else {
      this.artikel.lieferantId = null;
    }
  }

  transformAmount() {
    return this.currencyPipe.transform(this.artikel.preis, '€');
  }

  //#region Input Validierung

  artikelNrIsValid: boolean = true;
  bezeichnungIsValid: boolean = true;

  validateUserInput() {

    if (this.artikel.artikelNr) this.artikelNrIsValid = true;
    else this.artikelNrIsValid = false;

    if (this.artikel.bezeichnung) this.bezeichnungIsValid = true;
    else this.bezeichnungIsValid = false;

    if (this.artikelNrIsValid && this.bezeichnungIsValid) {
      return true;
    }
    else {
      return false;
    }
  }

  //#endregion
}
