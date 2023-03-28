import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams,HttpHeaders } from "@angular/common/http";
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
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	

	public page = 1;
	public pagev = 1;
	public perPage = 5;	
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


  constructor(
  public favoriteProvider: FavoriteProvider,
  public navCtrl: NavController, 
  public navParams: NavParams, 
  public http: HttpClient, 
  public alertCtrl: AlertController, 
  public global: GlobalProvider, 
  private iab: InAppBrowser,
  private domSanitizer: DomSanitizer

  ) {
  	
  }

  ionViewWillEnter() { 
	  
	  this.global.getAPIToken().then(data => { //Necesito el token, sin él no hago nada
		    	this.getNoticias();
				this.getVideos(); 
	    });
	  

    //this.getScores(); 
    //this.getRankings(5);
    //this.getSalidas(); 
  }


  
  
  getNoticias(){
	  
  //this.noticias=this.global.noticias;
    //this.http.get(this.global.urlApiLocal+"/getData.php?e=articles/7/fr_FR&l="+this.perPage+"&p="+this.page+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	  this.http.get(this.global.urlApiLocal+"/getData.php?e=articles/homepage/fr_FR&l="+this.perPage+"&p="+this.page+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {   
	    //this.http.get(this.global.url+"/golfs/1/150", {headers}).subscribe((resp:any) => {
		    let myresp=resp;
	    console.log(myresp.length);
	    for(let i=0; i<myresp.length; i++) {
			    this.noticias.push(myresp[i]);
		    
             
           }
	    
      console.log(this.noticias);
  
	   }); 
	   
  }
  
    getVideos(){
	  
   //this.videos=this.global.videos;
   
   //this.noticias=this.global.noticias;
     this.http.get(this.global.urlApiLocal+"/getData.php?e=articles/10/fr_FR&l="+this.perPage+"&p="+this.pagev+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    //this.http.get(this.global.url+"/golfs/1/150", {headers}).subscribe((resp:any) => {
		    let myresp=resp;
	    console.log(myresp.length);
	    for(let i=0; i<myresp.length; i++) {
		   	
		   	var StrippedString=myresp[i].Summary.replace(/(<([^>]+)>)/ig,"");
	      //console.log(StrippedString);
	      myresp[i].Summary = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+StrippedString);
		   	
             this.videos.push(myresp[i]);
           }
           
         
           
	    
      console.log(this.videos);
  
	   }); 
   
	  
	   
  }
  
  
  
  

  
    openNoticia(id_not){
    let paramObj = { noticia: id_not };
    this.navCtrl.push(NoticiaPage,paramObj);
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
	  
	  
  doInfiniteNoticias(infiniteScroll) {
		  this.page = this.page+1;

	
	if(this.page!=0){
		
		setTimeout(() => {
		    
		    this.getNoticias();
		
		    console.log('Async operation has ended');
		    infiniteScroll.complete();
		  }, 500);
		}
		
	}
	
	doInfiniteVideos(infiniteScroll) {
		  this.pagev = this.pagev+1;

	
	if(this.pagev!=0){
		
		setTimeout(() => {
		    
		    this.getVideos();
		
		    console.log('Async operation has ended');
		    infiniteScroll.complete();
		  }, 500);
		}
		
	}


}
