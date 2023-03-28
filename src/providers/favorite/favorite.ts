import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
const STORAGE_KEY = 'favoritePlayers';
 
@Injectable()
export class FavoriteProvider {
 
  constructor(public storage: Storage) { }
 
  isFavorite(itemId) {
    return this.getAllFavoritePlayers().then(result => {
	    
	    let comparacion= result && result.indexOf(itemId) !== -1;
	    //console.log(comparacion);
      return comparacion;
    });
  }
 
  favoritePlayer(itemId) {
    return this.getAllFavoritePlayers().then(result => {
      if (result) {
        result.push(itemId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [itemId]);
      }
    });
  }
 
  unfavoritePlayer(itemId) {
    return this.getAllFavoritePlayers().then(result => {
      if (result) {
        var index = result.indexOf(itemId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }
 
  getAllFavoritePlayers() {
    return this.storage.get(STORAGE_KEY);
  }
 
}