import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input() iconName;
  @Input() route;
  @Input() buttonSizeBig;
  @Input() unterschrift;

  @Output() clickEvent: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routerTo() {
    this.router.navigate([`${this.route}`]);
  }

  buttonClick(){
    this.clickEvent.emit('click');
    if (this.route !== '' && this.route !== null && this.route !== undefined) {
      this.router.navigate([this.route]);
    }
  }

}
