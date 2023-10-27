import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../interfaces/game.interface";

@Component({
  selector: 'app-gamedeepinfo',
  templateUrl: './gamedeepinfo.component.html',
  styleUrls: ['./gamedeepinfo.component.css']
})
export class GamedeepinfoComponent implements OnInit{

  @Input() game: Game | any;
  @Input() currentSummoner: any;
  team1: [] | any;
  team2: [] | any;
  maxDamage: number = 0;
  maxDamageTaken: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.SetTeams();
    this.SetMaxDamage();
  }

  SetTeams() {
    if (this.game) {
      this.team1 = this.game.info.participants.filter((participant: any) => participant.teamId === 100);
      this.team2 = this.game.info.participants.filter((participant: any) => participant.teamId === 200);
    }
  }

  SetMaxDamage() {
    if (this.game) {
      this.game.info.participants.forEach((participant: any) => {
        if (participant.totalDamageDealtToChampions > this.maxDamage) {
          this.maxDamage = participant.totalDamageDealtToChampions;
        }
      });
      this.game.info.participants.forEach((participant: any) => {
        if (participant.totalDamageTaken > this.maxDamageTaken) {
          this.maxDamageTaken = participant.totalDamageTaken;
        }
      });
    }
  }



  getSpellName(spellId: number) {
    switch (spellId) {
      case 1:
        return "SummonerBoost";
      case 3:
        return "SummonerExhaust";
      case 4:
        return "SummonerFlash";
      case 6:
        return "SummonerHaste";
      case 7:
        return "SummonerHeal";
      case 11:
        return "SummonerSmite";
      case 12:
        return "SummonerTeleport";
      case 13:
        return "SummonerMana";
      case 14:
        return "SummonerDot";
      case 21:
        return "SummonerBarrier";
      case 30:
        return "SummonerPoroRecall";
      case 31:
        return "SummonerPoroThrow";
      case 32:
        return "SummonerSnowball";
      default:
        return "SummonerUnknown";
    }
  }
}
