import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad';


@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {
	signature = '';
  isDrawing = false;
	public CardSlider:any;
  public match:any;
  public equipo:any;
  public info:any;
  public ronda:any;
  public hoyo_salida:any;
  public loading:any;
  public campo_juego:any;
  public hora_inicio:any;
  public hoyos_fake : Array<any> = [];
  public resultados : Array<any> = [];
  public flights:any;
  public flight_encontrado:any;
  public showFirmas:any;
  public TotalPar=0;
  public Totales : Array<any> = [];
  public licenciaFirma : any;
  public numeroJugador: any;
  
    public results:any;

  public resultObjt:any;
    public resultadosObj:any;
  
  public profileForm = new FormGroup({
	  
	firma: new FormControl('')
});
  
  public form : FormGroup;
  
    



@ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 1,
    'canvasHeight': 300,
    'backgroundColor': '#ffffff',
    'penColor': '#666a73'
  };
  

  constructor(public viewCtrl:ViewController, public http: HttpClient,public global: GlobalProvider , public navCtrl: NavController, public navParams: NavParams, private _FB : FormBuilder, public actionsheetCtrl: ActionSheetController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.match = this.navParams.get("info");
    this.equipo = this.navParams.get("equipo");
    this.info = this.navParams.get("results");
    
    this.ronda=this.equipo.Round;
    console.log(this.match);
    console.log(this.equipo);
    console.log(this.info);
    this.showFirmas=false;
    
    
    
    
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
	   
	   
	   ionViewDidEnter() {
		   if(this.showFirmas){
			   this.signaturePad.clear();
			  
			   
		   }else{
			   
			   //Calculamos el Par y los golpes de cada Jugador
				   for (var _i = 0; _i < 18; _i++){
					   this.TotalPar=parseInt(this.match.Pars[this.equipo.NumParcours][_i])+this.TotalPar;
				   }
			   
			   for (var _j = 0; _j < this.equipo.Registers.length; _j++){
				   
				   
				   
				   this.Totales.push(0);
				   //console.log(this.equipo.Registers[_j].Pars[this.ronda]);
				   
				   /*for (var _z = 0; _z < this.equipo.Registers[_j].Pars[this.ronda].length; _z++){

					   this.Totales[_j]=this.Totales[_j] + parseInt(this.equipo.Registers[_j].Pars[this.ronda][_z]);
				   }*/
				   
				   for (var _z = 1; _z <= 18; _z++){
						  console.log("hole_"+_j+"_"+_z +": "+ this.info["hole_"+_j+"_"+_z]);
						  if(this.info["hole_"+_j+"_"+_z]!=""){
						  	this.Totales[_j]=this.Totales[_j]+(parseInt(this.info["hole_"+_j+"_"+_z])-parseInt(this.match.Pars[this.equipo.NumParcours][_z-1]));
						  }
						  
					  }
				   
				   
				   /*for (var _z = 0; _z < 18; _z++){
					   if(this.equipo.Registers[_j].Pars[_z]!= null){this.Totales[_j]=this.Totales[_j]+parseInt(this.equipo.Registers[_j].Pars[_z]);}
					   }*/
				   
				   }
			   
			   console.log(this.Totales);
			   
		   }
	  }
	  
	  drawComplete() {
    this.isDrawing = false;
  }
 
  drawStart() {
    this.isDrawing = true;
  }
  
  
  toFirmas(licence, num){
	  this.numeroJugador=num;
	  this.licenciaFirma=licence;
	  
	  console.log(this.licenciaFirma);
	  this.showFirmas=true;
	  
  }
  
    isMatchFinished(numJugador){
	  
	  //console.log(this.equipo.Registers[numJugador]['Round'+this.rondaPlus+'Finished']);
	  
	  return this.equipo.Registers[numJugador]['Round'+(this.ronda+1)+'Finished'];
	  
	  
	  
  }
  
  
  toSummary(){
	  this.showFirmas=false;
	  
  }
  
  savePad(idPlayer) {
    this.signature = this.signaturePad.toDataURL();
    console.log(this.signature);
    //this.storage.set('savedSignature', this.signature);
    this.signaturePad.clear();
    let toast = this.toastCtrl.create({
      message: 'Flight Saved',
      duration: 5000
    });
    toast.present();
    
    this.saveResults(idPlayer);
    //this.navCtrl.popToRoot();
    
  }
 
  clearPad() {
    this.signaturePad.clear();
  }
  
	  
	   
	   
    showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
      
    });
    toast.present();
  }
 
 goBack(){
	 this.navCtrl.pop();
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
	      	      
	      //this.flights=this.match.results;
	      this.hora_inicio=this.equipo.HourStart.date;
	      this.ronda=this.equipo.Round;
	      //console.log(this.flights);
	      
	      //this.ronda=resp.records[0][0].ronda + 1;
	      /*this.ronda=+resp.records[0][0].ronda;
	      this.campo_juego=resp.records[0][0].campo_juego;
	      this.hoyo_salida=resp.records[0][0].hoyo_salida;*/
		  //this.resultados=resp.records[0][0].hoyo_salida;
		  
		  /*for (var _i = 0; _i < resp.records[0].length; _i++){
			  
			  this.resultados.push(resp.records[0][_i].resultados[0].pars);
			  
		  }//Endfor*/
    
  }

  
  
   saveResults(idPlayer) {
	  
		this.loading = this.loadingCtrl.create({
	      spinner: 'circles',
	      content: 'Saving Scores...'
	    });
	    this.loading.present();  
		
		
		this.results= [];
    this.resultadosObj=[];
    //console.log(this.profileForm.value);
    var cont=0;
    var cont_jug=0;
    
    
    console.log(this.results);
    
    for (let item in this.info) {
	    
	    
	    //if(this.info[item] == idPlayer){ //Solo para este jugador :-D
	    
			  if(cont==18){
				  
				  
				  if(this.info[item] == idPlayer){
					  
					  this.equipo.Registers[cont_jug]['Round'+(this.ronda+1)+'Finished']=true;
					    
				  	this.resultadosObj.push ({
				  		'player_id':this.info[item],
				  		'golpes':this.results
		    			});
		    		}
				  this.results= [];
				  cont=0;
				  cont_jug++;
				  
			  }else{
				   this.results.push(this.info[item]);
				   cont++;
		
			  } 
	    
	    //}
      
      
    }
		
		
		
		 //console.log(this.results);
		    this.resultObjt = {
		      'ronda':this.equipo.Round,
		      'finalizado':1,
		      'idTorneo':this.match.Id,
		      'token': this.global.token,
		      'year': this.global.season,
		      'resultados':this.resultadosObj, 
		      'firma':this.signature
		    }
		    console.log(JSON.stringify(this.resultObjt));
			
			
		   this.http.post(this.global.urlApiLocal+"/setData.php", JSON.stringify(this.resultObjt))
		    .subscribe((resp:any) => {
		      //console.log(resp);
		      //this.navCtrl.pop();
		      
		      this.loading.dismiss();
		      if(resp.status==1){
			      this.showToast("Scores Saved");
			      
			      this.equipo.Registers[this.numeroJugador]['Round'+(this.ronda+1)+'Finished']=true;
			      
			      this.showFirmas=false; //Volvemos al resumen
			      
			      //this.navCtrl.pop();
		      }else{
			      this.showToast("Error Saving Scores");
		      }
		      
		    }, err =>{
		      console.log(err);
		    });
		
		
		//this.loading.dismiss();
		
    }
   
   

  onSubmit() {
	  
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
      this.navCtrl.pop();
      
      loading.dismiss();
      if(resp.message=="ok"){
	      this.showToast("Scores Saved");
      }else{
	      this.showToast("Error Saving Scores");
      }
      
    }, err =>{
      console.log(err);
    });

  }
  //4X9L36
}