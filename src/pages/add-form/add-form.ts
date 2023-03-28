import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Slides, ActionSheetController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { ViewChild, ViewChildren } from '@angular/core';
import { SignaturePage } from '../signature/signature';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { MyFlightsPage } from '../myflights/myflights';

import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
declare var bodymovin: any

@Component({
  selector: 'page-add-form',
  templateUrl: 'add-form.html',
})
export class AddFormPage {
	public CardSlider:any;
  public match:any;
  public equipo:any="";
  public ronda:any=0;
    public rondaPlus:any=0;

  public rondaBus:any=0;
  public idCampo:any=0;
  public hoyo_salida:any;
  public campo_juego:any;
  public hora_inicio:any;
  public hoyos_fake : Array<any> = [];
    public estadoRonda : Array<any> = [];

  public resultados : Array<any> = [];
  public flights:any;
  public flight_encontrado:any;
  public loading:any;
    public matchOpen : Array<any> = [];
  public debug=false;
  public redirectLiveRank="";
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
  public profileForm = new FormGroup({
	  
	hole_0_1: new FormControl(''),
    hole_0_2: new FormControl(''),
    hole_0_3: new FormControl(''),
    hole_0_4: new FormControl(''),
    hole_0_5: new FormControl(''),
    hole_0_6: new FormControl(''),
    hole_0_7: new FormControl(''),
    hole_0_8: new FormControl(''),
    hole_0_9: new FormControl(''),
    hole_0_10: new FormControl(''),
    hole_0_11: new FormControl(''),
    hole_0_12: new FormControl(''),
    hole_0_13: new FormControl(''),
    hole_0_14: new FormControl(''),
    hole_0_15: new FormControl(''),
    hole_0_16: new FormControl(''),
    hole_0_17: new FormControl(''),
    hole_0_18: new FormControl(''),  
    
    LicenceId_0: new FormControl(''),
	  
    hole_1_1: new FormControl(''),
    hole_1_2: new FormControl(''),
    hole_1_3: new FormControl(''),
    hole_1_4: new FormControl(''),
    hole_1_5: new FormControl(''),
    hole_1_6: new FormControl(''),
    hole_1_7: new FormControl(''),
    hole_1_8: new FormControl(''),
    hole_1_9: new FormControl(''),
    hole_1_10: new FormControl(''),
    hole_1_11: new FormControl(''),
    hole_1_12: new FormControl(''),
    hole_1_13: new FormControl(''),
    hole_1_14: new FormControl(''),
    hole_1_15: new FormControl(''),
    hole_1_16: new FormControl(''),
    hole_1_17: new FormControl(''),
    hole_1_18: new FormControl(''),
    
    LicenceId_1: new FormControl(''),


    hole_2_1: new FormControl(''),
    hole_2_2: new FormControl(''),
    hole_2_3: new FormControl(''),
    hole_2_4: new FormControl(''),
    hole_2_5: new FormControl(''),
    hole_2_6: new FormControl(''),
    hole_2_7: new FormControl(''),
    hole_2_8: new FormControl(''),
    hole_2_9: new FormControl(''),
    hole_2_10: new FormControl(''),
    hole_2_11: new FormControl(''),
    hole_2_12: new FormControl(''),
    hole_2_13: new FormControl(''),
    hole_2_14: new FormControl(''),
    hole_2_15: new FormControl(''),
    hole_2_16: new FormControl(''),
    hole_2_17: new FormControl(''),
    hole_2_18: new FormControl(''),
    
    LicenceId_2: new FormControl(''),

    hole_3_1: new FormControl(''),
    hole_3_2: new FormControl(''),
    hole_3_3: new FormControl(''),
    hole_3_4: new FormControl(''),
    hole_3_5: new FormControl(''),
    hole_3_6: new FormControl(''),
    hole_3_7: new FormControl(''),
    hole_3_8: new FormControl(''),
    hole_3_9: new FormControl(''),
    hole_3_10: new FormControl(''),
    hole_3_11: new FormControl(''),
    hole_3_12: new FormControl(''),
    hole_3_13: new FormControl(''),
    hole_3_14: new FormControl(''),
    hole_3_15: new FormControl(''),
    hole_3_16: new FormControl(''),
    hole_3_17: new FormControl(''),
    hole_3_18: new FormControl(''),
    
    LicenceId_3: new FormControl(''),

  
    hole_4_1: new FormControl(''),
    hole_4_2: new FormControl(''),
    hole_4_3: new FormControl(''),
    hole_4_4: new FormControl(''),
    hole_4_5: new FormControl(''),
    hole_4_6: new FormControl(''),
    hole_4_7: new FormControl(''),
    hole_4_8: new FormControl(''),
    hole_4_9: new FormControl(''),
    hole_4_10: new FormControl(''),
    hole_4_11: new FormControl(''),
    hole_4_12: new FormControl(''),
    hole_4_13: new FormControl(''),
    hole_4_14: new FormControl(''),
    hole_4_15: new FormControl(''),
    hole_4_16: new FormControl(''),
    hole_4_17: new FormControl(''),
    hole_4_18: new FormControl(''),
    
    LicenceId_4: new FormControl(''),
    
    
     hole_5_1: new FormControl(''),
    hole_5_2: new FormControl(''),
    hole_5_3: new FormControl(''),
    hole_5_4: new FormControl(''),
    hole_5_5: new FormControl(''),
    hole_5_6: new FormControl(''),
    hole_5_7: new FormControl(''),
    hole_5_8: new FormControl(''),
    hole_5_9: new FormControl(''),
    hole_5_10: new FormControl(''),
    hole_5_11: new FormControl(''),
    hole_5_12: new FormControl(''),
    hole_5_13: new FormControl(''),
    hole_5_14: new FormControl(''),
    hole_5_15: new FormControl(''),
    hole_5_16: new FormControl(''),
    hole_5_17: new FormControl(''),
    hole_5_18: new FormControl(''),
    
    LicenceId_5: new FormControl(''),
    
  });
  

  
  
  
  public form : FormGroup;
  
  
  @ViewChild(Slides) aaaa: Slides;
  
