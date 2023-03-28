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
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { FavoriteProvider } from './../../providers/favorite/favorite';
import { UserProvider } from './../../providers/user/user';
import { ChallengePage } from "../challenge/challenge";
import { NewChallengeStep2Page } from "../newchallengestep2/newchallengestep2";

@Component({
  selector: 'page-challenges',
  templateUrl: 'challenges.html'
})
export class ChallengesPage {

  //public noticias : Array<any> = [];	
  public videos : Array<any> = [];	
  public noticias : Array<any> = [];
  public mychallenges : Array<any> = [];
  public allchallenges : Array<any> = [];

  public home=true;
  public userData:Array<any> = [];
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


  constructor(public favoriteProvider: FavoriteProvider,public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, public global: GlobalProvider,public user: UserProvider, private iab: InAppBrowser) {
  	
  	
  	
  	
  }

  ionViewWillEnter() { 
  	//this.getNoticias();
  		
  		if(this.global.user){
	  		
	  		console.log(this.global.user);
	  		
	  		let id=this.global.getPlayerData();
	  	this.getMyChallenges(this.global.user.LicenceId);
	  	this.getAllChallenges();
	  	
  		}else{
		  	//No hay usuario por lo que hay que mandarle al login
		  	this.navCtrl.setRoot(LoginPage);	
	  	}
  		
  		
  
    //this.getBanner();
    this.getVideos(); 
    //this.getScores(); 
    //this.getRankings(5);
    //this.getSalidas(); 
  }


  
  
  getMyChallenges(id){
	  
	  this.http.get(this.global.urlApiLocal+"/getChallenges.php?id="+id).subscribe((resp:any) => {
      	
      	this.mychallenges=resp.challenges;
      	console.log(this.mychallenges);
		});
  }
  
  getAllChallenges(){
	  
	  this.http.get(this.global.urlApiLocal+"/getChallenges.php").subscribe((resp:any) => {
      	
      	this.allchallenges=resp.challenges;
      	//console.log(this.allchallenges);
		});
  }
  
  
    getVideos(){
	  
   this.videos=this.global.videos;
	  
	   
  }
  
  
  
  

  
    openChallenge(challenge){
    let paramObj = { challenge: challenge };
    this.navCtrl.push(ChallengePage,paramObj);
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
	  
	  toNewChallenge() {
	  this.navCtrl.setRoot(NewChallengeStep2Page);
	  }


openMenu(id) {
	  
	  switch (id)
    {
      case 1 : 
          //this.nav.setRoot(TabsPage,{position:0});
          console.log(id);
          this.navCtrl.setRoot(HomePage);
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
      
      	this.navCtrl.setRoot(ChallengesPage);      
          break;
     
    }
}//Open Menu
	  
	  


}
