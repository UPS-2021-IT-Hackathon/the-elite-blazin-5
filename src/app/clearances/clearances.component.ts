import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clearances',
  templateUrl: './clearances.component.html',
  styleUrls: ['./clearances.component.css']
})
export class ClearancesComponent implements OnInit {

  @Input()
  paragraphText = 'No extra text provided';

  @Input()
  title = 'No Title Provided';

  @Input()
  imageName = 'noImage.png';

  shown = false;

  constructor() { }

  ngOnInit(): void {
  }

  hideClearances() {
    this.shown = false;
  }

  showClearances() {
    this.shown = false;
  }

}
