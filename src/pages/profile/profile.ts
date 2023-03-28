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
import { UserProvider } from './../../providers/user/user';


@Component({
    selector: 'profile-page', 
    templateUrl: 'profile.html'
})

export class ProfilePage {
	userData:any;
	submitAttempt1: boolean = false;
	profileForm:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public global: GlobalProvider, public alertCtrl: AlertController, public userProvider: UserProvider) {
  
  	this.userData=this.userProvider.getUser();
  	//console.log(this.userData);

	  	this.profileForm = new FormGroup({
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
  
  
  saveProfile(){
	  
	  console.log(this.profileForm);
	  
  		let parameteres = {
            page: 'profile',
            email: this.profileForm.value.email,
            password: this.profileForm.value.password, 
            username: this.profileForm.value.username, 
            city: this.profileForm.value.city, 
            name: this.profileForm.value.name, 
            surname: this.profileForm.value.surname,
            id: this.userData.id 

	    };
	    if(this.profileForm.value.email=="" || this.profileForm.value.name=="" || this.profileForm.value.surname=="" || this.profileForm.value.city==""){
    		this.submitAttempt1 = true; 
		}else{
			this.http.post(this.global.urlApiLocal+"/updateProfile.php", parameteres).subscribe((resp) => {
			    let data = resp.json();


			    if(data.status==1){ 
			     	//this.muestra_alert("titulo","texto1");
			    	//this.navCtrl.setRoot(HomePage); 
			    	
			    	this.userProvider.setUser(data.player);
			    	
			    	this.muestra_alert("titulo","Saved");
			    }else{
					if(data.status==0){ //el user existe
						
						this.muestra_alert("titulo","Error");
					}else{ //nada existe
						this.submitAttempt1 = true;
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
       case "profile":
          this.navCtrl.setRoot(ProfilePage); 
          //console.log("results");
          //console.log(slug);
          break;
                                     
      default:
          this.navCtrl.setRoot(page.component); 
          break;
    }
  }


	    
}
