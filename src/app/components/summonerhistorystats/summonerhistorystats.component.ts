import { Component, OnInit, Input } from '@angular/core';
import { GameService } from "../../services/game/game.service";
import { SummonerHistoryStat } from "../../interfaces/summoner.interface";
import {catchError, finalize, of} from "rxjs";

export interface ChampionStats {
  name: string;
  kda: number;
  kills: number;
  deaths: number;
  assists: number;
  wins: number;
  losses: number;
  games: number;
  winrate: number;
}

@Component({
  selector: 'app-summonerhistorystats',
  templateUrl: './summonerhistorystats.component.html',
  styleUrls: ['./summonerhistorystats.component.css']
})
export class SummonerhistorystatsComponent implements OnInit {
  @Input() summonerName: string | null = "";
  loading: boolean = true;
  NoStats: boolean = true;

  summoner: string = "Summoner";
  numberOfGames: number = 0;
  wins: number = 0;
  losses: number = 0;
  mainRole: string = "Role";

  // Additional variables
  winrate: number = 0;
  kda: number = 0;
  csPerMin: number = 0;
  goldPerMin: number = 0;
  damagePerMin: number = 0;
  visionPerMin: number = 0;

  // Array to store champion stats
  championStats: ChampionStats[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.fetchSummonerHistoryStats();
  }

  reorderChampionsByGamesPlayed() {
    this.championStats.sort((a, b) => b.games - a.games);
  }


  fetchSummonerHistoryStats() {
    this.loading = true; // Set loading to true
    this.NoStats = false; // Set NoStats to false initially

    this.gameService
      .getSummonerHistoryStats(this.summonerName)
      .pipe(
        finalize(() => {
          this.loading = false; // Set loading to false after the request is complete
          if (this.championStats.length === 0) {
            this.NoStats = true;
          }
        }),
        catchError((error) => {
          console.error({error: "Error fetching summoner history stats:"}, error);
          this.NoStats = true; // Set NoStats to true if there is an error
          return of([]);
        }
      ))
      .subscribe((data: SummonerHistoryStat) => {
        // Set additional variables from the fetched data
        this.summoner = data.summoner;
        this.numberOfGames = data.numberOfGames;
        this.wins = data.wins;
        this.losses = data.losses;
        this.mainRole = data.mainRole;
        this.winrate = data.winrate;
        this.kda = data.kda;
        this.csPerMin = data.csPerMin;
        this.goldPerMin = data.goldPerMin;
        this.damagePerMin = data.damagePerMin;
        this.visionPerMin = data.visionPerMin;

        // If there are no stats, set NoStats to true
        if (this.numberOfGames === 0) {
          this.NoStats = true;
        }

        // Store champion stats
        this.championStats = data.champions;

        this.reorderChampionsByGamesPlayed();
      });
  }

  getColorForKDA(kda: number): string {
    if (kda >= 5) {
      return "rgb(253,154,0)";
    } else if (kda >= 3) {
      return "rgb(57,79,230)";
    } else if (kda >= 1) {
      return "rgb(255,255,255)";
    }
    return "rgb(222,86,86)";
  }
}

