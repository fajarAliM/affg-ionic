import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PlayerScorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-player-score',
  templateUrl: 'player-score.html',
})
export class PlayerScorePage {
  public player:any;
  public index:any;
  public score:any;
  public par:any;
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.player = this.navParams.get("player");
    this.index = this.navParams.get("index");
    console.log(this.player);
    this.score = this.player.scores[this.index];
    this.par = this.player.pars[this.index];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerScorePage');
  }

}
