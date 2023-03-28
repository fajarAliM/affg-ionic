import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AddFormPage } from "../add-form/add-form";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { ScoresPage } from "../scores/scores";
import { HomePage } from "../home/home";
import { TeamsPage } from '../teams/teams';
import { RankingPage } from '../ranking/ranking';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { FlightsProvider } from './../../providers/flights/flights';


/**
 * Generated class for the AddScorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-score',
  templateUrl: 'add-score.html',
})
export class AddScorePage {
  public match:any;
  public flight:any;
  public fb_live_url:any;
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
  constructor(public global: GlobalProvider,public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, private iab: InAppBrowser, public flightsProvider: FlightsProvider, public viewCtrl:ViewController) {
	  
	  this.fb_live_url='http://admin.fgranks.com/static/redirect_fb_live.php';
	  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddScorePage');
  }
  openBrowser(){
	  	
	  	let target = "_system";	  	
    	this.iab.create(this.fb_live_url,target,this.options);
	}
  
  
  
  gotoMatch(){
	  
	  
	  //TODO: Animación chula de cargando por que esto tardará un ratito
	  
	    this.http.get(this.global.urlApiLocal+"/getFlight.php?file=true&id="+this.match+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
		      //console.log("partjghj");
	        this.flight=resp;
	        //this.resultados = res.records;   
	        //this.datos_jugador=this.resultados[0];
	        //console.log("esto si que se hace");
	        console.log(this.flight);
	        console.log("got to match: "+this.match);
	        
	        this.flightsProvider.saveFlight(this.flight);
	        
	        this.navCtrl.push(AddFormPage, {results:this.flight});
	        
	    }, error => {
	      console.log(error);
	    }); 
	  
	  
	  
	  
	  
	  
    
    //
  }
 

}
