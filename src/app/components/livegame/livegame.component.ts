import { Component, OnInit, Input, NgZone } from '@angular/core';
import { SummonerService } from '../../services/summoner/summoner.service';
import { GameService } from "../../services/game/game.service";
import {finalize, throwError} from "rxjs";
import { Game } from "../../interfaces/game.interface";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-livegame',
  templateUrl: './livegame.component.html',
  styleUrls: ['./livegame.component.css']
})
export class LivegameComponent implements OnInit {

  summonerNames: { [key: number]: string } = {
    1: "SummonerBoost",
    3: "SummonerExhaust",
    4: "SummonerFlash",
    6: "SummonerHaste",
    7: "SummonerHeal",
    11: "SummonerSmite",
    12: "SummonerTeleport",
    14: "SummonerDot",
    21: "SummonerBarrier",
  }

  loading = true;
  liveGame= false;
  @Input() summonerName: any;
  championJson: any;
  liveGameInfo: any;
  game: Game | any;
  gameTime: number | any;

  team1: [] | any;
  team2: [] | any;


  constructor(private summonerService: SummonerService, private gameService: GameService, private zone: NgZone) { }

  ngOnInit(): void {
    this.getChampionJson();
    this.summonerService.getLiveGameInfo()
      .pipe(
        finalize(() => {
          for (const item of this.liveGameInfo) {
            console.log(item.summonerName);
            if (item.summonerName == this.summonerName) {
              this.game = item.game;
              this.gameTime = this.setFormattedGameTime(this.game.gameStartTime);
              this.setTeams();
              this.loading = false;
              if (this.game != null) {
                this.liveGame = true;
              }
              this.calculateGameTime();
              setInterval(() => {
                this.calculateGameTime();
              }, 1000);
            }
          }
        }),
        catchError((error) => {
          console.error({error: 'Error fetching data:'}, error);
          this.loading = false;
          this.liveGame = false;
          return throwError(error);
        }
    )).subscribe((liveGameInfo) => {
        this.liveGameInfo = liveGameInfo;
        console.log('Live game information:', liveGameInfo);
      });
  }

  getTeam1(): void {
    this.team1 = this.game.participants.slice(0, 5);
    console.log(this.team1);
  }

  getTeam2(): void {
    this.team2 = this.game.participants.slice(5, 10);
  }

  setTeams(): void {
    this.getTeam1();
    this.getTeam2();
  }

  getChampionJson(): void {
    this.gameService.getChampionJson()
      .pipe(
        finalize(() => {
        }),
        catchError((error) => {
          console.error({error: 'Error fetching data:'}, error);
          return throwError(error);
        }
    ))
    .subscribe(championJson => this.championJson = championJson);
  }

  getChampionName(championId: number): string | any {
    for (const champion in this.championJson.data) {
      if (this.championJson.data[champion].key == championId) {
        return champion
      }
    }
  }

  getSummonerSpellName(summonerSpellId: number): string | any {
    return this.summonerNames[summonerSpellId];
  }

  calculateGameTime() {
    this.zone.runOutsideAngular(() => {
      const currentTime = Date.now();
      const rawGameTime = Math.floor((currentTime - this.game.gameStartTime) / 1000);

      const minutes = Math.floor(rawGameTime / 60);
      const remainingSeconds = rawGameTime % 60;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
      const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString();

      this.gameTime = `${formattedMinutes}:${formattedSeconds}`;
    });
  }


  setFormattedGameTime(seconds: number): void {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString();
    this.gameTime = `${formattedMinutes}:${formattedSeconds}`;
  }

  refreshGame(): void {
    // refresh page
    document.location.reload();
  }
}
