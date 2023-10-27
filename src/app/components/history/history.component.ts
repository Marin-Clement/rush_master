// history.component.ts

import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GameService } from "../../services/game/game.service";
import { SummonerService } from "../../services/summoner/summoner.service";
import { Game } from "../../interfaces/game.interface";
import { catchError, finalize, of } from "rxjs";

interface GameObj {
  match_id: string;
  date: string;
}
interface SummonerObj {
  puuid: string;
}

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements OnInit {
  title = "RoadMaster";
  currentTab: string = "overview"
  loading: boolean = true;
  username: string | null = "";
  puuid: string | null = "";
  gamesIds: GameObj[] = [];
  games: Game[] = [];
  noGamesFound: boolean = false;
  batchSize: number = 10;
  currentBatchIndex: number = 0;
  noMoreGames: boolean = false;
  liveGameInfo: any;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private summonerService: SummonerService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get("username");
    });
    this.route.url.subscribe((url) => {
      this.currentTab = url[2].path;
    });
    this.fetchSummoner();
    this.fetchGamesIds();
  }

  fetchGamesIds() {
    this.gameService
      .getGames(this.username)
      .pipe(
        catchError((error) => {
          console.error({error: "Error fetching game IDs:"}, error);
          return of([]);
        })
      )
      .subscribe((data) => {
        this.gamesIds = data.map((game: GameObj) => ({
          ...game,
          date: new Date(game.date).toISOString(),
        }));

        if (this.gamesIds.length === 0) {
          this.noGamesFound = true;
          this.loading = false;
        } else {
          this.noGamesFound = false;

          // Sort the gamesIds array by date in descending order (newer to older)
          this.gamesIds.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          this.loadNextBatch();
        }
      });
    this.summonerService.getLiveGameInfo()
      .subscribe((liveGameInfo) => {
        this.liveGameInfo = liveGameInfo;
        console.log('Live game information:', liveGameInfo);
      });
  }


  loadNextBatch() {
    const startIndex = this.currentBatchIndex;
    const endIndex = startIndex + this.batchSize;
    const fakeDelay = 0;

    for (let i = startIndex; i < endIndex && i < this.gamesIds.length; i++) {
      setTimeout(() => {
        this.gameService
          .getMatchDetails(this.gamesIds[i].match_id, this.username)
          .pipe(
            catchError((error) => {
              console.error({error: "Error fetching game details:"}, error);
              return of(null);
            }),
            finalize(() => {
              if (i === endIndex - 1 || i === this.gamesIds.length - 1) {
                this.loading = false;
                console.log("Loading complete");
              }
            })
          )
          .subscribe((data) => {
            if (data) {
              this.games.push(data);
              this.games.sort((a, b) => {
                return new Date(b.info.gameCreation).getTime() - new Date(a.info.gameCreation).getTime();
              });
            }
          });
      }, fakeDelay);
    }
    this.currentBatchIndex = endIndex;
    if (this.currentBatchIndex >= this.gamesIds.length) {
      this.noMoreGames = true;
    }
  }

  fetchSummoner() {
    this.summonerService
      .getSummonerInfo(this.username)
      .pipe(
        catchError((error) => {
          console.error({error: "Error fetching summoner:"}, error);
          return of(null);
        }),
        finalize(() => {
          this.goToTop();
          this.setTitleAccordingToSummonerName();
        })
      )
      .subscribe((data: SummonerObj) => {
        if (data) {
          this.puuid = data.puuid;
        }
      });
  }

  @HostListener("window:scroll", ["$event"])
  onScroll() {
    const scrollHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    if (scrollHeight - windowHeight - scrollY < 100 && this.currentBatchIndex < this.gamesIds.length && !this.loading) {
      this.loadNextBatch();
      this.loading = true;
    }
  }

  goToTop() {
    document.documentElement.scrollTop = 0;
  }

  setTitleAccordingToSummonerName() {
    this.title = this.username ? `${this.username} - RoadMaster` : "RoadMaster";
    document.title = this.title;
  }

  isSummonerInGame(summonerNameToCheck: string | null): boolean {
    if (!this.liveGameInfo) {
      return false; // No live game information
    }
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
