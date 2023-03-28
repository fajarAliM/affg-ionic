import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
const STORAGE_KEY = 'flights';
 
@Injectable()
export class FlightsProvider {
 
  constructor(public storage: Storage) { }
 
  inList(itemId) {
    return this.getAll().then(result => {
	    
	    //let index = result.findIndex((itemId) => itemId.info[0].FlightID === 'blue');
	    
	    //let comparacion= result && result.indexOf(itemId) !== -1;
	    //let comparacion= result && result.info[0].FlightID == itemId.info[0].FlightID;
	    let comparacion = false;
	    
	    for (let i = 0; i < result.length ; i++) {
			let item = result[i];
			if(item.info[0].FlightID == itemId.info[0].FlightID){
				console.log("Me salgo!!");
				return true;
			}
		}
	    
	    //console.log(result.indexOf(itemId));
	    
	    console.log(comparacion);
      return comparacion;
    });
  }
 
  saveFlight( data) {
	  
	  
	  /*let res = this.storage.set(STORAGE_KEY, [data]);
	  console.log("AQUI VAN LOS FLIGHTS GUARDADOS");
	  
	  this.getAll().then(result => {
      		console.log(result);
    		});
	  
	  console.log("------------------------------");
	  return res;*/
    return this.getAll().then(result => {
      if (result) {
	      
	      let comparacion = false;
	    
	    for (let i = 0; i < result.length ; i++) {
			let item = result[i];
			if(item.info[0].FlightID == data.info[0].FlightID){
				console.log("Está presente");
				comparacion = true;
			}
		}
	      
	      if(!comparacion){
		      result.push(data);
			  return this.storage.set(STORAGE_KEY, result);
	      }
        
      } else {
        return this.storage.set(STORAGE_KEY, [data]);
      }
    });
  }
 
  deleteFlight(flight) {
	  
	  return new Promise(resolve => {
	  
	    return this.getAll().then(result => {
	      if (result) {
	        var index = result.indexOf(flight);
	        result.splice(index, 1);
	        return this.storage.set(STORAGE_KEY, result);
	      }
	    });
    
    });
    
  }
 
  getAll() {
    return this.storage.get(STORAGE_KEY);
  }
  

  
 
}