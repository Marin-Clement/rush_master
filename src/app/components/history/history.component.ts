import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { GameService } from "../../services/game/game.service";
import { Game } from "../../interfaces/game.interface";
import { catchError, finalize, of } from "rxjs";

interface GameObj {
  match_id: string;
}

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements OnInit {
  loading: boolean = true;
  username: string | null = "";
  gamesIds: GameObj[] = [];
  games: Game[] = [];
  noGamesFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
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
        this.gamesIds = data;
        this.fetchGames();
      });
  }

  fetchGames() {
    if (this.gamesIds.length === 0) {
      this.noGamesFound = true;
      this.loading = false;
      return;
    }

    for (let i = 0; i < this.gamesIds.length; i++) {
      this.gameService
        .getMatchDetails(this.gamesIds[i].match_id, this.username)
        .pipe(
          catchError((error) => {
            // Handle error here
            console.error("Error fetching game details:", error);
            // Return an observable that emits a default value or handle the error gracefully
            return of(null);
          }),
          finalize(() => {
            // Check if all games have been fetched
            if (i === this.gamesIds.length - 1) {
              // Sort the games array by the timestamp property in descending order
              this.games.sort((a, b) => b.info.gameCreation - a.info.gameCreation);
              this.loading = false;
            }
          })
        )
        .subscribe((data) => {
          if (data) {
            this.games.push(data);
          }
        });
    }
  }
}
