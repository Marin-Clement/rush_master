import { Component, OnInit, Input } from '@angular/core';
import { GameService } from "../../services/game/game.service";
import { SummonerHistoryStat } from "../../interfaces/summoner.interface";
import {finalize} from "rxjs";

@Component({
  selector: 'app-summonerchampion',
  templateUrl: './summonerchampion.component.html',
  styleUrls: ['./summonerchampion.component.css']
})
export class SummonerchampionComponent implements OnInit {
  @Input() summonerName: string | null = "";
  championStats: any;
  loading: boolean = false;

  filteredChampionStats: any[] = []; // Filtered data
  isAscending: boolean = true;
  activeColumn: string = '';


  constructor(
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.fetchSummonerHistoryStats();
  }

  fetchSummonerHistoryStats() {
    this.gameService.getSummonerHistoryStats(this.summonerName)
      .pipe(
        finalize(() => {
          this.filteredChampionStats = [...this.championStats];
          this.sort('games');
          this.loading = false;
        })
      )
      .subscribe((data: SummonerHistoryStat) => {
        this.championStats = data.champions;
        console.log(this.championStats);
      });
  }

  sort(column: string) {
    if (this.activeColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.activeColumn = column;
      this.isAscending = false;
    }

    const modifier = this.isAscending ? 1 : -1;
    this.filteredChampionStats = [...this.championStats].sort((a, b) => {
      if (a[column] < b[column]) {
        return -1 * modifier;
      }
      if (a[column] > b[column]) {
        return 1 * modifier;
      }
      return 0;
    });
  }
}
