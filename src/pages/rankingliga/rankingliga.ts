import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController, ViewController } from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { PlayerPage } from '../player/player';
import { ScoreCardPage } from '../scorecard/scorecard';
import { ScoresPage } from "../scores/scores";
import { HomePage } from "../home/home";
import { TeamsPage } from '../teams/teams';
import { RankingTeamPage } from '../rankingteam/rankingteam';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { FavoriteProvider } from './../../providers/favorite/favorite';


@Component({
  selector: 'page-rankingliga',
  templateUrl: 'rankingliga.html',
})
export class RankingLigaPage {
	
public page = 1;
	public perPage = 20;	
	
  public listado : Array<any> = [];
  public scores : Array<any> = [];
  public diferencias : Array<any> = [];
  public isFavorite : Array<any> = [];
  public rondas : Array<any> = [];
  private ranking:Array<any> = [];
  private rankingArray:Array<any> = [];
  private jugadores:Array<any> = [];
  private jugadoresArray:Array<any> = [];
  private idTorneo:any;
  private tipo:any;
  private infoTorneo:any;
  private categoryName:any;
  private rankings=true;
  public loading:any;
  public rankingSwitch: string = "absolute";
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

  constructor(public favoriteProvider: FavoriteProvider,public navCtrl: NavController, public viewCtrl:ViewController, public navParams: NavParams, public http: HttpClient, public global: GlobalProvider, public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, private iab: InAppBrowser) {
	
	
	this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading Rankings...'
    });
    this.loading.present();  
	  
    //this.idTorneo = this.navParams.get("id");
    
    //Puede ser que sea una liga
    
	    
	    this.idTorneo=1;
	    this.infoTorneo=JSON.parse('{"Id":1,"Year":'+this.global.season+',"Name":"FootGolf CUP","Color":"#318ce7"}');
	    this.tipo="liga";
	    	this.getRankLiga("ABSOLUTE").then(data => {
		    	this.loading.dismiss();
		    });
      
    
    
    	    
    //console.log(this.favoriteProvider.getAllFavoritePlayers());
    
    
  }

    ionViewWillEnter(){
     
  	}

 


  onSegmentChange(liga) {
	  this.page=1;
	  console.log("Deberia cambiar a "+liga);
	  
    this.initializeItems();
    //var val = ev.target.value;
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading...'
    });
    this.loading.present();  
    
    this.getRankLiga(liga).then(data => { //Necesito el token, sin él no hago nada
	      
			  this.loading.dismiss();
	      
	    });
    
    
    
  }
 
  
   getRankLiga(liga){
		  
		  console.log(liga);
		  
		  //liga="/"+liga;
		  this.idTorneo=1;
		  var tipo_liga="affg";
		  //var search="";
		  
		  switch(liga){
			  
			  case "EQUIPE":{
			  	tipo_liga="affgEquipe";
			  	liga="";
	
			  	break;
			  }
			  
			  case "CLUBS":{
			  	tipo_liga="club";
			  	liga="";
			  	break;
			  }
			  
			  case "WOMEN":{
			  	this.idTorneo=62;
			  	liga="/ABSOLUTE";
			  	break;
			  }
			  
			  case "SENIOR":{
			  	this.idTorneo=1;
			  	liga="/SENIOR";
			  	//search="Vétéran >= 46 ans";
			  	break;
			  }
        
        case "DAMESCLUBS":{
          this.idTorneo=62;
          tipo_liga="club";
          liga="";
          break;
        }
			  
			  
			  default: { 
		      //statements;
		      this.idTorneo=1;
		      liga="/"+liga;
		      break; 
   			} 
			  
			  
		  }
		  
		  /*if(liga=="EQUIPE"){
			  tipo_liga="affgEquipe";
			  liga="";
		  }
		  if(liga=="CLUBS"){
			  tipo_liga="club";
			  liga="";
		  }
		  
		  if(liga=="WOMEN"){
			  this.idTorneo=6;
			  console.log(this.idTorneo);
		  }*/
		  
		  
		   return new Promise(resolve => {
		  
		  //this.http.get(this.global.urlApiLocal+"/getCompeticion.php?file=true&id="+this.idTorneo+"&token="+encodeURIComponent(this.global.token))
		  this.http.get(this.global.urlApiLocal+"/getData.php?e=competitionRanking/"+tipo_liga+"/"+this.idTorneo+"/"+this.global.season+""+liga+"&s=&l="+this.perPage+"&p="+this.page+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
                 
        //console.log(this.ranking);
        
	        for(let i=0; i<resp.length; i++) {

			    this.ranking.push(resp[i]);
             this.rankingArray.push(resp[i]);
			     }

        
        //this.rondas=this.ranking[0].scores;

      
		for (var _i = 0; _i < this.ranking.length; _i++){
			
			//console.log(this.ranking[_i]);
			
			    this.favoriteProvider.isFavorite(this.ranking[_i].player_id).then(isFav => {
					this.isFavorite.push(isFav);
					//console.log(isFav);
		    	});
	     }//End for
          
          console.log(this.ranking);
          
   
		  resolve(this.ranking);
	});
		  
		  
		  });
		  
  } // Get Ranking
  
  
   
  
  
   SearchPlayers(ev, liga) {
    if(this.estaBuscando){this.loading.dismiss();}
    
    var val = ev.target.value;
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Searching...'
    });
    this.loading.present();  
    
    this.page=1;
    this.initializeItems();
    
    this.searchRankLiga(val, liga);
    
    //this.loading.dismiss();
    
  }
   initializeItems() {
    this.ranking = [];
    this.rankingArray=[];
  }


  
  
  
     searchRankLiga(search, liga){
		  
		  this.estaBuscando=true;
		  
		   if(search==undefined){
			  	search="";
		  	}
		  	
		  	//liga="/"+liga;
		  this.idTorneo=1;
		  var tipo_liga="affg";
		  //var search="";
		  
		  switch(liga){
			  
			  case "EQUIPE":{
			  	tipo_liga="affgEquipe";
			  	liga="";
	
			  	break;
			  }
			  
			  case "CLUBS":{
			  	tipo_liga="club";
			  	liga="";
			  	break;
			  }
			  
			  case "WOMEN":{
			  	this.idTorneo=6;
			  	liga="/ABSOLUTE";
			  	break;
			  }
			  
			  case "SENIOR":{
			  	this.idTorneo=1;
			  	liga="/SENIOR";
			  	//search="Vétéran >= 46 ans";
			  	break;
			  }
			  
			  
			  default: { 
		      //statements;
		      this.idTorneo=1;
		      liga="/"+liga;
		      break; 
   			} 
			  
			  
		  }

		  	
		  	
		  	
		  
		  
		  //this.http.get(this.global.urlApiLocal+"/getCompeticion.php?file=true&id="+this.idTorneo+"&token="+encodeURIComponent(this.global.token))
		  this.http.get(this.global.urlApiLocal+"/getData.php?e=competitionRanking/"+tipo_liga+"/"+this.idTorneo+"/"+this.global.season+""+liga+"&s="+search+"&l="+this.perPage+"&p="+this.page+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
        /*this.ranking = res.results;
        this.rankingArray = res.results;
         
        console.log(this.ranking);*/
        	
        	this.initializeItems();
        	
	         for(let i=0; i<resp.length; i++) {
			 
			
			    
			    this.ranking.push(resp[i]);
             this.rankingArray.push(resp[i]);
			    
			   			 
		     
		     
		      
		     
	
	        
	       
	        }

        
        //this.rondas=this.ranking[0].scores;

      
		for (var _i = 0; _i < this.ranking.length; _i++){
			
			//console.log(this.ranking[_i]);
			
			    this.favoriteProvider.isFavorite(this.ranking[_i].player_id).then(isFav => {
					this.isFavorite.push(isFav);
					//console.log(isFav);
		    	});
	     }//End for
          
          console.log(this.ranking);
          this.loading.dismiss();
		  this.estaBuscando=false;
	});
		  
		  
		  
  } // Get Ranking
  
  
  
  getJugador(LicenceId, i){
	  
	  
	  return new Promise(resolve => {

	        
	        this.http.get(this.global.urlApiLocal+"/getData.php?e=licence/"+LicenceId+"/"+this.global.season+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
		      //console.log(resp.secciones);
			  
			  this.jugadores.push(resp);
			  //console.log(this.jugadores);
	        resolve(resp);
	        
             
           });
           
	});
	  
	  
  }
  
  


 doInfinite(infiniteScroll, liga) {
		  this.page = this.page+1;

	
	if(this.page!=0){
		
		setTimeout(() => {

			    this.getRankLiga(liga);
		    
		    
		
		    console.log('Async operation has ended');
		    infiniteScroll.complete();
		  }, 500);
		}
		
	}



  /*getCategory(cat){
    switch (cat)
    {
      case "rankings_men": 
          this.getRanking("men");
          this.categoryName = "Men";
          break;
      case "rankings_women": 
          this.getRanking("women");
          this.categoryName = "Women";
          break;
      case "rankings_senior": 
          this.getRanking("senior");
          this.categoryName = "Senior";
          break;
      case "rankings_junior": 
          this.getRanking("junior");
          this.categoryName = "Junior";
          break;
      case "rankings_team": 
          this.getRanking("team");
          this.categoryName = "Team";
          break;     
      case "rankings": 
          this.getRanking("");
          this.categoryName = "General";
          break;                                   
      default:
          this.getRanking(""); 
          break;
    }
  }*/

 

