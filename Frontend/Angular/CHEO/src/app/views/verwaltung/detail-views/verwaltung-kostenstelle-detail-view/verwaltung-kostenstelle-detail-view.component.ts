import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { KostenstellenService } from 'src/app/core/_services/kostenstellen.service';
import { KostenstelleDto } from 'src/app/dtos/KostenstelleDto';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-verwaltung-kostenstelle-detail-view',
  templateUrl: './verwaltung-kostenstelle-detail-view.component.html',
  styleUrls: ['./verwaltung-kostenstelle-detail-view.component.scss']
})
export class VerwaltungKostenstelleDetailViewComponent implements OnInit {

  @Input() kostenstelle: KostenstelleDto = new KostenstelleDto();

  kostenstellenId: string;

  constructor(
    private kostenstelleService: KostenstellenService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.kostenstellenId = params.KostenstellenId;
    });
    if (this.kostenstellenId !== '' && this.kostenstellenId !== undefined) {
      this.loadKostenstellebyId(this.kostenstellenId);
    }
  }

  loadKostenstellebyId(kostenstellenId) {
    this.kostenstelleService.getKostenstelleById(kostenstellenId).subscribe((x) => {
      console.log(this.kostenstelle);
      this.kostenstelle = x;
    });
  }

  kostenstelleSpeichern() {
    if (this.validateUserInput()) {
      if (this.kostenstellenId !== null && this.kostenstellenId !== undefined) {
        this.kostenstelleService.putKostenstelle(this.kostenstelle).subscribe((kostenstelle) => {
          this.router.navigate(['/VerwaltungKostenstelle']);
        });
      } else {
        this.kostenstelleService.postKostenstelle(this.kostenstelle).subscribe((kostenstelle) => {
          this.router.navigate(['/VerwaltungKostenstelle']);
        });
      }
    }
  }

  kostenstelleLoeschen() {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleteItem') {
        if (this.kostenstellenId !== null && this.kostenstellenId !== undefined) {
          this.kostenstelleService.checkIfBestellungContainsKostenstelle(+this.kostenstellenId).subscribe(cannotDelete => {
            if (cannotDelete === true) {
              alert('Kostenstelle kann nicht gelöscht werden, da sie in einer Bestellung enthalten ist.');
            }
            else {
              this.kostenstelleService.deleteKostenstelle(+this.kostenstellenId).subscribe((x) => {
                this.router.navigate(['/VerwaltungKostenstelle']);
              });
            }
          });
        }
        else {
          this.kostenstelle = null;
          this.router.navigate(['/VerwaltungKostenstelle']);
        }
      }
    });
  }

  //#region Input Validierung

  nameIsValid: boolean = true;
  nummerIsValid: boolean = true;

  validateUserInput() {

    if (this.kostenstelle.name) this.nameIsValid = true;
    else this.nameIsValid = false;

    if (this.kostenstelle.nummer) this.nummerIsValid = true;
    else this.nummerIsValid = false;

    if (this.nameIsValid && this.nummerIsValid) {
      return true;
    }
    else {
      return false;
    }
  }

  //#endregion

}
