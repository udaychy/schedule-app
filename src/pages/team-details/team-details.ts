import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ScheduleApiProvider } from '../../providers/schedule-api/schedule-api';
import * as _ from 'lodash';
import { GamePage } from '../game/game';
import moment from 'moment';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';

@Component({
  selector: 'page-team-details',
  templateUrl: 'team-details.html',
})
export class TeamDetailsPage {

  public team: any = {};
  public games: any = [];
  public allGames: any = [];
  public tourneyData: any = {};
  public teamStanding: any = {};
  public dateFilter: any = {};
  public isDateFilterEnabled: boolean = false;
  public isFollowing: boolean = false;

  @ViewChild(DateTime)
  public ionicDate:DateTime 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scheduleApi: ScheduleApiProvider,
    private alertController: AlertController,
    public toaster: ToastController,
    private userSettings: UserSettingsProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailsPage');
    this.team = this.navParams.data;
    this.tourneyData = this.scheduleApi.currentTourney;

    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id == this.team.id);
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

      this.allGames = this.games;
      this.teamStanding = _.find(this.tourneyData.standings, {'teamId': this.team.id});
      this.userSettings.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
      console.log(this.games);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = parseInt(teamScore) > parseInt(opponentScore) ? "W" : "L";

      return winIndicator + teamScore + "-" + opponentScore;
    }

    return "";
  }

  gameTapped(game){
    let sourceGame= this.tourneyData.games.find(g => g.id === game.gameId);

    // As we are in a tab nav, we need to move up to the main parent nav
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  dateChanged(){
    this.isDateFilterEnabled && this.ionicDate.open();
    this.games = this.isDateFilterEnabled
      ? _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'))
      : this.allGames;

    //this.ionicDate.open();
  }

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : "";
  }

  getScoreBadgeColor(game){
    return game.scoreDisplay.indexOf('W') === 0 ? 'primary' : 'danger';
  }


  toggleFollow() {
    if (!this.isFollowing) {
      this.isFollowing = true;
      this.userSettings.favoriteTeam(
        this.team,this.tourneyData.tournament.id, 
        this.tourneyData.tournament.name);

      return;
    }

    let confirm = this.alertController.create({
      title: 'Unfollow?',
      message: 'Are you sure you want to unfollow?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.isFollowing = false;
            this.userSettings.unfavoriteTeam(this.team);

            let toast = this.toaster.create({
              message: 'You have unfollowed this team',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
        },
        { text: 'No' }
      ]
    });
    confirm.present();

  }

  refreshAll(refresher) {
    this.scheduleApi.refreshCurrentTourney().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    });
  }
}
