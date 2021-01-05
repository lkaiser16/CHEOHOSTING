import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthenticationDto } from 'src/app/DTOs/AuthenticationDto';
import { PersonenDto } from 'src/app/dtos/PersonenDto';
import { Globals } from 'src/global-constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageNotifier {

  private personRepo = new Subject<PersonenDto>();

  public notify(person: PersonenDto): void {
    this.personRepo.next(person);
  }

  public listen(): Observable<PersonenDto> {
    return this.personRepo.asObservable();
  }
}
