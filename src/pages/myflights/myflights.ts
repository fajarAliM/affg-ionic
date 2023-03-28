import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, AlertController , ToastController} from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { GamePage } from "../game/game";
import { ScoreDetailPage } from "../score-detail/score-detail";
import { RankingPage } from "../ranking/ranking";
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";
import { AddScorePage } from "../add-score/add-score";
import { TeamsPage } from '../teams/teams';
import { GolfsPage } from '../golfs/golfs';
import { TournamentsTypePage } from '../tournamentstype/tournamentstype';
import { TournamentPage } from '../tournament/tournament';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ActionSheetService} from "../../providers/ActionSheetService/ActionSheetService";
//import { FlightsProvider } from './../../providers/flights/flights';
import { AddFormPage } from "../add-form/add-form";


@Component({
  selector: 'page-myflights',
  templateUrl: 'myflights.html',
})
export class MyFlightsPage {

  //public partidos : Array<any> = [];
    public match:any;
  public flight:any;
  private salidas:Array<any> = [];
  private salidasPasadas:Array<any> = [];
  private salidasBuscador:Array<any> = [];
  private equipos:Array<any> = [];
  private equiposPasadas:Array<any> = [];
    private rankingArray:any;
    private slug:any;
     public categoryName:any;
	 public loading:any;
  private flights=true;
  public fb_live_url:any;
  public botones : Array<any> = [];
  public rondas:Array<any> = [];
  public rondasp:Array<any> = [];
  public logged:any;

  
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

public tournamentSwitch: string = "futuras";

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: HttpClient, 
  	public global: GlobalProvider, 
  	public actionsheetCtrl: ActionSheetController, 
  	public loadingCtrl: LoadingController, 
  	private iab: InAppBrowser, 
  	public actionSheetSvc: ActionSheetService, 
  	public alertCtrl: AlertController, 
  	public toastCtrl: ToastController) {
    
    	this.fb_live_url='http://admin.fgranks.com/static/redirect_fb_live.php';
    
     this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading Flights...'
    });
    this.loading.present();
    
    if(this.global.user){
	    this.logged=true;
	    console.log(this.global.user);
	    
	    
	    this.pintaSalidasOpen().then(data => { //Necesito el token, sin él no hago nada
	      
		  
		  this.pintaSalidasClosed().then(data => {
		  
			  console.log(this.salidas);
			  console.log(this.salidasPasadas);
			  this.loading.dismiss();
			  
			});
		
		});
		  
	      
	    
	    
	    
    }else{
	    this.loading.dismiss();
	    //this.navCtrl.setRoot(LoginPage);
	    this.navCtrl.push(LoginPage);
	    
	    this.logged=false;
	    
    }

	
	    
    
    //Genero los botones
    
      
    
    
    
    
    
  }

  ionViewWillEnter() {
     	
     	
		//this.pintaSalidas();
               
        //console.log(this.botones);
  }
  
  ionViewDidLoad(){
     
  }
  

