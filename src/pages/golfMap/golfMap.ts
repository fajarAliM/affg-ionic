import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { ScoreCardPage } from "../scorecard/scorecard";
import { RankingPage } from "../ranking/ranking";
import { ScoresPage } from "../scores/scores";
import { HomePage } from "../home/home";
import { GolfPage } from '../golf/golf';
import { TeamsPage } from '../teams/teams';
import { TournamentsTypePage } from '../tournamentstype/tournamentstype';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { GolfsPage } from '../golfs/golfs';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Observable } from 'rxjs/Rx';
import leaflet from 'leaflet';
import places from '../../assets/data';





@Component({
  selector: 'page-golfMap',
  templateUrl: 'golfMap.html',
})
export class GolfMapPage {
  @ViewChild('map') mapContainer: ElementRef;
map: any;
  currentPosition: Geoposition;
  markerGroup: any;
  placesGroup: any;
  data = places;
  gpsEnabled: boolean;
			
	/*** Variables Scroll infinito **/
	public page = 1;
	public perPage = 10;
	public homeSwitch: string = "map";
	private courses:any;
  private golfs:any;
  private pushPage:any;
  public fb_live_url:any;
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
  constructor(public global: GlobalProvider, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, public toastCtrl: ToastController, public geolocation:Geolocation, public alertController: AlertController, public locationAccuracy: LocationAccuracy) {
	  
	      this.golfs = this.navParams.get("golfs");
	      
	      console.log(this.golfs);
	  
	  this.fb_live_url='http://admin.fgranks.com/static/redirect_fb_live.php';
  	this.pushPage = GolfPage;
  	
  	
  }


  ionViewDidEnter(){
	  
	  //this.getGolfs();  
    		this.cargoMapas();

    
    /*this.removeHereMarker();
      this.addHereMarker();
      this.addPlaces();*/
    
	  
	  
  }
  
  
    openList(id){
	  //console.log(id);
  	this.navCtrl.setRoot(GolfsPage);

  }
  

 
 
 cargoMapas(){
	 if (this.map == null)
      this.loadmap();
    let promises = new Array();
          this.addPlaces();

    promises.push(this.requestLocation());
    promises.push(this.getLocation());
    Observable.forkJoin(promises).subscribe((data:any) => {
      this.currentPosition = data[1];
      this.removeHereMarker();
      this.addHereMarker();
    },
    (err:any) => {
      if (this.map == null)
        this.loadmap();
      let alert = this.alertController.create({
        title: "GPS Error",
        message: "Ensure that GPS is enabled and ready"
      });
      alert.present();
    });
 }
 
 
  addHereMarker() {
    this.markerGroup = leaflet.featureGroup();
    let marker: any = leaflet.marker([this.currentPosition.coords.latitude, this.currentPosition.coords.longitude]).on('click', () => { 
      var popup = leaflet.popup()
            .setLatLng([this.currentPosition.coords.latitude, this.currentPosition.coords.longitude])
            .setContent("<p>You are here</p>")
            .openOn(this.map);
      popup.openPopup();
    });
    var latLngs = [ marker.getLatLng() ];
    var markerBounds = leaflet.latLngBounds(latLngs);
    this.map.fitBounds(markerBounds);
    this.markerGroup.addLayer(marker);
    this.map.addLayer(this.markerGroup);
  }

  addPlaces() {
    this.placesGroup = leaflet.featureGroup();
    
    var Icono = leaflet.icon({
iconUrl: "./assets/imgs/minigolf.png",
iconSize: [32, 32],
iconAnchor: [32, 32],
shadowSize: [0, 0],
popupAnchor: [0, -40]
});
    
    
   var p = this.golfs;
	    console.log(p);
	    
	    var image='';
	    
	    if(p.GolfPhotos){
		    
	    
      let placeMarker = leaflet.marker([p.Latitude, p.Longitude], {icon: Icono}).on('click', () => {
        var popup = leaflet.popup()
              .setLatLng([p.NbParcours, p.NameParcours])
              .setContent(`<h3>` + p.Name + `</h3>` + 
                          `<p>` + p.Street + ' - ' + p.Locality + '('+ p.PostalCode + `)</p>` +
                          `<p>` + p.MobilePhone + ' - ' + p.OfficePhone + '('+ p.PostalCode + `)</p>` +
                          `<img src="https://www.footgolf-france.fr/media/cache/golf/` + p.GolfPhotos[0].Slug + `"</img>`)
              .openOn(this.map);
        popup.openPopup();
      });
      this.placesGroup.addLayer(placeMarker);
      
      }
      
    
    this.map.addLayer(this.placesGroup);
    
    
    /*
    for (let p of this.data.places) {
	    console.log(p);
      let placeMarker = leaflet.marker([p.lat, p.lng]).on('click', () => {
        var popup = leaflet.popup()
              .setLatLng([p.lat, p.lng])
              .setContent(`<h3>` + p.title + `</h3>` + 
                          `<p>` + p.description + `</p>` +
                          `<img src="` + p.url + `"</img>`)
              .openOn(this.map);
        popup.openPopup();
      });
      this.placesGroup.addLayer(placeMarker);
    }
    this.map.addLayer(this.placesGroup);*/
  }

  getLocation() : Promise<Geoposition> {
    return this.geolocation.getCurrentPosition();
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 13
    }).addTo(this.map);
  }

  removeHereMarker() {
    if (this.map == null || this.markerGroup == undefined)
      return;
    this.map.removeLayer(this.markerGroup);
  }

  requestLocation() : Promise<void> {
    return this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest) {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            this.gpsEnabled = true;
          },
          error => {
            this.gpsEnabled = false;
            let alert = this.alertController.create({
              title: "GPS Error",
              message: "Ensure that GPS is enabled and ready"
            });
            alert.present();
          }
        );
      }
    });
  }

  updateLocation() {
    if (this.map != null) {
      let promises = new Array();
      promises.push(this.requestLocation());
      promises.push(this.getLocation());
      Observable.forkJoin(promises).subscribe((data:any) => {
        this.currentPosition = data[1];
        this.removeHereMarker();
        this.addHereMarker();
        this.addPlaces();
      },
      (err:any) => {
        let alert = this.alertController.create({
          title: "GPS Error",
          message: "Ensure that GPS is enabled and ready"
        });
        alert.present();
      });    
    }     
  }

 
 
   
  openGolf(id){
	  //console.log(id);
  	this.navCtrl.push(GolfPage,{infoGolf: id});
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
  
  getGolfs(){
  	
  	const headers = new HttpHeaders({
	  'Content-Type': 'application/json;',
	  'X-Auth-Token': this.global.token
	});
  	
    //this.http.get(this.global.url+"/clubs/2019", {headers}).subscribe((resp:any) => {
	    //this.http.get(this.global.urlApiLocal+"/getGolfs.php?file=true&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    this.http.get(this.global.urlApiLocal+"/getData.php?e=golfs&s=&l=250&p=1&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    //this.http.get(this.global.url+"/golfs/1/150", {headers}).subscribe((resp:any) => {
	    
	    for(let i=0; i<resp.length; i++) {
             this.golfs.push(resp[i]);
           }

	    //this.initMap(this.golfs)
      //console.log(this.golfs);
      //this.golfs=resp;
      //console.log(this.golfs);
    });  
  }
  
  
  
  
  
  doInfinite(infiniteScroll) {
		  this.page = this.page+1;

	
	if(this.page!=0){
		
		setTimeout(() => {
		    
		    this.getGolfs();
		
		    console.log('Async operation has ended');
		    infiniteScroll.complete();
		  }, 500);
		}
		
	}

  
  
  
}
