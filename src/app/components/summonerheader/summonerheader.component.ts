import {Component, OnInit, Input} from '@angular/core';
import {SummonerService} from '../../services/summoner/summoner.service';
import {finalize} from "rxjs";

@Component({
  selector: 'app-summonerheader',
  templateUrl: './summonerheader.component.html',
  styleUrls: ['./summonerheader.component.css']
})
export class SummonerheaderComponent implements OnInit {
  @Input() inGame: boolean = true;
  @Input() summonerName: any;
  summonerStats: any;
  summonerInfo: any;
  loading: boolean = true;

  constructor(private summonerService: SummonerService) {
  }

  ngOnInit(): void {
    this.getSummonerStats();
    console.log(this.getCurrentRoute());
  }

  getSummonerStats(): void {
    this.summonerService.getSummonerStats(this.summonerName)
      .pipe(
        finalize(() => {
            this.getSummonerInfo();
          }
        ))
      .subscribe(summonerStats => this.summonerStats = summonerStats);
  }

  getSummonerInfo(): void {
    this.summonerService.getSummonerInfo(this.summonerName)
      .pipe(
        finalize(() => {
            this.loading = false;
          }
        ))
      .subscribe(summoner => this.summonerInfo = summoner);
  }

  getCurrentRoute(): string {
    return window.location.pathname;
  }
}
