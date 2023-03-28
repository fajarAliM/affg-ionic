import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../global/global";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
 
 
@Injectable()
export class UserProvider {
 
 //public dataUser:any;
 
  constructor(public storage: Storage, public global: GlobalProvider,public nativeStorage: NativeStorage) { }
 
 
  setUser(data) {
	  
	/*  console.log(data);
	
	localStorage.setItem('userData', JSON.stringify(data));
	
    this.storage.set("player.name", data.name);
    this.storage.set("player.surname", data.surname);
    this.storage.set("player.username", data.username);
    this.storage.set("player.id", data.id);
    this.storage.set("player.email", data.email);
    this.storage.set("player.city", data.city);
    this.storage.set("player.photo", data.photo);
    this.storage.set("player.points", data.points);
    
    this.global.setPlayerData(data);*/
    
    
    
    
  }

 
  getUser() {
	  
	  return new Promise(resolve => {
	  
	  let dataUser = {
            name: '',
            id: '',
            surname: '', 
            username: '',
            email: '',
            city: '',
            photo: '',
            points: 0

	    };
	  
	  this.storage.get('player.name').then((val) => { dataUser.name=val;  });
	  this.storage.get('player.surname').then((val) => { dataUser.surname=val;  });
	  this.storage.get('player.username').then((val) => { dataUser.username=val;  });
	  this.storage.get('player.id').then((val) => { dataUser.id=val;  });
	  this.storage.get('player.email').then((val) => { dataUser.email=val;  });
	  this.storage.get('player.city').then((val) => { dataUser.city=val;  });
	  this.storage.get('player.photo').then((val) => { dataUser.photo=val;  });
	  this.storage.get('player.points').then((val) => { dataUser.points=val;  });
    
    resolve(dataUser);
    }
    );
    
  }
 
}