import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BestellungService } from '../../core/_services/bestellung.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter();

  searchValue = '';

  constructor(public bestellungsService: BestellungService) { }
 
  // @Output() messageEvent = new EventEmitter<string>();
  // message: SimpleBestellungDto[];
  ngOnInit(): void {
    // this.bestellungsService.sharedMessage.subscribe(message => this.message = message);
  }

  // searchProzess() {
  //   if(this.searchValue !== '')
  //   {
  //   this.sendMessage(this.searchValue);
  // }
  // else{
  //   // this.sendMessage( Array.from({ length: 100 }, (_, k) => createNewUser(k + 1)));

  // }
  // }
  // searchProzess() {
  //   if (this.searchValue !== '') {
  //     this.bestellungsService.filterBestellungen(this.searchValue)
  //       .subscribe(data => {
  //         // this.sendMessage(data);
  //         this.sendMessage(data);
  //         console.log(data);
  //       });
  //     // console.log(this.searchValue);
  //   }
  //   else {
  //     // this.sendMessage( Array.from({ length: 100 }, (_, k) => createNewUser(k + 1)));

  //   }
  // }

  // sendMessage(message) {
  //   this.messageEvent.emit(message);
  // }

  sendMessage(data) {
    console.log('Send MEssage in Searchbarcomponent');
    this.bestellungsService.nextMessage(data);
  }

  search(){
    console.log(this.searchValue);
    this.searchTextChanged.emit(this.searchValue);
  }

  inputChanged(value){
    this.searchValue = value;
    if (this.searchValue === ''){
      this.search();
    }
  }
}