  public results:any;

  public resultObjt:any;
    public resultadosObj:any;

  constructor(public viewCtrl:ViewController, public http: HttpClient,public global: GlobalProvider , public navCtrl: NavController, public navParams: NavParams, private _FB : FormBuilder, public actionsheetCtrl: ActionSheetController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private iab: InAppBrowser, public alertCtrl: AlertController) {
    this.flight_encontrado=true;
    this.match = this.navParams.get("results");
    this.rondaBus = this.navParams.get("ronda");
    this.matchOpen = this.navParams.get("matchOpen");
    //this.equipo = this.navParams.get("equipo");
    this.redirectLiveRank=this.global.urlApiLocal+'/redirect.php?id='+this.match.Id;
    console.log(this.ronda);
    console.log(this.match);
    
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading Flights...'
    });
    this.loading.present();
    
    this.getEquipo().then(data => { //Necesito el token, sin él no hago nada
	      
	      
	      
	      
	      if(data==null){
		      
		      //Debo devolver al usuario a la pantalla anterior
		      
		      this.showConfirm();
		      
		      
	      }
	      
	      /*for(var _k = 0; _k < this.equipo.Registers.length ; _k++){
		      
		      
		       this.estadoRonda[0]=this.equipo.Registers[_k].Round1Finished;
		       this.estadoRonda[1]=this.equipo.Registers[_k].Round2Finished;
		       this.estadoRonda[2]=this.equipo.Registers[_k].Round3Finished;
		       this.estadoRonda[3]=this.equipo.Registers[_k].Round4Finished;

		      
		      console.log("La ronda " + this.rondaBus + " es: " + this.estadoRonda[this.rondaBus-1]);
		      
		      
		      this.matchOpen[_k]=(!(this.estadoRonda[this.rondaBus-1]));
		      
		      console.log(this.matchOpen);
		      
	      }*/
	      //console.log(this.ronda);
		  //console.log(this.equipo.Registers[0]['Round'+this.rondaBus+'Finished']);
			  //Voy a asumir que si el primero no ha acabado la ronda, nadie lo ha acabado
			  /*if(!this.equipo.Registers[0]['Round'+this.rondaBus+'Finished']){
				  this.matchOpen=true;
			  }*/
			  
			  this.loading.dismiss();
			  
		
		  
	      
	    });
    
    console.log(this.match);
    //console.log(this.equipo);
    
    
    
    
    //this.getSalida(this.match);
    
    
    /* Construyo el formulario*/
    
     this.form = this._FB.group({
	     
	      hoyos     : this._FB.array([
	         this.initHoyoFields()
	      ])
	   });
	   
	   for (var _i = 0; _i < 18; _i++)
		   
		   this.hoyos_fake.push("");
		   
		   this.addNewInputField();
		   
	   }
	   
	  ionViewDidEnter(){
	  if(!this.flight_encontrado){
		  
		  bodymovin.loadAnimation({
             container: document.getElementById('lottie'), // Required
             path: 'assets/animations/notFound.json', // Required
            renderer: 'svg', // Required
            loop: true, // Optional
            autoplay: true, // Optional
            //                    name: "Hello World", // Name for future reference. Optional.
        });
		  
	  }
	  
	  
  } 
	   
	   
	   
	showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Flights non créés',
      message: 'Les flights n\'a été créé pour ce tour.',
      buttons: [
        {
          text: 'Retornez',
          handler: () => {
            //console.log('Disagree clicked');
            this.navCtrl.setRoot(MyFlightsPage);
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(MyFlightsPage);
          }
        }
      ]
    });
    confirm.present();
  }   
	   
	   
    showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
      
    });
    toast.present();
  }
 

   initHoyoFields(){
	   return this._FB.group({
	      valor : ['']
	   });
	}
	
	addNewInputField(){
      const control = <FormArray>this.form.controls.hoyos;
      control.push(this.initHoyoFields());
   }

  manage(val){
   console.dir(val);
	}

  getFight(id){
    this.http.get(this.global.url+"/flight/read_by_flight.php?id_torneo="+this.global.id_torneo+"&flight_id="+this.match)
    .subscribe((resp:any) => {
      console.log(resp);
    });
  }
  
  getSalida(results){
    
    	this.flight_encontrado=true;
	      	      
	      this.flights=this.match.results;
	      this.hora_inicio=this.match.info[0].HourStart.date;
	      this.ronda=this.match.info[0].Round;
	      console.log(this.flights);
	      
	      //this.ronda=resp.records[0][0].ronda + 1;
	      /*this.ronda=+resp.records[0][0].ronda;
	      this.campo_juego=resp.records[0][0].campo_juego;
	      this.hoyo_salida=resp.records[0][0].hoyo_salida;*/
		  //this.resultados=resp.records[0][0].hoyo_salida;
		  
		  /*for (var _i = 0; _i < resp.records[0].length; _i++){
			  
			  this.resultados.push(resp.records[0][_i].resultados[0].pars);
			  
		  }//Endfor*/
    
  }
  
  isMatchFinished(numJugador){
	  
	  //console.log(this.equipo.Registers[numJugador]['Round'+this.rondaPlus+'Finished']);
	  
	  return this.equipo.Registers[numJugador]['Round'+this.rondaPlus+'Finished'];
	  
	  
	  
  }
  
  
  getEquipo(){
	  
	  
	  var myglobal=this.global;
	  
	  return new Promise(resolve => {
	  
	  this.http.get(this.global.urlApiLocal+"/getData.php?e=competitionSquads/"+ this.match.Id +"/"+this.global.season+"/0&l=500&p=1&s=&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
		    //console.log(resp);
		    for(let i=0; i<resp.length; i++) {
	             
	             console.log(resp[i]);
	             
	             //Voy a buscar al jugador, si no no tiene sentido que lo inserte
	             var found = resp[i].Registers.find(function(element) {
				  return (element.LicenceId == myglobal.user.LicenceId);
				});
				
	             
	             if(found){
		             
		             if((resp[i].Round + 1)==this.rondaBus){
			         this.equipo=resp[i];
			         this.idCampo=this.equipo.NumParcours;
		             console.log("Equipo encontrado y añadido!");
		             console.log(resp[i]);
		             this.ronda=resp[i].Round;
		             console.log(this.ronda);
		             this.rondaPlus=this.ronda+1;
		             
		             
		             
		             
		             resolve(this.equipo);
		             break;
		             }
		             
		             
	             }
	             //this.equipos.push(resp[i]);
	             //console.log(resp[i]);
	             //Voy a intentar sacar aqui los CompetitionSquads
	             
	           }
	           
	           resolve(null);
	           
    		}); 
    		
    		
    	});	
	  
  }
  
  
  checkHoyoCompleto(hoyo){
	  
	  console.log("Estoy revisando el hoyo "+hoyo);
	  
	  for (var _i = 0; _i < this.equipo.Registers.length; _i++){
		  if(this.profileForm.value["hole_"+_i+"_"+hoyo]==""){
				  return false;
			  }
		}
		
		this.goToSlide((hoyo))
		//console.log("Debería pasar al hoyo "+ (hoyo+1));
		
		return true;
	  
	  
	  
  }
  
  
  checkHoyos(){
	  
	  console.log(this.profileForm.value);
	  
	  
	 
	  
	  for (var _i = 0; _i < this.equipo.Registers.length; _i++){
		  
		  for (var _j = 1; _j <= 18; _j++){
			  console.log("hole_"+_i+"_"+_j +": "+ this.profileForm.value["hole_"+_i+"_"+_j]);
			  if(this.profileForm.value["hole_"+_i+"_"+_j]==""){
				  return false;
			  }
			  
		  }
		  
	  }
	  
	  
	  return true;
		  
	  
  }
  
  
  goToSlide(id) {
	  
    this.aaaa.slideTo(id, 500);
  }
  
  
  openMenuContextual() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Select Ranking',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Hole 1',
          handler: () => {
            this.goToSlide(0);
          }
        },
        {
          text: 'Hole 2',
          handler: () => {
            this.goToSlide(1);
          }
        },
        {
          text: 'Hole 3',
          handler: () => {
            this.goToSlide(2);
          }
        },
        {
          text: 'Hole 4',
          handler: () => {
            this.goToSlide(3);
          }
        },
        {
          text: 'Hole 5',
          handler: () => {
            this.goToSlide(4);
          }
        },
        {
          text: 'Hole 6',
          handler: () => {
            this.goToSlide(5);
          }
        },
        {
          text: 'Hole 7',
          handler: () => {
            this.goToSlide(6);
          }
        },
        {
          text: 'Hole 8',
          handler: () => {
            this.goToSlide(7);
          }
        },
        {
          text: 'Hole 9',
          handler: () => {
            this.goToSlide(8);
          }
        },
        {
          text: 'Hole 10',
          handler: () => {
            this.goToSlide(9);
          }
        },
        {
          text: 'Hole 11',
          handler: () => {
            this.goToSlide(10);
          }
        },
        {
          text: 'Hole 12',
          handler: () => {
            this.goToSlide(11);
          }
        },
        {
          text: 'Hole 13',
          handler: () => {
            this.goToSlide(12);
          }
        },
        {
          text: 'Hole 14',
          handler: () => {
            this.goToSlide(13);
          }
        },
        {
          text: 'Hole 15',
          handler: () => {
            this.goToSlide(14);
          }
        },
        {
          text: 'Hole 16',
          handler: () => {
            this.goToSlide(15);
          }
        },
        {
          text: 'Hole 17',
          handler: () => {
            this.goToSlide(16);
          }
        },
        {
          text: 'Hole 18',
          handler: () => {
            this.goToSlide(17);
          }
        },
        
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          //icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  } //OpenMenu
  
 

  onSubmit() {
	  
	  
	  
	  /****** OJO ESTO LO HACeMOS DESPUES PERO AHORA HAY QUE COMPROBAR QUE TODO OK Y MANDARLO A LA FIRMA ******/
	  
	  if(this.checkHoyos()){ //Esto es si ha acabado
		  
		  this.navCtrl.push(SignaturePage, {info:this.match, equipo: this.equipo, results: this.profileForm.value});
		  
	  }else{ // Esto es si NO ha acabado
		  
		  /******
			  Grabamos los resultados parcialmente ****/
			  
			  let loading = this.loadingCtrl.create({
			      spinner: 'circles',
			      content: 'Saving Scores...'
			    });
			    loading.present();  
	  
    this.results= [];
    this.resultadosObj=[];
    //console.log(this.profileForm.value);
    var cont=0;
    var cont_jug=0;
    for (let item in this.profileForm.value) {
	    
	  if(cont==18){
		  
		  if(this.profileForm.value[item] != undefined){
			  
			  this.resultadosObj.push ({
			  	'player_id':this.profileForm.value[item],
			  	'golpes':this.results
	    		});
			  this.results= [];
			  cont=0;
			  cont_jug++;
			  
		  }
		  		  
		  
		  
	  }else{
		   this.results.push(this.profileForm.value[item]);
		   cont++;

	  } 
	    
      
      
    }
    
        console.log(this.resultadosObj);

    
    //console.log(this.results);
    this.resultObjt = {
      'ronda':this.equipo.Round,
      'finalizado':0,
      'idTorneo':this.match.Id,
      'token': this.global.token,
      'year': this.global.season,
      'resultados':this.resultadosObj
    }
    console.log(JSON.stringify(this.resultObjt));
	
	
   this.http.post(this.global.urlApiLocal+"/setData.php", JSON.stringify(this.resultObjt))
    .subscribe((resp:any) => {
      //console.log(resp);
      //this.navCtrl.pop();
      
      
      console.log(resp);
      
      loading.dismiss();
      if(resp.status==1){
	      this.showToast("Scores Saved");
      }else{
	      this.showToast("Error Saving Scores");
      }
      
    }, err =>{
      console.log(err);
    });

  }
		  

	  
	  
	/*let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Saving Scores...'
    });
    loading.present();  
	  
    this.results= [];
    this.resultadosObj=[];
    //console.log(this.profileForm.value);
    var cont=0;
    var cont_jug=0;
    for (let item in this.profileForm.value) {
	    
	  if(cont==18){		  
		  this.resultadosObj.push ({
		  	'player_id':this.profileForm.value[item],
		  	'golpes':this.results
    		});
		  this.results= [];
		  cont=0;
		  cont_jug++;
		  
	  }else{
		   this.results.push(this.profileForm.value[item]);
		   cont++;

	  } 
	    
      
      
    }
    
        console.log(this.resultadosObj);

    
    //console.log(this.results);
    this.resultObjt = {
      'flight_id':this.match,
      'resultados':this.resultadosObj
    }
    console.log(JSON.stringify(this.resultObjt));
	
	
   this.http.post(this.global.url+"/rankings/update.php?id_torneo="+this.global.id_torneo, JSON.stringify(this.resultObjt))
    .subscribe((resp:any) => {
      //console.log(resp);
      //this.navCtrl.pop();
      
      loading.dismiss();
      if(resp.message=="ok"){
	      this.showToast("Scores Saved");
      }else{
	      this.showToast("Error Saving Scores");
      }
      
    }, err =>{
      console.log(err);
    });

  }*/
  
  }
  
  
  openBrowser(){
	  	
	  	let target = "_system";	  	
    	this.iab.create(this.redirectLiveRank,target,this.options);
	}
  
  //4X9L36
}