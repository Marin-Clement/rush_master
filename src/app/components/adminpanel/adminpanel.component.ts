import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin/admin.service';
import {SummonerService} from "../../services/summoner/summoner.service";
import {Summoner} from '../../interfaces/summoner.interface';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  login: boolean = false;
  password: string = '';
  summonerName: string = '';

  statusLoaded: boolean = false;
  isRefreshing: boolean = false;

  status = {
    IsServerOnline: false,
    IsDatabaseOnline: false,
    IsApiKeyValid: false,
  };
  LastUpdated: string = '';

  popupObject = {
    type: '',
    title: '',
    message: '',
  };


  messagePopupList = [] as any;

  summoners: Summoner = { summonerNames: [], summonerIconsIds: [] };

  constructor(private adminService: AdminService, private summonerService: SummonerService, private router: Router) { }

  ngOnInit(): void {
    document.title = 'Admin - RoadMaster';
    this.scrollToTop();
    this.getSummoners();
    this.getStatus();
    this.login = this.adminService.isLoggedIn;
  }

  getStatus(): void {
    this.adminService.getStatus().subscribe({
      next: (status) => {
        this.status = status;
        status.IsServerOnline = true;
        this.setDate();
        this.statusLoaded = true;
      },
      error: () => {
        console.log('Error');
        this.status.IsServerOnline = false;
        this.setDate();
        this.statusLoaded = true;
      },
    });
  }

  setDate(): void {
    let hours = new Date().getHours().toString().padStart(2, '0');
    let minutes = new Date().getMinutes().toString().padStart(2, '0');
    let seconds = new Date().getSeconds().toString().padStart(2, '0');
    this.LastUpdated = `${hours}:${minutes}:${seconds}`;
  }


  submitLogin(): void {
    if (this.password) {
      this.adminService.login(this.password).subscribe({
        next: (data) => {
          this.adminService.saveLoginState(data); // Save login data to local storage
          this.login = true;
          this.password = '';
          this.addMessagePopup('success', 'Logged in', 'Logged in successfully')
        },
        error: () => {
          this.adminService.clearLoginState(); // Clear login state on failed login
          this.login = false;
          this.addMessagePopup('error', 'Login failed', 'Wrong password')
        },
      });
    }
  }

  logout(): void {
    this.adminService.clearLoginState(); // Clear login state on logout
    this.login = false;
    this.addMessagePopup('success', 'Logged out', 'Logged out successfully')
  }

  getSummoners(): void {
    this.summonerService.getSummoners().subscribe({
      next: (summoners) => {
        this.summoners = summoners;
      },
      error: () => {
        console.log('Error');
      },
    });
  }

  addSummoner(): void {
    if (!this.status.IsApiKeyValid) {
      this.addMessagePopup('error', 'Summoner not added', 'API Error');
      return;
    }

    this.adminService.addSummoner(this.summonerName).subscribe({
      next: () => {
        if (this.summoners.summonerNames.includes(this.summonerName)) {
          this.addMessagePopup('error', 'Summoner not added', 'Summoner already exists');
          return;
        }
        this.summoners.summonerNames.push(this.summonerName);
        this.addMessagePopup('success', 'Summoner added', this.summonerName);
        this.summonerName = '';
      },
      error: () => {
        if (!this.summonerName) {
          this.addMessagePopup('error', 'Summoner not added', 'Summoner name is empty');
          return;
        }
        this.addMessagePopup('error', 'Summoner not added', 'Summoner does not exist');
      },
    });
  }

  refreshAll(): void {
    this.isRefreshing = true;
    this.addMessagePopup('info', 'Refreshing all summoners...', '');
    this.adminService.refreshAll().subscribe({
      next: () => {
        this.isRefreshing = false;
        this.addMessagePopup('success', 'Refreshed all summoners', 'Refreshed all summoners successfully');
      },
      error: () => {
        this.isRefreshing = false;
        this.addMessagePopup('error', 'Refresh failed', 'Refresh failed');
      },
    });
  }

  deleteSummoner(index: number): void {
    const summonerName = this.summoners.summonerNames[index];
    this.adminService.deleteSummoner(summonerName).subscribe({
      next: () => {
        this.summoners.summonerNames.splice(index, 1);
        this.addMessagePopup('success', 'Summoner deleted', summonerName);
      },
      error: () => {
        this.addMessagePopup('error', 'Summoner not deleted', summonerName);
      },
    });
  }
   scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  addMessagePopup(type: string,title: string, message: string): void {
    this.messagePopupList.push({ type, title, message });
    setTimeout(() => { this.messagePopupList.shift(); }
      , 3000);
  }
}
