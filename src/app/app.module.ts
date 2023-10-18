import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummonerComponent } from './components/summonercard/summoner.component';
import {NgOptimizedImage} from "@angular/common";
import { HistoryComponent } from './components/history/history.component';
import { SummonerlistComponent } from './components/summonerlist/summonerlist.component';
import { ErrorComponent } from './components/error/error.component';
import { GameComponent } from './components/gameCard/game.component';
import { TimeAgoPipe } from './pipes/timeAgo/time-ago.pipe';
import { FiddleStickExceptionPipe } from './pipes/fiddleStickExceptionPipe/fiddle-stick-exception.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SummonerComponent,
    HistoryComponent,
    SummonerlistComponent,
    ErrorComponent,
    GameComponent,
    TimeAgoPipe,
    FiddleStickExceptionPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
