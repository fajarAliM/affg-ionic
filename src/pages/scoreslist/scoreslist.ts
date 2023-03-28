import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";

@Component({
  selector: 'page-scoreslist',
  templateUrl: 'scoreslist.html',
})
export class ScoreslistPage {

  public partidos : Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public global: GlobalProvider) {
    console.log("entro el veneno");
  }

  ionViewWillEnter() {   
  }
    
}
