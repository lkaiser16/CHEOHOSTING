import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LieferantService } from 'src/app/core/_services/lieferant.service';
import { LieferantDto } from 'src/app/dtos/LieferantDto';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { KeyValue } from 'src/app/shared/dropdown/dropdown.component';

@Component({
  selector: 'app-verwaltung-lieferant-detail-view',
  templateUrl: './verwaltung-lieferant-detail-view.component.html',
  styleUrls: ['./verwaltung-lieferant-detail-view.component.scss'],
})
export class VerwaltungLieferantDetailViewComponent implements OnInit {
  @Input() lieferant: LieferantDto = new LieferantDto();

  lieferantenId: number;

  constructor(
    private lieferantService: LieferantService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.lieferantenId = params.LieferantenId;
    });
    if (this.lieferantenId !== -1 && this.lieferantenId !== undefined) {
      this.loadArtikelbyId(this.lieferantenId);
    }
  }

  loadArtikelbyId(lieferantId) {
    this.lieferantService.getLieferantById(lieferantId).subscribe((x) => {
      this.lieferant = x;
      console.log(this.lieferant);
    });
  }

  lieferantSpeichern() {
    if (this.validateUserInput()) {
      if (this.lieferantenId !== null && this.lieferantenId !== undefined) {
        this.lieferantService.putLieferant(this.lieferant).subscribe((lieferant) => {
          this.router.navigate(['/VerwaltungLieferant']);
        });
      } else {
        this.lieferantService.postLieferant(this.lieferant).subscribe((lieferant) => {
          this.router.navigate(['/VerwaltungLieferant']);
        });
      }
    }
  }

  lieferantLoeschen() {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleteItem') {
        if (this.lieferantenId !== null && this.lieferantenId !== undefined) {
          this.lieferantService.checkIfArtikelContainsLieferant(+this.lieferantenId).subscribe(cannotDelete => {
            if (cannotDelete === true) {
              alert('Lieferant kann nicht gelöscht werden, da er in einem oder mehreren Artikeln enthalten ist.');
            }
            else {
              this.lieferantService.deleteLieferant(+this.lieferantenId).subscribe((x) => {
                this.router.navigate(['/VerwaltungLieferant']);
              });
            }
          });
        }
        else {
          this.lieferant = null;
          this.router.navigate(['/VerwaltungLieferant']);
        }
      }
    });
  }

  //#region Input Validierung

  nameIsValid: boolean = true;
  strasseIsValid: boolean = true;
  hausnummerIsValid: boolean = true;
  plzIsValid: boolean = true;
  stadtIsValid: boolean = true;
  landIsValid: boolean = true;

  validateUserInput() {

    if (this.lieferant.name) this.nameIsValid = true;
    else this.nameIsValid = false;

    if (this.lieferant.strasse) this.strasseIsValid = true;
    else this.strasseIsValid = false;

    if (this.lieferant.hausnummer) this.hausnummerIsValid = true;
    else this.hausnummerIsValid = false;

    if (this.lieferant.plz) this.plzIsValid = true;
    else this.plzIsValid = false;

    if (this.lieferant.stadt) this.stadtIsValid = true;
    else this.stadtIsValid = false;

    if (this.lieferant.land) this.landIsValid = true;
    else this.landIsValid = false;

    if (this.nameIsValid && this.strasseIsValid && this.hausnummerIsValid && this.plzIsValid && this.stadtIsValid && this.landIsValid) {
      return true;
    }
    else {
      return false;
    }
  }

  //#endregion
}
