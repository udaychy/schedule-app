import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScheduleApiProvider } from '../../providers/schedule-api/schedule-api';
import * as _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  public allStandings:any[];
  public allStandingsDivision:any[];
  public team:any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scheduleApi: ScheduleApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');

    this.team = this.navParams.data;
    let tourneyData = this.scheduleApi.currentTourney;
    this.allStandings = tourneyData.standings;

    this.allStandingsDivision = _.chain(this.allStandings)
    .groupBy('division')
    .toPairs()
    .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    .value();

    console.log('standing', this.allStandings);
    console.log('standing', this.allStandingsDivision);
  }

}

