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
import { SummonerhistorystatsComponent } from './components/summonerhistorystats/summonerhistorystats.component';
import { SummonerheaderComponent } from './components/summonerheader/summonerheader.component';
import { LivegameComponent } from './components/livegame/livegame.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import {FormsModule} from "@angular/forms";
import { GamedeepinfoComponent } from './components/gamedeepinfo/gamedeepinfo.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';

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
    SummonerhistorystatsComponent,
    SummonerheaderComponent,
    LivegameComponent,
    AboutComponent,
    ContactComponent,
    GamedeepinfoComponent,
    AdminpanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
