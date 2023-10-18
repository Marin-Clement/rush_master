import { Component } from '@angular/core';
import { Summoner, SummonerStat } from '../../interfaces/summoner.interface';
import { SummonerService } from '../../services/summoner/summoner.service';
import { forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summonerlist',
  templateUrl: './summonerlist.component.html',
  styleUrls: ['./summonerlist.component.css']
})
export class SummonerlistComponent {
  summoners: Summoner = { summonerNames: [], summonerIconsIds: [] };
  summonerStats: SummonerStat[] = [];

  constructor(private _summonerService: SummonerService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSummoner();
  }

  private fetchSummoner(): void {
    this._summonerService.getSummoners()
      .pipe(
        catchError((error) => {
          console.error('Error fetching data:', error);
          // Navigate to the error page
          this.router.navigate(['/error', error.name]);
          return throwError(error);
        })
      )
      .subscribe((data: Summoner) => {
        this.summoners = data;
        const apiCalls = this.summoners.summonerNames.map(name =>
          this._summonerService.getSummonerStats(name)
        );
        forkJoin(apiCalls).subscribe((stats: SummonerStat[]) => {
          this.summonerStats = stats;
        });
      });
  }
}
