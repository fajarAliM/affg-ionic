import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NoticiaPage } from "../noticia/noticia";
import { ScoreCardPage } from "../scorecard/scorecard";
import { TournamentsTypePage } from "../tournamentstype/tournamentstype";
import { ScoresPage } from "../scores/scores";
import { StaticPage } from "../static/static";
import { TeamsPage } from "../teams/teams";
import { GolfsPage } from "../golfs/golfs";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { FavoriteProvider } from './../../providers/favorite/favorite';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  //public noticias : Array<any> = [];	
  public videos : Array<any> = [];	
  public noticias : Array<any> = [];
  public ofertas : Array<any> = [];

  public home=true;

  public homeSwitch: string = "news";
  public options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
	};


  constructor(public favoriteProvider: FavoriteProvider,public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, public global: GlobalProvider, private iab: InAppBrowser) {
  	
  }

  ionViewWillEnter() { 
  	this.getNoticias();
    //this.getBanner();
    this.getVideos(); 
    //this.getScores(); 
    //this.getRankings(5);
    //this.getSalidas(); 
  }


  
  
  getNoticias(){
	  

	  this.noticias=this.global.noticias;
	  
	   
  }
  
    getVideos(){
	  
   this.videos=this.global.videos;
	  
	   
  }
  
  
  
  

  
    openNoticia(id_not){
    let paramObj = { id: id_not };
    this.navCtrl.push(StaticPage,paramObj);
  }
  
  muestra_alert(titulo,texto){
    const alert = this.alertCtrl.create({
      title: titulo, 
      subTitle: texto,
      buttons: ['OK']
    });
    alert.present();
  }


	  
	  openPage2() {
	  this.navCtrl.setRoot(ScoresPage,{slug: ''});
	  }


openMenu(id) {
	  
	  switch (id)
    {
      case 1 : 
          //this.nav.setRoot(TabsPage,{position:0});
          console.log(id);
          this.navCtrl.setRoot(DashboardPage);
          break;
      case 2: 
      console.log(id);
          this.navCtrl.setRoot(TeamsPage);
          break;    
      case 4: 
      console.log(id);
          this.navCtrl.setRoot(TournamentsTypePage);
          break;
      case 3: 
      console.log(id);
          this.navCtrl.setRoot(GolfsPage);
          break;
      case 5: 
          break;
     
    }
}//Open Menu
	  
	  


}
