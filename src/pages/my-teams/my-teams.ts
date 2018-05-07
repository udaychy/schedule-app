import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';
import { ScheduleApiProvider } from '../../providers/schedule-api/schedule-api';
import { CommonProvider } from '../../providers/common/common';
import { TeamHomePage } from '../team-home/team-home';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';

/**
 * Generated class for the MyTeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  
  public favorites: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scheduleApi: ScheduleApiProvider,
    private commonService: CommonProvider,
    private userSettings: UserSettingsProvider) {
  }

  goToTournaments() {
    this.navCtrl.push(TournamentsPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  favoriteTapped($event, fav) {
    this.commonService.displayLoader()
      .then((loaderRef) => {
        this.scheduleApi.getTournamentData(fav.tournamentId)
          .subscribe(t => {
            loaderRef.dismiss();
            this.navCtrl.push(TeamHomePage, fav.team)
          })
      });
  }

  ionViewDidEnter() {
   // this.favorites = this.userSettings.getAllFavorites()
   this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
  }

}
