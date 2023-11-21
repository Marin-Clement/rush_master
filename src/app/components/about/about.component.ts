import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  goToTop() {
    document.documentElement.scrollTop = 0;
  }

  constructor() {
    document.title = 'About - RoadMaster';
  }
}
