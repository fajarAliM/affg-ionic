import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import {Platform,  NavController, NavParams, Events} from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import {Storage} from '@ionic/storage';


/***** Modelos ******/
import {User} from '../../models/user';




@Injectable()
export class GlobalProvider {
  public url: string;
  public id_torneo: number;
  public tipo_torneo: number;
  public tournamentTypes: any;
  public torneo_naciones: any;
  public url_assets: string;
  public language:string;
  public locale:string;
  public menuItems:any;
  public rondas:any;
  public anyo:number;
  public token:any;
  public textHeaders:any;
  public textOptions:any;
  public textOutput:any;
  public myHeader:any;
  public urlApiLocal:any;
  public teams:any[];
  public noticias : Array<any> = [];
  public videos:any[];
  public playerData:any;
  public usuarioLogeado:any;
  public idUser:any;
  public user: User;
  public season="2022";
  /*public dataUser["name"]:any;
  public dataUser["surname"]:any;
  public dataUser["id"]:any;
  public dataUser["email"]:any;
  public dataUser["city"]:any;
  public dataUser["photo"]:any;
  public dataUser["points"]:any;
  public dataUser["username"]:any;*/
   

  constructor(
  	public http: HttpClient,
  	public platform: Platform, 
  	private domSanitizer: DomSanitizer, 
  	public storage: Storage,
  	public events: Events
  	) {
  	this.url="https://www.footgolf-france.fr/api"; 
  	//this.url="https://preprod.footgolf-france.fr/api"; 
  	//this.id_torneo;
  	this.torneo_naciones=true;
  	this.usuarioLogeado=false;
  	this.tipo_torneo=1; // Footgolf
  	this.url_assets="https://fgranks.com/fifg/assets/img/app/torneos/"; 
  	//this.urlApiLocal="http://localhost/AFFGApp/API";
  	//this.urlApiLocal="https://admin.fgranks.com/apiaffg";
  	this.urlApiLocal="https://affg.aklame.com";
  	this.language='fr';
  	this.locale='fr_FR';
  	this.anyo = new Date().getFullYear();
  	
  	
  	
  }
  
  logout(): void {
        //this.alerts = 0;
        this.storage.remove('DATAUSERAFFG');
        this.user=null;
        this.events.publish('user:logout');
        //this.nav.setRoot(LandingPage)
        
        /*this.api.get(`removeDevice/${this.device}`, null, null, this.user.api_token).subscribe((resp) => {
        }, (message) => {
        });
        //   this._user = null; // provoca un error por el ng-if del menú y volver a la página principal*/
        //this.events.publish('user:logout');
    };
  
  
  setTournamentId(id){
	  
	  this.id_torneo=id;
	  this.getMenu();
	  
	  
	  //Saco el numero de rondas
	  this.getNumerRounds();
	  
  }
  
  setPlayerData(data){
	  
	  /*return new Promise(resolve => {
	  
	  this.usuarioLogeado=true;
	  
	  let fila = {
            name: '',
            id: '',
            surname: '', 
            username: '',
            email: '',
            city: '',
            photo: '',
            points: 0

	    };
	  
	  fila.name=data.name;
	  fila.surname=data.surname;
	  fila.id=data.id;
	  fila.username=data.username;
	  fila.email=data.email;
	  fila.city=data.city;
	  fila.photo=data.photo;
	  fila.points=data.points;
	  
	  
	  this.idUser=data.id;
	  
	  console.log(data.id);
	  
	  });*/
	  
	  /*this.nativeStorage.setItem('playerData', {property: 'value', anotherProperty: 'anotherValue'})
		  .then(
		    () => console.log('Player Stored!'),
		    error => console.error('Error storing item', error)
		  );*/
	  
	  this.user=new User(data);
	  
	  this.storage.set('DATAUSERAFFG', this.user);
	  
      this.events.publish('user:login');

  }
  
  
  getPlayerData(){
	  
	  return this.user;
	  
  }
  
  userLogged(){
	  
	  var logueado=false;
	  
	  this.storage.forEach((value, key) => {
                switch (key) {
                    case 'DATAUSERAFFG':
                    	if(value) {
	                    	logueado=true;
	                    	//this.user=value;
	                    	console.log(this.user);
                    	}else{
	                    	logueado=false;
                    	}
                    break;
                    
                }
                
            }).then(() => {
	           return logueado;
                
            });
  }
  
  
  
