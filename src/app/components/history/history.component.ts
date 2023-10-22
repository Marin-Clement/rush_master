// history.component.ts

import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
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
  loading: boolean = true;
  username: string | null = "";
  puuid: string | null = "";
  gamesIds: GameObj[] = [];
  games: Game[] = [];
  noGamesFound: boolean = false;
  batchSize: number = 10;
  currentBatchIndex: number = 0;
  noMoreGames: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private summonerService: SummonerService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.route.paramMap.subscribe((params) => {
      this.username = params.get("username");
    });
    this.fetchSummoner();
    this.fetchGamesIds();
  }

  fetchGamesIds() {
    this.gameService
      .getGames(this.username)
      .pipe(
        catchError((error) => {
          console.error("Error fetching game IDs:", error);
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
              console.error("Error fetching game details:", error);
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
          console.error("Error fetching summoner:", error);
          return of(null);
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
    window.scrollTo(0, 0);
  }
}
