import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';

@Injectable()
export class CommonProvider {

  private DEFAULT_LOADER_CONTENT = "Loading";

  constructor(private loadingCtrl: LoadingController) { }

  displayLoader(content: string = this.DEFAULT_LOADER_CONTENT) {
    let loading = this.loadingCtrl.create({
      content: content
    });

    return new Promise<Loading>((resolve, reject) => {
      loading.present()
        .then(() => { resolve(loading); })
        .catch((error) => { reject(error); })
    })
  }
}
