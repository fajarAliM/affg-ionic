import { Injectable } from "@angular/core";
import { ActionSheetController } from "ionic-angular";

/*
  Generated class for the ProvidersActionSheetServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActionSheetService {
constructor(
        private actionSheetCtrl: ActionSheetController,
    ) {
    }
present(buttons: Array<any>) {
        buttons.push({
            text: 'Cancel',
            role: 'cancel',
        });
let actionSheet = this.actionSheetCtrl.create({
            buttons: buttons
        });
actionSheet.present();
    }
}
