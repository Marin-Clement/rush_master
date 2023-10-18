import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { SummonerlistComponent } from './components/summonerlist/summonerlist.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: SummonerlistComponent,
  },
  {
    path: 'summoner/:username',
    component: HistoryComponent,
  },
  {
    path: 'error/:error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'error/404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
