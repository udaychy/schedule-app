import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScheduleApiProvider } from '../../providers/schedule-api/schedule-api';
import * as _ from 'lodash';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-team-details',
  templateUrl: 'team-details.html',
})
export class TeamDetailsPage {

  public team: any = {};
  public games: any = [];
  public tourneyData: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scheduleApi: ScheduleApiProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailsPage');

    this.team = this.navParams.data;
    this.tourneyData = this.scheduleApi.currentTourney;

    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs" : "at")
        };
      })
      .value();

      console.log(this.games);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W" : "L";

      return winIndicator + teamScore + "-" + opponentScore;
    }

    return "";
  }

  gameTapped(game){
    let sourceGame= this.tourneyData.games.find(g => g.id === game.gameId);

    // As we are in a tab nav, we need to move up to the main parent nav
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }
}
