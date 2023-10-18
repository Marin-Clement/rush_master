import { Component, Input, OnInit } from '@angular/core';
import { Game } from "../../interfaces/game.interface";
import { SummonerService } from "../../services/summoner/summoner.service";
import { catchError, of } from "rxjs";

interface SummonerObj {
  puuid: string;
}

@Component({
  selector: 'app-gameCard',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() game: Game | undefined;
  @Input() username: string | null = "";
  @Input() puuid: string | null = "";

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

  win: boolean = false;
  items: number[] = [];
  summonersId: string[] = [];
  kills: number = 0;
  deaths: number = 0;
  assists: number = 0;
  kda: string = "0";
  totalMinionsKilled: number = 0;
  champLevel: number = 0;
  championName: string = "";
  summonerName: string = "";
  gameDuration: number = 0;
  gameCreation: number = 0;
  visionScore: number = 0;
  team1: string[] = [];
  team2: string[] = [];
  team1Champs: string[] = [];
  team2Champs: string[] = [];

  constructor(private summonerService: SummonerService) { }

  ngOnInit(): void {
    this.setGameInfo();
  }

  setGameInfo(): void {
    if (this.game && this.puuid) {
      // Use this.puuid for fetching game-related data instead of a summoner name
      const currentUserParticipant = this.game.info.participants.find(participant => participant.puuid === this.puuid);

      if (currentUserParticipant) {
        this.win = currentUserParticipant.win;
        this.items = [
          currentUserParticipant.item0,
          currentUserParticipant.item1,
          currentUserParticipant.item2,
          currentUserParticipant.item3,
          currentUserParticipant.item4,
          currentUserParticipant.item5,
          currentUserParticipant.item6
        ];
        this.summonersId = [
          this.summonerNames[currentUserParticipant.summoner1Id],
          this.summonerNames[currentUserParticipant.summoner2Id]
        ];
        this.kills = currentUserParticipant.kills;
        this.deaths = currentUserParticipant.deaths;
        this.assists = currentUserParticipant.assists;
        this.visionScore = currentUserParticipant.visionScore;
        if (this.deaths === 0) {
          this.kda = ((this.kills + this.assists)).toFixed(2);
        }
      else {
          this.kda = ((this.kills + this.assists) / this.deaths).toFixed(2);
        }
        this.totalMinionsKilled = currentUserParticipant.totalMinionsKilled;
        this.champLevel = currentUserParticipant.champLevel;
        this.championName = currentUserParticipant.championName;
        this.summonerName = currentUserParticipant.summonerName;
        this.gameDuration = this.game.info.gameDuration;
        this.gameCreation = this.game.info.gameCreation;
        this.team1 = this.game.info.participants.slice(0, 5).map(participant => participant.summonerName);
        this.team2 = this.game.info.participants.slice(5, 10).map(participant => participant.summonerName);
        this.team1Champs = this.game.info.participants.slice(0, 5).map(participant => participant.championName);
        this.team2Champs = this.game.info.participants.slice(5, 10).map(participant => participant.championName);
      }
    }
  }
}
