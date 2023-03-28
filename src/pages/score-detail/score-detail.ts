import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";


@Component({
  selector: 'page-score-detail',
  templateUrl: 'score-detail.html',
})
export class ScoreDetailPage {
  public score:any;
  public scoreId:any;
  constructor(public viewCtrl:ViewController, public http: HttpClient, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.scoreId = this.navParams.get("scoreId");
    this.getScore(this.scoreId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScoreDetailPage');
  }

  getScore(id){
    this.http.get(this.global.url+"/flight/read_by_flight.php?id_torneo="+this.global.id_torneo+"&flight_id="+id)
      .subscribe((res: any) => {
        console.log(res);
        this.score = res;  
    }, error => {
      console.log(error);
    }) 
  }

  getHoleScore(index){
    return this.score.resultados[index];
  }
}
