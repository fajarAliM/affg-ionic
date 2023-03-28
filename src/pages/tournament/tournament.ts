import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
//import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { PlayerPage } from '../player/player';
import { ScoreCardPage } from '../scorecard/scorecard';
import { ScoresPage } from '../scores/scores';
import { RankingPage } from '../ranking/ranking';
import { LoginPage } from "../login/login";
//import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';



@Component({
  selector: 'page-tournament',
  templateUrl: 'tournament.html',
})
export class TournamentPage {
  //private team:any;
  public infoCompeticion:any;
  public teamDBId:any;
  public competicionId:any;
  public sponsors:Array<any> = [];
  public background:any;
  public nombre:any;
  public localidad:any;
  public descripcion:any;
  public urlInscripcion:any;
  public fecha:any;
   public puntos:any;
   public redirectLiveRank:any;
   public pasado:any;
   public finTorneo:any;
   public horaFinal: any;
   public toLogin=false;
   
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
  //private director1:any;

  public tournamentSwitch: string = "info";
  
  constructor(public global: GlobalProvider, public http: HttpClient, public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer, private iab: InAppBrowser) {
  	//this.team ="players";
  	this.infoCompeticion = this.navParams.data.info;
  	console.log(this.infoCompeticion);
  	this.nombre=this.infoCompeticion.Name;
      this.localidad=this.infoCompeticion.Locality;
      this.descripcion=this.infoCompeticion.DescriptionLongue;
      var aux= this.infoCompeticion.Date1.date.split(" ");
	  this.fecha = aux[0];
	  
	  
	  if(this.global.user){
		  this.toLogin=false;
	  }else{
		  this.toLogin=true;
	  }
	  
	  
	  
	  //Ahora
	  var myDate = new Date().getTime();
	  console.log(myDate);
	  
	  //Debo sacar la última fecha para saber cuando termina
	  if(this.infoCompeticion.Date4 != null && this.infoCompeticion.Date4 != undefined){
		  this.finTorneo=this.infoCompeticion.Date4.date;
		  this.horaFinal= this.infoCompeticion.Heure4End;
	  }else if(this.infoCompeticion.Date3 != null && this.infoCompeticion.Date3 != undefined){
		  this.finTorneo=this.infoCompeticion.Date3.date;
		  this.horaFinal= this.infoCompeticion.Heure3End;
	  }else if(this.infoCompeticion.Date2 != null && this.infoCompeticion.Date2 != undefined){
		  this.finTorneo=this.infoCompeticion.Date2.date;
		  this.horaFinal= this.infoCompeticion.Heure2End;
	  }else{
		  this.finTorneo=this.infoCompeticion.Date1.date;
		  this.horaFinal= this.infoCompeticion.Heure1End;
	  }
	  
	  var arrayFechas=this.finTorneo.split(" ");
	  var fechaDeFinal=this.finTorneo;
	  console.log(arrayFechas);
	  // var arrayFechas2=this.horaFinal.split(" ");
	  var horaDeFinal=this.horaFinal;
	  
	  //this.finTorneo=fechaDeFinal + " " + horaDeFinal;
    this.finTorneo=arrayFechas[0] + " " + horaDeFinal;
	  
	  console.log( this.finTorneo);
	  
	  var cumpleanos = new Date(this.finTorneo).getTime();
	  cumpleanos = cumpleanos + 3600000; //Le sumo una hora
	
	console.log(cumpleanos);
  console.log(myDate);
	var transcurso = cumpleanos - myDate;
	
	console.log(transcurso);
	
	if(transcurso < 0){
		this.pasado=true;
	}else{
		this.pasado=false;
	}
	
	
	  ///console.log(moment(this.fecha).isAfter('2010-10-19'));
	  
	  //this.fecha=resp.Date1[0].date;
      //console.log(this.fecha);
      
      if(this.infoCompeticion.CompetitionMaster != null && this.infoCompeticion.CompetitionMaster != undefined){
      
      	this.puntos=this.infoCompeticion.CompetitionMaster.Scores;
      
      }else{
	      this.puntos=[];
      }
      
      this.competicionId=this.infoCompeticion.Id;
  	 this.redirectLiveRank=this.global.urlApiLocal+'/redirect.php?id='+this.infoCompeticion.Id;
  	
	  //this.urlInscripcion=this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.footgolf-france.fr/inscription/1");
	  this.urlInscripcion=this.domSanitizer.bypassSecurityTrustResourceUrl("http://localhost/zonainglesv3/");
  	
  	//this.teamDBId = this.navParams.data.id_database;
  	//console.log(this.infoCompeticion);
  	this.getSponsors();
  	//this.getPlayer();
  	//this.getAdmin();	
  }

  ionViewWillEnter() { 
   this.tournamentSwitch = "info";
  }
mivoid(){}
openCard(playerID){
    this.navCtrl.push(ScoreCardPage,{playerID});
  }


openLogin(){
	
	this.navCtrl.push(LoginPage);
	
}


getBackground(image) {
    return this.domSanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
	}


  openPlayer(player){
    this.navCtrl.push(PlayerPage,{player:player});
  }
  
   openRank(competicion){
	   this.tournamentSwitch = "rank";
    this.navCtrl.push(RankingPage,{infoTorneo:competicion});
  }
  
  openFlights(competicion){
	   this.tournamentSwitch = "flights";
	   console.log(competicion);
    this.navCtrl.push(ScoresPage,{infoTorneo:competicion});
  }
  

  getSponsors(){
  	//console.log(this.teamId);

    //this.http.get(this.global.url+"/club/"+this.teamId+"/"+this.global.anyo+"").subscribe((resp:any) => {
	    
	/*  this.http.get(this.global.urlApiLocal+"/getCompeticionInfo.php?file=true&id="+this.infoCompeticion.Id+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
      
      this.sponsors=resp;
      
      	//this.background=this.getBackground("https://www.footgolf-france.fr/media/cache/evenement/"+this.competicionId+"_"+this.global.anyo);

      //console.log(this.sponsors);

      
     

    }); */
    
     //this.http.get(this.global.url+"/clubs/2019", {headers}).subscribe((resp:any) => {
	    //this.http.get(this.global.urlApiLocal+"/getGolfs.php?file=true&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    this.http.get(this.global.urlApiLocal+"/getData.php?e=competitionSponsors/"+this.competicionId+"/"+this.infoCompeticion.Year+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    //this.http.get(this.global.url+"/golfs/1/150", {headers}).subscribe((resp:any) => {
	    
	    for(let i=0; i<resp.length; i++) {
             this.sponsors.push(resp[i]);
           }
	    
      //console.log(resp);
      //this.golfs=resp;
      //console.log(this.golfs);
    });  
    
    
  }


openBrowser(){
	  	
	  	let target = "_system";	  	
    	this.iab.create(this.redirectLiveRank,target,this.options);
	}

  
  
}
