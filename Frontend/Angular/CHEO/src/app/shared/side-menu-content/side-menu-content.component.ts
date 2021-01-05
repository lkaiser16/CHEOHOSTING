import { Component, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { LocalStorageNotifier } from 'src/app/core/_services/localStorageNotifier.service';
import { PersonService } from '../../core/_services/person.service';
import { PersonenDto } from '../../dtos/PersonenDto';

@Component({
  selector: 'app-side-menu-content',
  templateUrl: './side-menu-content.component.html',
  styleUrls: ['./side-menu-content.component.scss'],
})
export class SideMenuContentComponent implements OnInit {
  currentPerson: PersonenDto;
  open = false;

  @Output() SideMenuOpen = new EventEmitter();

  constructor(
    private localStorageNotifier: LocalStorageNotifier,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.currentPerson = this.personService.getCurrentPerson()
    this.localStorageNotifier.listen().subscribe(x => {
      this.currentPerson = x;
    })
  }

  toggleSideMenu() {
    this.SideMenuOpen.emit(this.open);
  }
}
