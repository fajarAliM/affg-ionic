import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { ScoreCardPage } from "../scorecard/scorecard";
import { TournamentsPage } from "../tournaments/tournaments";
import { GolfsPage } from "../golfs/golfs";
import { HomePage } from "../home/home";
import { MyTeamPage } from '../myteam/myteam';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-myteams',
  templateUrl: 'myteams.html',
})
export class MyTeamsPage {
	private lineups:any;
  private teams:any[];
  private pushPage:any;
  public myHeader:any;
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
  constructor(public global: GlobalProvider, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
  	this.pushPage = MyTeamPage;
  }

  ionViewWillEnter() { 
	  this.lineups=true;
	  console.log(this.lineups);
    this.getClubs();
  }

  openTeam(id){
  	this.navCtrl.push(MyTeamPage,{teamInfo: id});
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
          this.navCtrl.setRoot(MyTeamsPage);
          break;    
      case 4: 
      console.log(id);
          this.navCtrl.setRoot(TournamentsPage);
          break;
      case 3: 
      console.log(id);
          this.navCtrl.setRoot(GolfsPage);
          break;
      case 5: 
          break;
     
    }
}//Open Menu
  
  getClubs(){
    
    
    this.teams=this.global.teams;
    
  }
}
