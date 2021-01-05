import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-title-and-subtitle',
  templateUrl: './view-title-and-subtitle.component.html',
  styleUrls: ['./view-title-and-subtitle.component.scss']
})
export class ViewTitleAndSubtitleComponent implements OnInit {

  @Input() title;
  @Input() subtitle;

  constructor() { }

  ngOnInit(): void {
  }

}
