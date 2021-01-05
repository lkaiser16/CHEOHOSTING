import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/core/_services/person.service';
import { PersonenDto } from 'src/app/dtos/PersonenDto';

@Component({
  selector: 'app-verwaltung-user',
  templateUrl: './verwaltung-person.component.html',
  styleUrls: ['./verwaltung-person.component.scss']
})
export class VerwaltungPersonComponent implements OnInit {

  personen: PersonenDto[] = [];
  personColumns: string[] = ['vorname', 'nachname', 'akNummer', 'funktion'];
  personDisplayedHeader = ['Vorname', 'Nachname', 'AK-Nummer', 'Funktion'];
  loaded = false;

  constructor(
    private personService: PersonService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.personService.getAllPersonen().subscribe((x) => {
      this.personen = x;
      console.log(this.personen);
      this.loaded = true;
    });
  }

  btnPersonAnlegen() {
    this.router.navigate(['/VerwaltungPersonDetail']);
  }

  personenRowClick(row: PersonenDto) {
    this.router.navigate(['VerwaltungPersonDetail', row.personId]);
  }

}
