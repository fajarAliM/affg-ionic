import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NoticiaPage } from '../noticia/noticia';
import { RankingPage } from '../ranking/ranking';
import { NewsPage } from '../news/news';
import { ScoresPage } from '../scores/scores';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;

  position:any;

  homeRoot = HomePage
  newsRoot = NewsPage
  scoresRoot = ScoresPage
  rankingsRoot = RankingPage
  //moreRoot = MorePage


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	console.log(this.navParams.get("position"));	
  }

  ionViewWillEnter() { 
  	this.position = this.navParams.get("position");
  	if(this.position==1){
  		this.tabRef.select(1);
  	}else if(this.position==2){
  		this.tabRef.select(2);
  	}else if(this.position==3){
  		this.tabRef.select(3);
  	}
  	else if(this.position==4){
  		this.tabRef.select(4);
  	}   
  }

}
