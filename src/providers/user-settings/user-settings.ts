import { Injectable } from '@angular/core';
import { Storage as IonicStorage}  from '@ionic/storage'

@Injectable()
export class UserSettingsProvider {

  constructor(
    public storage: IonicStorage) {
    console.log('Hello UserSettingsProvider Provider');
  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
    this.storage.set(team.id.toString(), JSON.stringify(item));
  }

  unfavoriteTeam(team) {
    this.storage.remove(team.id.toString());
  }

  isFavoriteTeam(teamId: string) : Promise<boolean> {
    return this.storage.get(teamId).then(value => value ? true : false);
  }
  
  getAllFavorites() {
    let favTeams = [];
    this.storage.forEach(data => {
      favTeams.push(JSON.parse(data));
    });
    console.log('storage favorites', favTeams);
    return favTeams;
  }

}
