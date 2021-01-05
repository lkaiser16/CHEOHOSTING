import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/global-constants';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getFilteredListByURL(url: string) {
    return this.http.get<any>(url);
  }
}
