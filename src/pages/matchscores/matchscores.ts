import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";

@Component({
  selector: 'page-matchscores',
  templateUrl: 'matchscores.html',
})
export class MatchscoresPage {

  public partidos : Array<any> = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public global: GlobalProvider) {
  }

  ionViewWillEnter() {  
    this.getData(); 
  }

  getData(){
    let parameteres = {
            page: 'matchscores',
            id_torneo: this.global.id_torneo,
            id_partido: 25749,
            id_jugador: 5134,
    };
    this.http.post(this.global.url, parameteres).subscribe((resp) => {
      let data = resp.json();

      this.partidos=data.data.partidos;

    });
  }


}
