import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import {FormControl, FormGroup, Validators} from '@angular/forms';
//import {EmailValidators} from 'ng2-validators';
import { AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";


@Component({
    selector: 'register-page', 
    templateUrl: 'register.html'
})

export class RegisterPage {
	submitAttempt1: boolean = false;
	submitAttempt2: boolean = false;
  formLogin:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public global: GlobalProvider, public alertCtrl: AlertController) {

  	this.formLogin = new FormGroup({
	  		name: new FormControl('', [Validators.required]),
	  		surname: new FormControl('', [Validators.required]),
	  		city: new FormControl('', [Validators.required]),
	  		username: new FormControl('', [Validators.required]),
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
  doSignUp(){
  		let parameteres = {
            page: 'register',
            email: this.formLogin.value.email,
            password: this.formLogin.value.password, 
            username: this.formLogin.value.username, 
            city: this.formLogin.value.city, 
            name: this.formLogin.value.name, 
            surname: this.formLogin.value.surname, 

	    };
	    if(this.formLogin.value.email=="" || this.formLogin.value.password=="" || this.formLogin.value.name=="" || this.formLogin.value.surname=="" || this.formLogin.value.city==""){
    		this.submitAttempt1 = true; 
		}else{
			this.http.post(this.global.urlApiLocal+"/register.php", parameteres).subscribe((resp) => {
			    let data = resp.json();


			    if(data.status==1){ 
			     	//this.muestra_alert("titulo","texto1");
			    	this.navCtrl.setRoot(HomePage); 
			    }else{
					if(data.status==2){ //el user existe
						
						this.muestra_alert("titulo","User already in the Database");
					}else{ //nada existe
						this.submitAttempt2 = true;
						//this.muestra_alert("titulo","texto3");
					}
			    } 
			}); 
		}

  }
  
  
   openPage(page) {
    

    switch (page)
    {
      case "login":
          this.navCtrl.setRoot(LoginPage); 
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