/*
  getRanking(cat){
	  
	  if(cat!=""){
		  
		  this.http.get(this.global.url+"/rankings/read_one.php?id_torneo="+this.global.id_torneo+"&categoria="+cat)
      .subscribe((res: any) => {
        this.ranking = res.records;
        this.rankingArray = res.records;
         
        //console.log(this.ranking);
        this.rondas=this.ranking[0].scores;
        
        
      
      
      
		for (var _i = 0; _i < this.ranking.length; _i++){
			
			//console.log(this.ranking[_i]);
			
			    this.favoriteProvider.isFavorite(this.ranking[_i].player_id).then(isFav => {
					this.isFavorite.push(isFav);
					//console.log(isFav);
		    	});
	     }//End for
          
          console.log(this.isFavorite);
          
    }, error => {
      console.log(error);
    }) 
		  
	  }else{ //Todos los resultados
		  
		  this.http.get(this.global.url+"/rankings/read.php?id_torneo="+this.global.id_torneo)
      .subscribe((res: any) => {
        this.ranking = res.records;
        this.rankingArray = res.records;
        //console.log(this.ranking); 
        
        this.rondas=this.ranking[0].scores;
        //console.log(this.ranking[0].num_rondas); 
        //console.log(this.ranking.scores);
        
         
         //console.log(this.diferencias);
         
         for (var _i = 0; _i < this.ranking.length; _i++){
			    this.favoriteProvider.isFavorite(this.ranking[_i].player_id).then(isFav => {
					this.isFavorite.push(isFav);
		    	});
	     }//End for
      
		
          
    }, error => {
      console.log(error);
    }) 
		  
		  } //IF
    
  } // Get Ranking
*/

 openCard(playerID){
    this.navCtrl.push(ScoreCardPage,{infoPlayer:playerID, infoTorneo: this.infoTorneo});
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
          this.navCtrl.setRoot(RankingLigaPage,{slug: 1});
          break;
      case 3: 
      console.log(id);
          this.navCtrl.setRoot(ScoresPage,{slug: ''});
          break;
      case 5: 
          break;
     
    }
}//Open Menu


favoritePlayer(player_id, index) {
    this.favoriteProvider.favoritePlayer(player_id).then(() => {
      this.isFavorite[index] = true;
    });
  } // Favorite
 
  unfavoritePlayer(player_id, index) {
    this.favoriteProvider.unfavoritePlayer(player_id).then(() => {
      this.isFavorite[index] = false;
    });
  }//Unfavorite


  

}
