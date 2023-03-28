import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {

  public news:any;	
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	//console.log(this.navParams.data);
  	this.news=this.navParams.data.noticia;
  }

  ionViewWillEnter() {  
    this.news = this.navParams.data;
  }

}
