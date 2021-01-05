import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  @Input() selectedValue: any;
  @Input() formName = '';
  @Input() validierungMessage = '';
  @Input() isValid: boolean = true;
  @Input() type: string = 'text';
  @Output() inputValue: EventEmitter<string> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  inputChanged(){
    this.inputValue.emit(this.selectedValue);
  }

}
