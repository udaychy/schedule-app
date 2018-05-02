import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScheduleApiProvider } from '../../providers/schedule-api/schedule-api';
import { TeamHomePage } from '../team-home/team-home';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public game:any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private schedularApi: ScheduleApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.game = this.navParams.data
  }

  teamTapped(teamId){
    let tourneyData = this.schedularApi.currentTourney;
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

}
