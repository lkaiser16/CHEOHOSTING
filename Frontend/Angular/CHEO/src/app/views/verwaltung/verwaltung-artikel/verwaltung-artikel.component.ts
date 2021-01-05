import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SimpleArtikelDto } from 'src/app/dtos/SimpleArtikelDto';
import { ArtikelService } from '../../../core/_services/artikel.service';
import { ArtikelDto } from '../../../dtos/ArtikelDto';

@Component({
  selector: 'app-verwaltung-artikel',
  templateUrl: './verwaltung-artikel.component.html',
  styleUrls: ['./verwaltung-artikel.component.scss'],
})
export class VerwaltungArtikelComponent implements OnInit {
  artikel: SimpleArtikelDto[] = [];
  artikelColumns: string[] = ['artikelNr', 'bezeichnung', 'preis'];
  artikelDisplayedHeader = ['Artikelnummer', 'Bezeichnung', 'Preis'];
  loaded = false;

  constructor(
    private artikelService: ArtikelService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.artikelService.getAllArtikel().subscribe((x) => {
      this.artikel = x;
      console.log(this.artikel);
      this.loaded = true;
    });

    let a = new SimpleArtikelDto();
  }

  btnArtikelAnlegen() {
    this.router.navigate(['/VerwaltungArtikelDetail']);
  }

  artikelRowClick(row: ArtikelDto) {
    this.router.navigate(['VerwaltungArtikelDetail', row.artikelId]);
  }
}
