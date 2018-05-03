import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { ScheduleApiProvider } from '../../providers/schedule-api/schedule-api';
import { CommonProvider } from '../../providers/common/common';
import * as _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public allTeams = [];
  public allTeamDivisions = [];

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
        this.allTeams = data.teams;
        this.allTeamDivisions = _.chain(data.teams)
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
        .value();
        console.log(_.chain(data.teams).groupBy('division').value());
        console.log(_.chain(data.teams).groupBy('division').toPairs().value());
        console.log(this.allTeamDivisions);
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
