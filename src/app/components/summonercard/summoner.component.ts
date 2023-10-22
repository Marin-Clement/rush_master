import { Component, Input } from '@angular/core';
import { SummonerStat } from '../../interfaces/summoner.interface';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent {
  @Input() index: number = 0;
  @Input() summonerName: string = '';
  @Input() summonerIconId: string = '';
  @Input() summonerStats: SummonerStat = {
    summoner: '',
    tier: '',
    rank: '',
    leaguePoints: 0,
    wins: 0,
    losses: 0,
    winrate: 0,
  };

  getWinrateColor(winrate: number): string {
    if (winrate >= 75) {
      return 'rgb(248,157,40)';
    } else if (winrate >= 50) {
      return 'rgb(111,232,111)';
    }
    return 'rgb(232,111,111)';
  }
}
