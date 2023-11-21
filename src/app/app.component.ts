import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { AdminService} from "./services/admin/admin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'RoadMaster';
  admin = false;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          document.title = this.title;
        }
      }
    });
  }

  constructor(private router: Router, private adminService: AdminService) {
    this.admin = this.adminService.isLoggedIn;
  }
}
