import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, ViewController } from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { GamePage } from "../game/game";
import { ScoreDetailPage } from "../score-detail/score-detail";
import { RankingPage } from "../ranking/ranking";
import { HomePage } from "../home/home";
import { TeamsPage } from '../teams/teams';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ActionSheetService} from "../../providers/ActionSheetService/ActionSheetService";

@Component({
  selector: 'page-scores',
  templateUrl: 'scores.html',
})
export class ScoresPage {

	public page = 1;
	public perPage = 5;

  //public partidos : Array<any> = [];
  public salidas:Array<any> = [];
    private rankingArray:any;
    private infoTorneo:any;
     public categoryName:any;
	 public loading:any;
  private flights=true;
  public fb_live_url:any;
  public botones : Array<any> = [];
  public rondaSwitch: string = "ronda1";
  public estaBuscando=false;
  
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


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public viewCtrl:ViewController, public global: GlobalProvider, public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, private iab: InAppBrowser, public actionSheetSvc: ActionSheetService) {
    
    	this.fb_live_url='http://admin.fgranks.com/static/redirect_fb_live.php';
    
     this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading Flights...'
    });
    this.loading.present();
    
    this.infoTorneo = this.navParams.get("infoTorneo");
    
    console.log(this.infoTorneo);
    //Genero los botones
    
      
    this.getSalidas(1).then(data => {
		    this.loading.dismiss();
		    });
    
    
    
    
  }

  ionViewWillEnter() {
      for (var _i = 1; _i <= this.global.rondas; _i++){
	        this.botones.push(
		        {
          text: 'Round ' + _i,
          //role: 'destructive',
          //icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            //console.log('Delete clicked');
            this.navCtrl.setRoot(ScoresPage,{slug: 'round_'+_i});
          }
        }
	        )
        }
        
               
        console.log(this.botones);
  }
  
  ionViewDidLoad(){
    
  }
  
  
  
   onSegmentChange(ronda) {
	  this.page=1;
	  console.log("Deberia cambiar a "+ronda);
	  
    this.initializeItems2();
    //var val = ev.target.value;
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading...'
    });
    this.loading.present();  
    
    this.getSalidas(ronda).then(data => { //Necesito el token, sin él no hago nada
	      
			  this.loading.dismiss();
	      
	    });
    
    
    
  }
  

   SearchPlayers(ev) {
    this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
	    console.log(this.rankingArray);
      this.salidas = this.rankingArray.filter((item) => {
        //return (item[0].nombre.toLowerCase().indexOf(val.toLowerCase()) > -1); //Devuelve true o false
        
        let valor=false;
        for (var _i = 0; _i < item.length; _i++){
	        if(item[_i].nombre.toLowerCase().indexOf(val.toLowerCase()) > -1){
		        valor=true;
	        }
        }
        return valor;
      })
    }
  }
   initializeItems() {
    this.salidas = this.rankingArray;
  }
  
  
  initializeItems2() {
    this.salidas = [];
  }
  

  
  
  SearchFlight(ev, ronda) {
    if(this.estaBuscando){this.loading.dismiss();}
    
    var val = ev.target.value;
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Searching...'
    });
    this.loading.present();  
    
    this.page=1;
    this.initializeItems2();
    console.log(val);
    this.searchSalidas(val, ronda);
    
    //this.loading.dismiss();
    
  }
  

  
  getSalidas(round){
	  
	    return new Promise(resolve => {

       var myGlobal=this.global;
	   
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

	    	
	 
	    	
	    	this.http.get(this.global.urlApiLocal+"/getData.php?e=competitionSquads/"+ this.infoTorneo.Id +"/"+this.infoTorneo.Year+"/"+round+"&s=&p="+this.page+"&l="+this.perPage+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
		    //console.log(resp);
		    for(let i=0; i<resp.length; i++) {
	          		
	          		
	          		/*var aux= new Date(resp[i].HourStart.date);
	          		var aux2="";
	          		console.log(aux);
	          		console.log(aux.toLocaleTimeString("fr-FR"));
	          		console.log(aux.toLocaleDateString("fr-FR", options));
	          		aux2=aux.toLocaleDateString("fr-FR", options) + " " + aux.toLocaleTimeString("fr-FR");
	          		resp[i].HourStart.date=aux2;*/
	          		
	          		var aux= resp[i].HourStart.date.substring(0, 16);
	          		resp[i].HourStart.date=aux;
			  		//this.fecha = aux[0];
	          		
		             this.salidas.push(resp[i]);
		            
	             //this.equipos.push(resp[i]);
	             //console.log(resp[i]);
	             //Voy a intentar sacar aqui los CompetitionSquads
	             
	           }
	           console.log(this.salidas);
	           resolve(this.salidas);
	           
    		});  	
    	
	    
    	});
    	    
         
  }
  
  
    searchSalidas( search, round){
	  
	  
	  if(search==undefined){
			  	search="";
		  	}
	  
	    return new Promise(resolve => {

       var myGlobal=this.global;
	   
var options = { weekday: 'long', timeStyle: 'medium', year: 'numeric', month: 'long', day: 'numeric' };

	    	
	 
	    	
	    	this.http.get(this.global.urlApiLocal+"/getData.php?e=competitionSquads/"+ this.infoTorneo.Id +"/"+this.infoTorneo.Year+"/"+round+"&s="+search+"&p="+this.page+"&l="+this.perPage+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
		    //console.log(resp);
		    for(let i=0; i<resp.length; i++) {
	          		
	          		
	          		/*var aux= new Date(resp[i].HourStart.date);
	          		var aux2="";
	          		console.log(aux);
	          		console.log(aux.toLocaleTimeString("fr-FR"));
	          		console.log(aux.toLocaleDateString("fr-FR", options));
	          		aux2=aux.toLocaleDateString("fr-FR", options)  + " " + aux.toLocaleTimeString("fr-FR");
	          		resp[i].HourStart.date=aux2;*/
	          		
	          		var aux= resp[i].HourStart.date.substring(0, 16);
	          		resp[i].HourStart.date=aux;
	          		
		             this.salidas.push(resp[i]);
		            
	             //this.equipos.push(resp[i]);
	             //console.log(resp[i]);
	             //Voy a intentar sacar aqui los CompetitionSquads
	             
	           }
	           console.log(this.salidas);
	           resolve(this.salidas);
	           
    		});  	
    	
    	this.loading.dismiss();
		  this.estaBuscando=false;
	    
    	});
    	    
         
  }
  
  
  
  
  
  
  openBrowser(){
	  	
	  	let target = "_system";	  	
    	this.iab.create(this.fb_live_url,target,this.options);
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
          this.navCtrl.setRoot(RankingPage,{slug: 'rankings_men'});
          break;
      case 3: 
      console.log(id);
          this.navCtrl.setRoot(ScoresPage,{slug: ''});
          break;
      case 5: 
          this.openBrowser();
          break;
     
    }
}//Open Menu


openMenuContextual() {
    
    
    this.actionSheetSvc.present([this.botones]);
    
    /*let actionSheet = this.actionsheetCtrl.create({
      title: 'Select Round',
      cssClass: 'action-sheets-basic-page',
      buttons: [this.botones]
    });
    actionSheet.present();*/
  } //OpenMenu
  
  
  doInfinite(infiniteScroll, round) {
		  this.page = this.page+1;
		  console.log(round);
	
	if(this.page!=0){
		
		setTimeout(() => {
		    
		    
			 this.getSalidas(round).then(data => {
		    infiniteScroll.complete();
		    });
			
		    console.log('Async operation has ended');
		    
		  }, 500);
		}
		
	}
  
  
}



