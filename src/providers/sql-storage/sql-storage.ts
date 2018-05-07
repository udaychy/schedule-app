import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlStorageProvider {
  private db: SQLiteObject;

  constructor(private sqLite: SQLite) {
    console.log('Hello SqlStorageProvider Provider');
  }

  getAll() {
    return this.db.executeSql('SELECT key, value FROM kv', [])
      .then(data => {
        console.log('getAll', data);
        let results = [];
        for (let i = 0; i < data.rows.length; i++) {
          results.push(JSON.parse(data.rows.item(i).value));
        }
        return results;
      });
  }

  get(key: string) {
    return this.db.executeSql('select key, value from kv where key = ? limit 1', [key])
      .then(data => {
        console.log('get', data);
        if (data.rows.length > 0) {
          return JSON.parse(data.rows.item(0).value);
        }
      });
  }

  remove(key: string) {
    return this.db.executeSql('delete from kv where key = ?', [key]);
  }

  set(key: string, value: any) {
    return this.db.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value])
      .then(data => {
        console.log('set', data);
        if (data.rows.length > 0) {
          return JSON.parse(data.rows.item(0).value);
        }
      });
  }

  initializeDatabase() {
    return this.sqLite.create({ name: 'data.db', location: 'default' })
      .then(db => {
        debugger;
        this.db = db;
        return this.db.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', [])
          .then(data => {
            console.log('initializeDatabase', data);
            console.log('after CREATE TABLE check', data);
          });
      });
  }
}
