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
  liveGameInfo: any;

  constructor(private _summonerService: SummonerService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSummoner();
  }

  private fetchSummoner(): void {
    this._summonerService.getSummoners()
      .pipe(
        catchError((error) => {
          console.error({error: 'Error fetching data:'}, error);
          // Navigate to the error page
          this.router.navigate(['/error', error.name]).then(r => console.log(r));
          return throwError(error);
        }),

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
    this._summonerService.getLiveGameInfo()
      .subscribe((liveGameInfo) => {
        this.liveGameInfo = liveGameInfo;
        console.log('Live game information:', liveGameInfo);
      });
  }

  private sortByRank(): void {
    const tier: { [key: string]: number } = {
      "UNRANKED": 1,
      "IRON": 2,
      "BRONZE": 3,
      "SILVER": 4,
      "GOLD": 5,
      "PLATINUM": 6,
      "EMERALD": 7,
      "DIAMOND": 8,
      "MASTER": 9,
      "GRANDMASTER": 10,
      "CHALLENGER": 11,
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

  isSummonerInGame(summonerNameToCheck: string): boolean {
    for (const gameInfo of this.liveGameInfo) {
      if (gameInfo.game && gameInfo.game.participants) {
        // Iterate through the participants array
        for (const participant of gameInfo.game.participants) {
          if (participant.summonerName === summonerNameToCheck) {
            return true; // The summoner is a participant in the game
          }
        }
      }
    }

    return false; // Summoner is not in the game
  }
}