openLogin(){
	
	this.navCtrl.push(LoginPage);
	
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
  
  /*Search(ev) {
    //this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.searchTournaments(val);
    }
  }
    searchTournaments(string){
   		

  	
  	console.log(string);
    //this.http.get(this.global.url+"/clubs/2019", {headers}).subscribe((resp:any) => {
	    //this.http.get(this.global.urlApiLocal+"/getGolfs.php?file=true&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    this.http.get(this.global.urlApiLocal+"/getData.php?e=licence/competitions/"+this.tournamentType.Id+"&s="+string+"&l="+this.perPage+"&p="+this.page+"&&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    //this.http.get(this.global.url+"/golfs/1/150", {headers}).subscribe((resp:any) => {
	    console.log(resp);
	    for(let i=0; i<resp.length; i++) {
             this.salidasBuscador.push(resp[i]);
           }
	    
	    
	    this.tournamentSwitch = "buscador";
	    
      //console.log(resp);
      //this.golfs=resp;
      //console.log(this.golfs);
    });  
   		 
  }*/
  
  
  pintaSalidasOpen(){
	  
	  /*this.flightsProvider.getAll().then(result => {
      		this.salidas = result;
      		console.log( this.salidas);
    		});*/
    		
    	//this.http.get(this.global.urlApiLocal+"/getData.php?e=licence/competitions/"+this.global.user.LicenceId+"/2019/&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    return new Promise(resolve => {
	    	this.http.get(this.global.urlApiLocal+"/getData.php?e=licence/competitions/"+this.global.user.LicenceId+"/"+this.global.season+"&s=OPEN&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
		    console.log(resp);
		    
		    
		    if(resp != null){
		    
		    for(let i=0; i<resp.length; i++) {
			    	
			    //Hay que añadir tantos como NbRounds hay
			    
			    
			    
			    for(let _j=1; _j <= resp[i].NbRounds; _j++){
				    console.log(_j);
				    var aux=resp[i];
				    this.rondas.push(_j);
					    this.salidas.push(aux);
				    /*var horaInicio=new Date(resp[i]["Heure"+_j+"Start"].date.replace(' ', 'T'));
				    var horaFin=new Date(resp[i]["Heure"+_j+"End"].date.replace(' ', 'T'));
				    var hoy=new Date();
				    
				    if( (horaInicio < hoy) && (hoy < horaFin) ){
					    //aux.ronda=_j;
					    
					    
					    
				    }else{
					    //aux.ronda=_j;
					    this.rondasp.push(_j);
					    this.salidasPasadas.push(aux);
				    }
				    
				    console.log(this.rondas);
				    console.log(this.rondasp);*/
				    
			    }
			    
			    	
			    	
			  
	             
	           }
	           
	           }
	           
	           //this.getEquipos().then(data2 =>{
		           
	           	resolve(this.salidas);
	           
	           //});
	           
    		});  	
    	
    	});	
	  
  }
  
  
  pintaSalidasClosed(){
	  
	  /*this.flightsProvider.getAll().then(result => {
      		this.salidas = result;
      		console.log( this.salidas);
    		});*/
    		
    	//this.http.get(this.global.urlApiLocal+"/getData.php?e=licence/competitions/"+this.global.user.LicenceId+"/2019/&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    return new Promise(resolve => {
	    	this.http.get(this.global.urlApiLocal+"/getData.php?e=licence/competitions/"+this.global.user.LicenceId+"/"+this.global.season+"&s=CLOSE&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
		    console.log(resp);
		    if(resp != null){
		    for(let i=0; i<resp.length; i++) {
			    	
			    //Hay que añadir tantos como NbRounds hay
			    
			    
			    
			    for(let _j=1; _j <= resp[i].NbRounds; _j++){
				    console.log(_j);
				    var aux=resp[i];
				    this.rondasp.push(_j);
					    this.salidasPasadas.push(aux);
				    /*var horaInicio=new Date(resp[i]["Heure"+_j+"Start"].date.replace(' ', 'T'));
				    var horaFin=new Date(resp[i]["Heure"+_j+"End"].date.replace(' ', 'T'));
				    var hoy=new Date();
				    
				    if( (horaInicio < hoy) && (hoy < horaFin) ){
					    //aux.ronda=_j;
					    this.rondas.push(_j);
					    this.salidas.push(aux);
					    
					    
				    }else{
					    //aux.ronda=_j;
					    
				    }*/
		
				    
			    }
			    
			    	
			    	
			  
	             
	           }
	           
	           }
	           
	           
	           //this.getEquipos().then(data2 =>{
		           
	           	resolve(this.salidasPasadas);
	           
	           //});
	           
    		});  	
    	
    	});	
	  
  }
  
  
  
  getEquipos(){
	  
	  /*this.flightsProvider.getAll().then(result => {
      		this.salidas = result;
      		console.log( this.salidas);
    		});*/
    		
    	//this.http.get(this.global.urlApiLocal+"/getData.php?e=licence/competitions/"+this.global.user.LicenceId+"/2019/&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	   
	   var myGlobal=this.global;
	   
	   return new Promise(resolve => {
	    	
	    for(let _i=0; _i<this.salidas.length; _i++) {	
	    	
	    	this.http.get(this.global.urlApiLocal+"/getData.php?e=competitionSquads/"+ this.salidas[_i].Id +"/"+this.global.season+"/1/100&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
		    //console.log(resp);
		    for(let i=0; i<resp.length; i++) {
	             
	             //Voy a buscar al jugador, si no no tiene sentido que lo inserte
	             var found = resp[i].Registers.find(function(element) {
				  return element.LicenceId == myGlobal.user.LicenceId;
				});
	             
	             if(found){
		             this.equipos.push(resp[i]);
		             console.log("Equipo encontrado y añadido!");
		             console.log(resp[i]);
	             }
	             //this.equipos.push(resp[i]);
	             //console.log(resp[i]);
	             //Voy a intentar sacar aqui los CompetitionSquads
	             
	           }
	           
	           
    		});  	
    	}
	    
	    for(let _i=0; _i<this.salidasPasadas.length; _i++) {	
	    	
	    	this.http.get(this.global.urlApiLocal+"/getData.php?e=competitionSquads/"+ this.salidasPasadas[_i].Id +"/"+this.global.season+"/1/100&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
		    //console.log(resp);
		    for(let i=0; i<resp.length; i++) {
	             
	             //Voy a buscar al jugador, si no no tiene sentido que lo inserte
	             var found = resp[i].Registers.find(function(element) {
				  return element.LicenceId == myGlobal.user.LicenceId;
				});
	             
	             if(found){
		             this.equiposPasadas.push(resp[i]);
		             console.log("Equipo encontrado y añadido!");
		             console.log(resp[i]);
	             }
	             //this.equipos.push(resp[i]);
	             //console.log(resp[i]);
	             //Voy a intentar sacar aqui los CompetitionSquads
	             
	           }
	           
	           
    		});  	
    	}
    	
    	resolve(this.equipos);
    	
    	});
	  
  }
  
   

  
  
  /*gotoMatch(flightID){
	  
	  
	  //TODO: Animación chula de cargando por que esto tardará un ratito
	  return new Promise(resolve => {
	    this.http.get(this.global.urlApiLocal+"/getFlight.php?file=true&id="+flightID+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
		      //console.log("partjghj");
	        this.flight=resp;
	        //this.resultados = res.records;   
	        //this.datos_jugador=this.resultados[0];
	        //console.log("esto si que se hace");
	        console.log(this.flight);
	        console.log("got to match: "+flightID);
	        
	        this.flightsProvider.saveFlight(this.flight);
	        this.loading.dismiss();
	        this.navCtrl.push(AddFormPage, {results:this.flight});
	        
	    }, error => {
	      this.showToast("Error loading Flight. Probably the Flight ID is incorrect.");
	      this.loading.dismiss();
	      //return false;
	    }); 
	  
	  
	  
	  });

  }*/
  
  goToMatch(salida, equipo){
	  
	  console.log(salida);
	  console.log(equipo);
	  
  }
  
  
  showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
      
    });
    toast.present();
  }
  
  
   /*deleteFlight(flight){
	  console.log("Hay que borrar");
	  
	  for (let i = 0; i < this.salidas.length ; i++) {
			let item = this.salidas[i];
			if(item.info[0].FlightID == flight.info[0].FlightID){
				//console.log("Está presente");
				this.salidas.splice(i, 1);
			}
		}
	  
	  
	  this.flightsProvider.deleteFlight(flight).then(data => { 
		 //this.pintaSalidas();
		 this.navCtrl.setRoot(this.navCtrl.getActive().component);
	      console.log(data);
	    });
	  
//this.pintaSalidas();	  
  }*/
  
  openTournament(id){
		  	this.navCtrl.push(TournamentPage,{info: id});

	}
  
  openFlight(flight, ronda, matchOpen){
	  
	  var found = this.equipos.findIndex(function(element) {
				  return element.CompetitionId == flight.Id;
		});
	  
	  console.log(flight);
	  //console.log(this.equipos[found]);
	  
	    this.navCtrl.push(AddFormPage, {results:flight, ronda:ronda, matchOpen: matchOpen});
         
  }
  
  openFlightPasadas(flight, ronda){
	  
	  var found = this.equiposPasadas.findIndex(function(element) {
				  return element.CompetitionId == flight.Id;
		});
	  
	  console.log(flight);
	  //console.log(this.equiposPasadas[found]);
	  
	    this.navCtrl.push(AddFormPage, {results:flight, ronda:ronda});
         
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


openMenuContextual() {
    
    
    this.actionSheetSvc.present([this.botones]);
    
    /*let actionSheet = this.actionsheetCtrl.create({
      title: 'Select Round',
      cssClass: 'action-sheets-basic-page',
      buttons: [this.botones]
    });
    actionSheet.present();*/
  } //OpenMenu
  
}



