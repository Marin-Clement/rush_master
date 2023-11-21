import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { AboutComponent} from "./components/about/about.component";
import { ContactComponent} from "./components/contact/contact.component";
import { SummonerlistComponent } from './components/summonerlist/summonerlist.component';
import { AdminpanelComponent} from "./components/adminpanel/adminpanel.component";
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: SummonerlistComponent,
  },
  {
    path: 'summoner/:username/overview',
    component: HistoryComponent,
  },
  {
    path: 'summoner/:username/champions',
    component: HistoryComponent,
  },
  {
    path: 'summoner/:username/live',
    component: HistoryComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'adminpanel',
    component: AdminpanelComponent,
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
