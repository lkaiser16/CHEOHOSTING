import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ok } from 'assert';
import { reduce } from 'rxjs/operators';
import { SearchService } from 'src/app/core/_services/search.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {

  tableDataSrc: any;
  @Input('tableColumns') tableCols: string[];
  @Input() tableData: {}[] = [];
  @Input() backendSearch = false;
  @Input() backendSearchURL = 'noURL';
  @Output() tableRowClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() tableHeaders: string[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.tableDataSrc = new MatTableDataSource(this.tableData);
    this.tableDataSrc.sort = this.sort;
    this.tableDataSrc.paginator = this.paginator;
  }

  onSearchInput(ev) {
    // prüft ob das backendSearch attribut true ist. Wenn ja,dann wird ein Backendrequest (--> mit der Mitgegebenen URL) durchgeführt und anschließend die returnte liste als Datasource gesetzt
    if (!this.backendSearch) {
      this.tableDataSrc.filter = ev.trim().toLowerCase();

    }
    else {
      let searchValue = ev;
      if (searchValue === null || searchValue === '') {
        searchValue = '*';
      }
      this.searchService.getFilteredListByURL(this.backendSearchURL + searchValue).subscribe(x => {
        console.log('custom table component searchbar onsearchinput backendsearch');
        console.log(x);
        this.tableDataSrc = new MatTableDataSource(x);
      }
      );
    }
  }

  searchTextChanged($event) {
    console.log($event);
  }

  setStatusClass(col, content) {
    if (col === 'status') {
      switch (content) {
        case 'Aufgegeben': // Bestellung
          return 'red';
        case 'In Bearbeitung':
        case 'Bestellt':
          return 'orange';
        case 'Geliefert':
          return 'green';
      }
    }
  }

  getRecord(row) {
    console.log('CUSTOM Table: get RoW' + row);
    this.tableRowClicked.emit(row);
  }

}
