import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { ScoreCardPage } from "../scorecard/scorecard";
import { TournamentsPage } from "../tournaments/tournaments";
import { GolfsPage } from "../golfs/golfs";
import { HomePage } from "../home/home";
import { TeamPage } from '../team/team';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage {
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
  	this.pushPage = TeamPage;
  }

  ionViewWillEnter() { 
	  this.lineups=true;
	  console.log(this.lineups);
    this.getClubs();
  }

  openTeam(id){
  	this.navCtrl.push(TeamPage,{teamInfo: id});
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
          this.navCtrl.setRoot(AlertsPage);
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
	  
	  //console.log(this.global.token);
	 /*  let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'withCredentials': 'true'
    });
    
    headers.append('X-Auth-Token', '9SObubYiAtaQTQV7ZWaDXYB7Gx9Fk8+kjSBwUItYYWsd8Y9XPcFNLUskqwfMOcaOchI=');*/
    
    //let headers = new HttpHeaders({ 'X-Auth-Token': '9SObubYiAtaQTQV7ZWaDXYB7Gx9Fk8+kjSBwUItYYWsd8Y9XPcFNLUskqwfMOcaOchI=' });
    
    
   /* let reqOpts = {
	  headers: {

	    'X-Auth-Token': this.global.token,
	  }
	};
	
	        this.myHeader = new HttpHeaders({ 'Content-Type': 'x-www-form-urlencoded' });
												
			this.myHeader.set('X-Auth-Token', this.global.token);	*/								
    
    //let options = new RequestOptions({ headers: headers });
    
    
    
    
   /* options = new RequestOptions();
    
    let headers = new Headers();
            headers.append('X-Auth-Token', this.global.token);
            options.headers = headers;*/
    
    /*let headers = {
      "Content-type": 'x-www-form-urlencoded',
      "X-Auth-Token": this.global.token,
    };*/
    
   /* let headers: HttpHeaders = new HttpHeaders();
headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
headers = headers.append('X-Auth-Token', this.global.token);*/
	  /*
  	
    //this.http.get(this.global.url+"/clubs/2019", {headers}).subscribe((resp:any) => {
	    this.http.get(this.global.urlApiLocal+"/getClubs.php?token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    
      //console.log(resp);
      this.teams=JSON.parse(resp);
      console.log(this.teams);
    });  */
    
    
    this.teams=this.global.teams;
    
  }
}
