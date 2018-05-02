import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TeamsPage } from '../pages/teams/teams';
import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { TeamDetailsPage } from '../pages/team-details/team-details';
import { GamePage } from '../pages/game/game';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { TeamHomePage } from '../pages/team-home/team-home';
import { StandingsPage } from '../pages/standings/standings';
import { ScheduleApiProvider } from '../providers/schedule-api/schedule-api';
import { HttpClientModule } from '@angular/common/http';
import { CommonProvider } from '../providers/common/common';

@NgModule({
  declarations: [
    MyApp,
    TeamsPage,
    MyTeamsPage,
    TeamDetailsPage,
    GamePage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TeamsPage,
    MyTeamsPage,
    TeamDetailsPage,
    GamePage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScheduleApiProvider,
    CommonProvider
  ]
})
export class AppModule {}
