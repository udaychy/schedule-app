import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { ScheduleApiProvider } from '../../providers/schedule-api/schedule-api';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public teams = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scheduleApi: ScheduleApiProvider,
    private commonService: CommonProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');

    this.commonService.displayLoader('Loading Teams')
    .then((loaderRef) => {
      let selectedTournament = this.navParams.data;
      this.scheduleApi.getTournamentData(selectedTournament.id).subscribe(data => {
        this.teams = data.teams;
        loaderRef.dismiss();
      })
    })
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

  goHome(){
    this.navCtrl.popToRoot();
  }
}
