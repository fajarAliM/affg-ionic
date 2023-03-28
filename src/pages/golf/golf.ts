import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { PlayerPage } from '../player/player';
import { GolfMapPage } from '../golfMap/golfMap';
import { ScoreCardPage } from '../scorecard/scorecard';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';




@Component({
  selector: 'page-golf',
  templateUrl: 'golf.html',
})
export class GolfPage {
  private golfId:any;
  public golfInfo:any;
  public descripcion:any;
  public titulo:any;
  public foto_principal:any;
  public urlBooking:any;
  public infoGolf:any;
  public golfPhotos:Array<any> = [];
  public localidad:any;
  public regiondoID:any;
  public greenFeesLink:any;
  public sistemaReserva:any;
  public tipoReservaRegiondo:any;
  public tipoReservaGreenFees:any;
  public direccion:any;
  public email:any;
  public telefono:any;
  public longitud:any;
  public latitud:any;
  public precio:any;
  public iframe:any;
  public tablaPrecios:any;
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

  public clubSwitch: string = "info";
  
  constructor(public global: GlobalProvider, public http: HttpClient, public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer, private iab: InAppBrowser, public launchNavigator: LaunchNavigator) {
  	//this.team ="players";
  	//console.log(this.navParams.data);
  	this.golfInfo = this.navParams.data.infoGolf;
  	//this.teamDBId = this.navParams.data.id_database;
  	//console.log(this.golfInfo);
  	this.getGolf();
  	//this.getPlayer();
  	//this.getAdmin();	
  }

  ionViewWillEnter() { 
   
  }
  
  openBrowser(url){
	  console.log(url);
	  	let target = "_system";	  	
    	this.iab.create(url,target,this.options);
	}
  
  
  getBackground(image) {
    return this.domSanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
	}
  
  
  navigate(){
	 this.launchNavigator.navigate([50.279306, -5.163158], {
	 	start: "50.342847, -4.749904"
	});
  }
  
  openMap(){
	console.log("Esto si");
	  	this.navCtrl.push(GolfMapPage,{golfs: this.golfInfo});

	
}

  getGolf(){
  	//console.log(this.teamId);

    //this.http.get(this.global.url+"/club/"+this.teamId+"/"+this.global.anyo+"").subscribe((resp:any) => {
	    
	    /*****
		    Ahora tengo que sacar la tablita de los precios haciendo la llamada que me quería evitar :-D
		    *****/
		    
		    
		    this.http.get(this.global.urlApiLocal+"/getData.php?e=golf/"+this.golfInfo.Id+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    //this.http.get(this.global.url+"/golfs/1/150", {headers}).subscribe((resp:any) => {
	    	
	    	
	    	console.log(resp);
	    	
	    	if(resp){
		    	
		    	this.tablaPrecios=resp.TarifsFromRegiondoApi;
		    	
	    	}
	    	
	    	
	    
      //console.log(resp);
      //this.golfs=resp;
      //console.log(this.golfs);
    }); 
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    	this.titulo=this.golfInfo.Name;
			this.descripcion=this.golfInfo.Description;
			this.localidad=this.golfInfo.Locality;
			this.direccion=this.golfInfo.Street+"<br/>"+this.golfInfo.PostalCode+", "+this.golfInfo.Locality;
			this.email=this.golfInfo.Mail;
			this.telefono=this.golfInfo.OfficePhone;
			this.longitud=this.golfInfo.NameParcours;
			this.latitud=this.golfInfo.NbParcours;
			this.infoGolf=this.golfInfo.InfosGolf;
			this.precio=this.golfInfo.InfosTarifs;
			this.foto_principal=this.getBackground("https://www.footgolf-france.fr/media/cache/golf/"+this.golfInfo.GolfPhotos[0].Slug);
			this.golfPhotos=this.golfInfo.GolfPhotos;
			this.sistemaReserva=false;
			
			if(this.golfInfo.LinkGreenfees){
				this.sistemaReserva=true;
				this.tipoReservaGreenFees=true;
				this.urlBooking=this.golfInfo.LinkGreenfees;
			}else{
				
				if(this.golfInfo.RegiondoId){
					this.sistemaReserva=true;
					this.tipoReservaRegiondo=true;
					this.iframe=this.golfInfo.RegiondoId;
					
					/**** Version 0.0.7 ****/
					// Ahora se les ha ocurrido devolver el iFrame entero...
					let inicio=this.iframe.indexOf('data-url="');
					
					let URLiframe= this.iframe.substring(inicio+10);
					console.log(URLiframe);
					inicio=URLiframe.indexOf('"');
					console.log(inicio);
					URLiframe=URLiframe.substring(0,inicio);
					
					console.log(URLiframe);
					
					this.urlBooking=this.domSanitizer.bypassSecurityTrustResourceUrl(URLiframe);
					
					//console.log(inicioURL);
					//this.urlBooking=this.domSanitizer.bypassSecurityTrustResourceUrl("https://foot-golf-france.regiondo.fr/bookingwidget/vendor/15713/id/"+this.golfInfo.RegiondoId+"?bookingwidget=1&secure=1");

				}
				
			}
	    
	    
	   /* this.http.get("http://localhost/AFFGApp/API/getGolf.php?id="+encodeURIComponent(this.golfId)+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
      
			this.golfInfo=JSON.parse(resp);
			
			console.log(this.golfInfo);
			
			this.titulo=this.golfInfo[0].Name;
			this.descripcion=this.golfInfo[0].Description;
			this.localidad=this.golfInfo[0].Locality;
			this.direccion=this.golfInfo[0].Street+"<br/>"+this.golfInfo[0].PostalCode+", "+this.golfInfo[0].Locality;
			this.email=this.golfInfo[0].Mail;
			this.telefono=this.golfInfo[0].OfficePhone;
			this.longitud=this.golfInfo[0].NameParcours;
			this.latitud=this.golfInfo[0].NbParcours;
			this.infoGolf=this.golfInfo[0].InfosGolf;
			this.precio=this.golfInfo[0].InfosTarifs;
			this.foto_principal=this.getBackground("https://www.footgolf-france.fr/media/cache/golf/"+this.golfInfo[0].GolfPhotos[0].Slug);
			this.golfPhotos=this.golfInfo[0].GolfPhotos;
			this.sistemaReserva=false;
			
			if(this.golfInfo[0].LinkGreenfees){
				this.sistemaReserva=true;
				this.tipoReservaGreenFees=true;
				this.urlBooking=this.golfInfo[0].LinkGreenfees;
			}else{
				
				if(this.golfInfo[0].RegiondoId){
					this.sistemaReserva=true;
					this.tipoReservaRegiondo=true;
					this.urlBooking=this.domSanitizer.bypassSecurityTrustResourceUrl("https://foot-golf-france.regiondo.fr/bookingwidget/vendor/15713/id/"+this.golfInfo[0].RegiondoId+"?bookingwidget=1&secure=1");

				}
				
			}
			
			
			
			
    		}); */
  }


  
  
}
