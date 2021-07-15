import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit {

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

  hidePopover() {
    this.shown = false;
  }

  showPopover() {
    this.shown = true;
  }

}
