import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Toast,ToastController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import {FormControl, FormGroup, Validators} from '@angular/forms';
//import {EmailValidators} from 'ng2-validators';
import { AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { RecoverPasswordPage } from "../recover-password/recover-password";
import { RegisterPage } from "../register/register";
import { SignUpCompletePage } from "../signupcomplete/signupcomplete";
import {MyFlightsPage} from "../myflights/myflights";

import {User} from '../../models/user';


import { DashboardPage } from "../dashboard/dashboard";
//import { UserProvider } from './../../providers/user/user';




@Component({
    selector: 'page-login', 
    templateUrl: 'login.html'
})

export class LoginPage {
	submitAttempt1: boolean = false;
	submitAttempt2: boolean = false;
  formLogin:any;
  public myHeader:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public global: GlobalProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {

  	this.formLogin = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', Validators.required)
        });
  } 
  ionViewWillEnter() {  
    //this.getData(); 
  }
  muestra_alert(titulo,texto){
    const alert = this.alertCtrl.create({
      title: titulo, 
      subTitle: texto,
      buttons: ['OK']
    });
    alert.present();
  }
  
  doLogin(){
	  
	  /*console.log("esto lo hago");
	  
  		let parameteres = {
            page: 'login',
            usuario: this.formLogin.value.email,
            password: this.formLogin.value.password, 
            token: this.global.token

	    };
	    if(this.formLogin.value.email=="" || this.formLogin.value.password==""){
    		if(this.formLogin.value.email==""){this.submitAttempt1 = true; }
    		if(this.formLogin.value.password==""){this.submitAttempt2 = true;}
		}else{
			this.http.post(this.global.urlApiLocal+"/login.php", parameteres).subscribe((resp) => {
			    let data = resp.json();
				
				//console.log(data);

			    if(data.status==1){ 
				    
				    this.global.setPlayerData(data.player[0]);
				    
				    //this.global.user = new User(data.player[0]);
				    
				    
				    
			     	//this.muestra_alert("titulo","texto1");
			    	this.navCtrl.setRoot(HomePage); 
			    }else{
					if(data.status==0){ //el user existe
						
						this.muestra_alert("titulo","Wrong Username");
					}else{ //nada existe
						this.submitAttempt2 = true;
						//this.muestra_alert("titulo","texto3");
					}
			    } 
			    
			    
			    
			}); 
		}*/
		
		if(this.formLogin.value.email=="" || this.formLogin.value.password==""){
    		if(this.formLogin.value.email==""){this.submitAttempt1 = true; }
    		if(this.formLogin.value.password==""){this.submitAttempt2 = true;}
		}else{
		
		this.myHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
	        
	        let formData = new FormData();
	        formData.append('login', this.formLogin.value.email);
	        formData.append('password', this.formLogin.value.password);
	
		    
		    this.http.post(this.global.url+"/login", formData, this.myHeader).subscribe((resp:any) => {
		      console.log(resp);
		      //this.menuItems = resp.secciones;
		      let respuesta:any=resp.json() as Object;
		      respuesta=JSON.parse(respuesta);
		      //this.token=respuesta.token;
		      //resolve(this.token);
		      console.log(respuesta.licence);
		      
		      this.global.setPlayerData(respuesta.licence);
			  //this.navCtrl.setRoot(MyFlightsPage); 
			  this.navCtrl.pop();
		      
		      /* Trabajamos con respuesta y tenemos que:
		      
		      1. Comprobar si el jugador está en la base de datos de challenges
		      2. Si no, hago la consulta del perfil y de sus datos a la AFFG y los almaceno en la BD --> Esto lo hago en otra página
		      3. Si si que existe añado al jugador al STORAGE y le envio a la home
		      */
		      
		      		//Comprobación de si el ugador existe en nuestra BD
		      		
		      		/*this.http.get(this.global.urlApiLocal+"/getJugador.php?id="+respuesta.licence.Id).subscribe((resp:any) => {
			  			
			  			let jugador= resp.json();
			  			
				      	//this.mychallenges=resp.challenges;
				      	console.log(jugador);
				      	
				      	if(jugador.player.length == 0){ // Es la primera vez que viene, le paso a la otra página y ahi creo su perfil
					      	
					      	this.navCtrl.setRoot(SignUpCompletePage, {player: respuesta.licence});
					      	
				      	}else{ //No es la primera vez que entra y por lo tanto hay que mandarle a la Home
					      	 this.global.setPlayerData(jugador.player[0]);
					      	this.navCtrl.setRoot(HomePage); 
				      	}
				      	
				      	
						});*/
		      		
		      
		      
		      	    
	    		}, err => {
		    		const toast = this.toastCtrl.create({
		      message: 'Error: ' + err._body,
		      duration: 3000
		    });
		    toast.present();
				console.log(err);
    		});
    		
    		}
		
		

  }
  
  openPage(page) {
    

    switch (page)
    {
      case "recover-password":
          this.navCtrl.push(RecoverPasswordPage); 
          //console.log("results");
          //console.log(slug);
          break;
       case "register":
          this.navCtrl.setRoot(RegisterPage); 
          //console.log("results");
          //console.log(slug);
          break;
                                     
      default:
          this.navCtrl.setRoot(page.component); 
          break;
    }
  }
  
  
}
