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
  public team:any;
  public divisionFilter = 'division';
  public standings: any[];

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
    this.standings = this.allStandings;
    this.filterDivision();
  }

  getStandingHeader(record, recordIndex, records){
    if(recordIndex == 0 || record.division !== records[recordIndex - 1].division){
      return record.division;
    }
    return null;
  }

  filterDivision() {
    if (this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

}

