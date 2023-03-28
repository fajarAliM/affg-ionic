import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { ScoreCardPage } from "../scorecard/scorecard";
import { GolfsPage } from "../golfs/golfs";
import { ScoresPage } from "../scores/scores";
import { HomePage } from "../home/home";
import { TeamsPage } from '../teams/teams';
import { TournamentsPage } from '../tournaments/tournaments';

//import { TeamPage } from '../team/team';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-tournamentstype',
  templateUrl: 'tournamentstype.html',
})
export class TournamentsTypePage {
	private rankings:any;
  public tournaments:Array<any> = [];
  private pushPage:any;
  public menuItems:any;
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
  	
  	this.rankings=true;
	 
	  this.getTournamentsTypes();
  	
  }

  ionViewWillEnter() { 
	  
  }


	
	openTournaments(id){
		
		
		//console.log(this.global.menuItems);
		this.navCtrl.push(TournamentsPage,{type: id});
		//this.navCtrl.setRoot(TournamentsPage,{type: id});
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
          break;
     
    }
}//Open Menu
  
  getTournamentsTypes(){
    
    const headers = new HttpHeaders({
	  'Content-Type': 'application/json;',
	  'X-Auth-Token': this.global.token
	});
  	
	    //this.http.get(this.global.urlApiLocal+"/getGolfs.php?file=true&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    this.http.get(this.global.urlApiLocal+"/getData.php?e=competitionKinds/"+this.global.season+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    //this.http.get(this.global.url+"/golfs/1/150", {headers}).subscribe((resp:any) => {
	    
	    for(let i=0; i<resp.length; i++) {
             this.tournaments.push(resp[i]);
           }
	    console.log(this.tournaments);
      //console.log(resp);
      //this.golfs=resp;
      //console.log(this.golfs);
    });  
    
  }
  
 
  
  
}
