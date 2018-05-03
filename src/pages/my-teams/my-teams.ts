import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';
import { ScheduleApiProvider } from '../../providers/schedule-api/schedule-api';
import { CommonProvider } from '../../providers/common/common';
import { TeamHomePage } from '../team-home/team-home';

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

  public favorites: any = [{
    tournamentId: '3dd50aaf-6b03-4497-b074-d81703f07ee8',
    tournamentName: 'Cager Classic',
    team: {coach: "James", division: "6th grade", id: 812, name: "Baltimore Stars"}

  }];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scheduleApi: ScheduleApiProvider,
    private commonService: CommonProvider) {
  }

  goToTournaments(){
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
}
