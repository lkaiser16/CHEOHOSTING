import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KostenstellenService } from 'src/app/core/_services/kostenstellen.service';
import { KostenstelleDto } from 'src/app/dtos/KostenstelleDto';

@Component({
  selector: 'app-verwaltung-kostenstelle',
  templateUrl: './verwaltung-kostenstelle.component.html',
  styleUrls: ['./verwaltung-kostenstelle.component.scss']
})
export class VerwaltungKostenstelleComponent implements OnInit {

  kostenstellen: KostenstelleDto[] = [];
  kostenstellenColumns: string[] = ['name', 'nummer', 'beschreibung'];
  kostenstelleDisplayedHeader = ['Name', 'Nummer', 'Beschreibung'];
  loaded = false;

  constructor(
    private kostenstellenService: KostenstellenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.kostenstellenService.getAllKostenstellen().subscribe((x) => {
      this.kostenstellen = x;
      console.log(this.kostenstellen)
      this.loaded = true;
    });

    let a = new KostenstelleDto();
  }

  btnKostenstelleAnlegen() {
    this.router.navigate(['/VerwaltungKostenstelleDetail']);
  }

  kostenstelleRowClick(row: KostenstelleDto) {
    console.log(row.kostenstellenId)
    this.router.navigate(['VerwaltungKostenstelleDetail/', row.kostenstellenId]);
  }

}
