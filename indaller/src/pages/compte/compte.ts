
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import {JwtHelper} from "angular2-jwt";
import { Storage } from '@ionic/storage';

import { AuthService } from '../../providers/auth-service';


@Component({
  template: `
   <ion-item (click)="edith()">
      Editer  
   </ion-item>
  `
})

export class PopoverPage2 {
  
  edit: any;
  
  constructor(public viewCtrl: ViewController) {
    this.edit = false;
  }

  edith() {
    this.edit = true;
    this.viewCtrl.dismiss(this.edit);
  }
}

@Component({
  selector: 'page-compte',
  templateUrl: 'compte.html'
})
export class ComptePage {

  public rate = 4;
  compte: string = "profil";
  jwtHelper = new JwtHelper();
  data: any;
  user: any;
  show: any;
  edit: any;
  protected searchStr: string;
  protected captain: string;
  protected dataService: CompleterData;
  protected searchData: any;
  protected captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];
 
  constructor(private completerService: CompleterService, public navCtrl: NavController, private auth: AuthService, public navParams: NavParams, private popoverCtrl: PopoverController, public storage: Storage) {
    
    this.getData();
    this.getVilles();
    this.edit = false;
    

  }


  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage2);
      popover.present({
        ev: myEvent
      });

      popover.onDidDismiss((popoverData) => {
        this.edit = popoverData;
      });
  }

  getData(){

    //this.storage.set('token', null);
    this.storage.get('token').then((value) => {
      if (value!=null) {
        
        this.user = this.jwtHelper.decodeToken(value);
        this.getUser(value);

          if (this.user.type == 4 || this.user.type == 5) {
            this.show = true;
          } else {
            this.show = false;
          }

      } else {
        console.log("No token");
        this.data = '';
      }
    }); 
  }

  getUser(token){

    this.auth.getUser(token).then((result) => {
            
           this.data = result;
        }, (err) => {
           
            console.log(err);
        });
  }

  getVilles(){

    this.auth.loadAllVilles().then((result) => {
           this.searchData = result;
        }, (err) => {
            console.log(err);
        });
  }



 
}




