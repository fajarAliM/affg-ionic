import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  private game:any;
  public partidos : Array<any> = [];
  constructor(public http: Http, public global: GlobalProvider, public alertCtrl: AlertController, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewWillEnter() {  
    this.game = this.navParams.data;
    this.getData();     
  }

  getData(){
    let parameteres = {
            page: 'match',
            id_partido: this.game,
            id_torneo: this.global.id_torneo
    };
    this.http.post(this.global.url, parameteres).subscribe((resp) => {
      let data = resp.json();

      let restInfo = JSON.stringify(data); 

      console.log(JSON.parse(restInfo));

      this.partidos=data.data.partidos;

    });
  }

}
