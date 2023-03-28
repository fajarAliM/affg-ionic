import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {

  public partidos : Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public global: GlobalProvider, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {  
    this.getData(); 
    //this.muestra_alert('titulo','texto'+this.navParams.get("id_part"));
  }

  getData(){
    let parameteres = {
            page: 'match',
            id_partido: this.navParams.get("id_part"),
            id_torneo: this.global.id_torneo
    };
    this.http.post(this.global.url, parameteres).subscribe((resp) => {
      let data = resp.json();

      this.partidos=data.data.partidos;

    });
  }
  muestra_alert(titulo,texto){
    const alert = this.alertCtrl.create({
      title: titulo, 
      subTitle: texto,
      buttons: ['OK']
    });
    alert.present();
  }

  verScores(test){
    this.muestra_alert('titulo','texto'+test);
  }

}
