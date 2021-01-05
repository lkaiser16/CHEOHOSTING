import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient, public globals: Globals ) { }

  url = this.globals.URL + '/Report';

  getCsvFile(): Observable<any>
  {
    return this.http.get<any>(this.url);
  }
}
