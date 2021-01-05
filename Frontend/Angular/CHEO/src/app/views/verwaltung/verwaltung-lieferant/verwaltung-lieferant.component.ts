import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LieferantService } from 'src/app/core/_services/lieferant.service';
import { LieferantDto } from 'src/app/dtos/LieferantDto';

@Component({
  selector: 'app-verwaltung-lieferant',
  templateUrl: './verwaltung-lieferant.component.html',
  styleUrls: ['./verwaltung-lieferant.component.scss']
})
export class VerwaltungLieferantComponent implements OnInit {

  lieferanten: LieferantDto[] = [];
  lieferantenColumns: string[] = ['name', 'plz', 'stadt', 'land'];
  lieferantDisplayedHeader = ['Name', 'Postleitzahl', 'Stadt', 'Land'];
  loaded = false;

  constructor(
    private lieferantService: LieferantService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.lieferantService.getAllLieferanten().subscribe((x) => {
      this.lieferanten = x;
      console.log(this.lieferanten);
      this.loaded = true;
    });
  }

  btnLieferantAnlegen() {
    this.router.navigate(['/VerwaltungLieferantDetail']);
  }

  lieferantRowClick(row: LieferantDto) {
    this.router.navigate(['VerwaltungLieferantDetail', row.lieferantId]);
  }

}
