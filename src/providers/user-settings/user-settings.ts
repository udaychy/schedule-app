import { Injectable } from '@angular/core';
import { Storage as IonicStorage}  from '@ionic/storage'
import { SqlStorageProvider } from '../sql-storage/sql-storage';

const win: any = window;

@Injectable()
export class UserSettingsProvider {
  private sqlMode = false;

  constructor(
    public storage: IonicStorage,
    private sql: SqlStorageProvider) {
    console.log('Hello UserSettingsProvider Provider');

    if (win.sqlitePlugin) {
      this.sqlMode = true;
      console.log('SQLite supports');
    } else {
      console.warn('SQLite plugin not installed, Falling back to regular Ionic Storage');
    }
  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };

    (this.sqlMode ? this.sql : this.storage)
      .set(team.id.toString(), JSON.stringify(item));
  }

  unfavoriteTeam(team) {
    //this.storage.remove(team.id.toString());
    (this.sqlMode ? this.sql : this.storage)
      .remove(team.id.toString());
  }

  isFavoriteTeam(teamId: string) : Promise<boolean> {
    return (this.sqlMode ? this.sql : this.storage).
      get(teamId).then(value => value ? true : false);
  }
  
  getAllFavorites(): Promise<any[]> {
    if (this.sqlMode) {
      return this.sql.getAll();
    } else {
      return new Promise(resolve => {
        let favTeams = [];
        this.storage.forEach(data => {
          favTeams.push(JSON.parse(data));
        });
        console.log('storage favorites', favTeams);
        return resolve(favTeams);
      });
    }
  }

  initStorage(): Promise<any> {
    if (this.sqlMode) {
      return this.sql.initializeDatabase();
    } else {
      return new Promise(resolve => resolve());
    }
  }

}
