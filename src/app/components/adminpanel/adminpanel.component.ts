import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  login: boolean = false;
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  submitLogin(): void {
    if (this.password) {
      this.adminService.login(this.password).subscribe({
        next: () => {
          this.login = true;
          this.successMessage = 'Login successful';
        },
        error: () => {
          this.login = false;
          this.errorMessage = 'Login failed';
        },
      });
    }
  }
}
