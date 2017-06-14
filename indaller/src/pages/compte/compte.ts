import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';

@Component({
  template: `
   <ion-item>
      Edit    
   </ion-item>
  `
})

export class PopoverPage2 {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  selector: 'page-compte',
  templateUrl: 'compte.html'
})
export class ComptePage {
  public rate = 4;
  compte: string = "profil";
  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController) {}

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage2);
      popover.present({
        ev: myEvent
      });
    }

}
