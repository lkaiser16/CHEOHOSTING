import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnChanges {
  @Input() formName = '';
  @Input() options: KeyValue[] = [];
  @Input() selectedKey: number;
  @Input() selectedValue = '';
  @Input() validierungMessage = '';
  @Input() isValid = true;
  @Output() inputValue: EventEmitter<KeyValue> = new EventEmitter();

  filteredOptions: KeyValue[] = this.options;
  selectedItem;

  ngOnInit() {
    this.filteredOptions = this.options;
    this.selectedItem = this.options?.filter(
      (x) => x.key === this.selectedKey
    )[0];
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("changes");
    console.log("SEAS I HAVE CHANGES" + changes.value);
    if (changes.selectedKey?.currentValue != changes.selectedKey?.previousValue) {
      this.selectedItem = this.options.filter(
        (x) => x.key === changes.selectedKey?.currentValue
      )[0];
    }

  }

  onKey(value) {
    this.filteredOptions = this.search(value);
  }

  search(value) {
    this.selectedKey = value;
    return this.options.filter((x) => x.value.toLowerCase().includes(value.toLowerCase()));
  }

  selectionChanged(keyValue: KeyValue) {
    this.selectedItem = keyValue;
    console.log(this.selectedItem);
    if (this.inputValue !== null) {
      this.inputValue.emit(this.selectedItem);
    }
    else {
      return null;
    }
  }
}

export class KeyValue {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  key: any;
  value: any;
}
