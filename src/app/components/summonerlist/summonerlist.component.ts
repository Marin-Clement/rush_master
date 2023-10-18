import {Component, OnInit} from '@angular/core';
import { Summoner, SummonerStat } from '../../interfaces/summoner.interface';
import { SummonerService } from '../../services/summoner/summoner.service';
import { forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {th} from "date-fns/locale";

@Component({
  selector: 'app-summonerlist',
  templateUrl: './summonerlist.component.html',
  styleUrls: ['./summonerlist.component.css']
})
export class SummonerlistComponent implements OnInit {
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
          this.router.navigate(['/error', error.name]).then(r => console.log(r));
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
          this.sortByRank();
        });
      });
  }

  private sortByRank(): void {
    const tier: { [key: string]: number } = {
      "IRON": 1,
      "BRONZE": 2,
      "SILVER": 3,
      "GOLD": 4,
      "PLATINUM": 5,
      "EMERALD": 6,
      "DIAMOND": 7,
      "MASTER": 8,
      "GRANDMASTER": 9,
      "CHALLENGER": 10,
    };
    const rank: { [key: string]: number } = {
      "I": 4,
      "II": 3,
      "III": 2,
      "IV": 1,
    };

    // Sort the summonerStats array based on tier, rank, and lp
    this.summonerStats.sort((a, b) => {
      // Compare by tier
      const tierComparison = tier[a.tier] - tier[b.tier];

      if (tierComparison === 0) {
        // If tiers are the same, compare by rank
        const rankComparison = rank[a.rank] - rank[b.rank];

        if (rankComparison === 0) {
          // If ranks are the same, compare by lp
          return a.leaguePoints - b.leaguePoints;
        }

        return rankComparison;
      }

      return tierComparison;
    });

    this.summonerStats.reverse(); // To sort in descending order

    // Sort the corresponding summoner names and icons based on the sorted summonerStats
    const sortedSummonerNames = this.summonerStats.map(stat => {
      const index = this.summoners.summonerNames.indexOf(stat.summoner);
      return this.summoners.summonerNames[index];
    });

    const sortedSummonerIconsIds = this.summonerStats.map(stat => {
      const index = this.summoners.summonerNames.indexOf(stat.summoner);
      return this.summoners.summonerIconsIds[index];
    });

    // Update the original arrays
    this.summoners.summonerNames = sortedSummonerNames;
    this.summoners.summonerIconsIds = sortedSummonerIconsIds;
  }

  private sortByWinRate(): void {
    this.summonerStats.sort((a, b) => {
      return b.winrate - a.winrate;
    });
  }
}
