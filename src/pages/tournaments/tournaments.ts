import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { format } from 'date-fns';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { ScoreCardPage } from "../scorecard/scorecard";
import { GolfsPage } from "../golfs/golfs";
import { TournamentPage } from "../tournament/tournament";
import { SearchTournamentsPage } from "../searchtournaments/searchtournaments";
import { TournamentsTypePage } from "../tournamentstype/tournamentstype";

import { HomePage } from "../home/home";
import { TeamsPage } from "../teams/teams";

//import { TeamPage } from '../team/team';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
	
	public page = 1;
	public perPage = 15;
	
	private rankings:any;
  private tournaments:Array<any> = [];
  private tournamentsClosed:Array<any> = [];
  private pushPage:any;
  public dateArray:any[];
  public fecha:any;
  public tournamentType:any;
    public tournamentSwitch: string = "open";

  
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
  constructor(public global: GlobalProvider, public http: HttpClient, public navCtrl: NavController,public viewCtrl:ViewController, public navParams: NavParams, private iab: InAppBrowser) {
  	//this.pushPage = TeamPage;
  	this.tournamentType = this.navParams.data.type;
  	console.log(this.tournamentType);
  }

  ionViewWillEnter() { 
	  this.rankings=true;
	  this.getTournaments();
	  this.getTournamentsClosed();
  }


	
	openTournament(id){
		  	this.navCtrl.push(TournamentPage,{info: id});

	}
	
	openSearch(){
		  	this.navCtrl.push(SearchTournamentsPage,{type: this.tournamentType});

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
}
  
  getTournaments(){
   		
   		const headers = new HttpHeaders({
	  'Content-Type': 'application/json;',
	  'X-Auth-Token': this.global.token
	});
  	
  	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  	
    //this.http.get(this.global.url+"/clubs/2019", {headers}).subscribe((resp:any) => {
	    //this.http.get(this.global.urlApiLocal+"/getGolfs.php?file=true&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    this.http.get(this.global.urlApiLocal+"/getData.php?e=competitions/"+this.global.season+"/"+this.tournamentType.Id+"&s=OPEN&l="+this.perPage+"&p="+this.page+"&&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    //this.http.get(this.global.url+"/golfs/1/150", {headers}).subscribe((resp:any) => {
	    console.log(resp);
	    
	    
	    
	    for(let i=0; i<resp.length; i++) {
		    
		    var aux= resp[i].Date1.date.split(" ");
		    
		    //resp[i].Date1.date=aux.toLocaleDateString("fr-FR", options);
		    //resp[i].Date1.date=format(aux, "dd/MM/yyyy");
		    resp[i].Date1.date=aux[0];
		    
             this.tournaments.push(resp[i]);
           }
	    
      //console.log(resp);
      //this.golfs=resp;
      //console.log(this.golfs);
    });  
   		 
  }
  
  getTournamentsClosed(){
   		
   		const headers = new HttpHeaders({
	  'Content-Type': 'application/json;',
	  'X-Auth-Token': this.global.token
	});
  	
  	
  	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  	
    //this.http.get(this.global.url+"/clubs/2019", {headers}).subscribe((resp:any) => {
	    //this.http.get(this.global.urlApiLocal+"/getGolfs.php?file=true&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    this.http.get(this.global.urlApiLocal+"/getData.php?e=competitions/"+this.global.season+"/"+this.tournamentType.Id+"&s=CLOSE&l="+this.perPage+"&p="+this.page+"&&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    //this.http.get(this.global.url+"/golfs/1/150", {headers}).subscribe((resp:any) => {
	    console.log(resp);
	    for(let i=0; i<resp.length; i++) {
		    
		   var aux= resp[i].Date1.date.split(" ");
		    
		    //resp[i].Date1.date=aux.toLocaleDateString("fr-FR", options);
		    //resp[i].Date1.date=format(aux, "dd/MM/yyyy");
		    resp[i].Date1.date=aux[0];
             this.tournamentsClosed.push(resp[i]);
           }
	    
      //console.log(resp);
      //this.golfs=resp;
      //console.log(this.golfs);
    });  
   		 
  }
  
  
  
  Search(ev) {
    //this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.searchTournaments(val);
    }
  }
  
  searchTournaments(string){
   		
   		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

   		
   		const headers = new HttpHeaders({
	  'Content-Type': 'application/json;',
	  'X-Auth-Token': this.global.token
	});
  	
  	this.tournaments.length=0;
  	
    //this.http.get(this.global.url+"/clubs/2019", {headers}).subscribe((resp:any) => {
	    //this.http.get(this.global.urlApiLocal+"/getGolfs.php?file=true&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    this.http.get(this.global.urlApiLocal+"/getData.php?e=competitions/"+this.global.season+"/"+this.tournamentType.Id+"&s="+string+"&l="+this.perPage+"&p="+this.page+"&&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    //this.http.get(this.global.url+"/golfs/1/150", {headers}).subscribe((resp:any) => {
	    console.log(resp);
	    for(let i=0; i<resp.length; i++) {
		    
		    var aux= resp[i].Date1.date.split(" ");
		    
		    //resp[i].Date1.date=aux.toLocaleDateString("fr-FR", options);
		    //resp[i].Date1.date=format(aux, "dd/MM/yyyy");
		    resp[i].Date1.date=aux[0];
             this.tournaments.push(resp[i]);
           }
	    
      //console.log(resp);
      //this.golfs=resp;
      //console.log(this.golfs);
    });  
   		 
  }
  
  
  
   doInfinite(infiniteScroll) {
		  this.page = this.page+1;

	
	if(this.page!=0){
		
		setTimeout(() => {
		    
		    this.getTournaments();
		
		    console.log('Async operation has ended');
		    infiniteScroll.complete();
		  }, 500);
		}
		
	}
   
   doInfinite2(infiniteScroll) {
		  this.page = this.page+1;

	
	if(this.page!=0){
		
		setTimeout(() => {
		    
		    this.getTournamentsClosed();
		
		    console.log('Async operation has ended');
		    infiniteScroll.complete();
		  }, 500);
		}
		
	}
  
}