  updatePlayerData(){
	  
	/*  let data;
	  //console.log("Me llaman y devuelvo:" + this.idUser);
	   this.nativeStorage.getItem('playerData').then(
	    data =>  console.log(data),
	    error => console.error(error)
	  );
	  
	  return data;*/
	  
	  
	  //
            this.storage.forEach((value, key) => {
                switch (key) {
                    case 'DATAUSERAFFG':
                    	console.log(value);
                    	if(value) {
	                    	//let user: User = new User();
	                    	this.user=value;
	                    	console.log(this.user);
                    	}
                    break;
                    
                }
                
            }).then(() => {
	            console.log(this.user);
                console.log("usuario cargado ok");
            });
	  
	  
  }
  
  /*loggedIn() {
        this.storage.set(this.appConfig.PREFIX_STORAGE + 'api_token', this.user.api_token);
        this.events.publish('user:login');
    }

    logout(): void {
        this.storage.remove(this.appConfig.PREFIX_STORAGE + 'api_token');
        this.events.publish('user:logout');
    };*/
  
  
  getMenuItems(){
	  return this.menuItems;
  }
 
  getMenu(){
	  		  
	    this.http.get(this.urlApiLocal+"/getMenu.php").subscribe((resp:any) => {
	      //console.log(resp.secciones);
	      this.menuItems = resp.secciones;
	      this.season = resp.season;
	      console.log(this.season);
	    }); 
		  

    
  } // GetMenu
  
  
    getCommonData(){
	  	
	  	/**** MENU ****/
	  		  
	    this.http.get(this.urlApiLocal+"/getMenu.php").subscribe((resp:any) => {
	      //console.log(resp.secciones);
	      this.menuItems = resp.secciones;
	    }); 
	    

	    
		  

    
  } // GetMenu
  
  
  getTournamentsTypes(){
    
	this.http.get(this.urlApiLocal+"/getTiposCompeticiones.php?file=true&token="+encodeURIComponent(this.token)).subscribe((resp:any) => {
      
      this.tournamentTypes=resp;
      //console.log(this.tournaments);
    });  
  }
  
  
   
  
   getVideos(){
	  

	  		  
		//SOLO LAS DE PORTADA  
	    this.http.get(this.urlApiLocal+"/getNoticias.php?id=10&file=true&locale="+encodeURIComponent(this.locale)+"&token="+encodeURIComponent(this.token)).subscribe((resp:any) => {
	    
      //console.log(resp);
      this.videos=resp;  
	  
	  
	   var i=0;
      for (let entry of this.videos) {
	      
	      var StrippedString=this.videos[i].Summary.replace(/(<([^>]+)>)/ig,"");
	      //console.log(StrippedString);
	      this.videos[i].Summary = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+StrippedString);
	  	i++;
	  	
		}
    
    //console.log(this.videos);
	  

    }); 
    
   
	  
	   
  }

  
  
  
  getAPIToken(){
	  
	  return new Promise(resolve => {
		  
		  	let bodyParam = new FormData();
	
		    bodyParam.append('login', 'admin_api');
		    bodyParam.append('password', 'TEST');
		    //bodyParam.append('login', 'admin_api');
		    //bodyParam.append('password', 'test');
			// bodyParam.append('I like it', 'text'); // This doesn't work either
			
			//this.textOptions = new RequestOptions({ headers: this.textHeaders});
			let login ="admin_api";
			let pass= "TEST";
			//let pass= "test";
			/*
		    let resultObjt = {
		      'login':login,
		      'password':pass
		    }*/
	
	        this.myHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
	        
	        let formData = new FormData();
	        formData.append('login', login);
	        formData.append('password', pass);
	
		    
		    this.http.post(this.url+"/login", formData, this.myHeader).subscribe((resp:any) => {
		      //console.log(resp);
		      //this.menuItems = resp.secciones;
		      let respuesta=JSON.parse(resp);
		      this.token=respuesta.token;
		      resolve(this.token);
		      console.log(this.token);		    
	    		}, err => {
			console.log(err);
    		});
		  
		});
    
  } // GetAPIToken
  

  
  
  
  
  
  
    getNumerRounds(){
	  
	  let url_api = this.url+"/salidas/read_number_rounds.php?id_torneo="+this.id_torneo;

	  
	    this.http.get(url_api)
          .subscribe((res: any) => {
            //this.scores1 = round.filter(round => round.numero_ronda == "1");
            this.rondas = res.rondas;
                    //this.rankingArray = res.records;

            console.log(this.rondas);
      
      	
      
        }, error => {
          console.log(error);
        });
	  
  }
  

}
