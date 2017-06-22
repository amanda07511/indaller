
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
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
  villes: any;
  searchTerm: string = '';
  
  constructor(public navCtrl: NavController, private auth: AuthService, public navParams: NavParams, private popoverCtrl: PopoverController, public storage: Storage) {
    
    this.getData();
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


  searchVille(ev: any){
    this.villes = [''];

    this.searchTerm = ev.target.value;
    if (this.searchTerm!=null) {
      console.log(this.searchTerm);
    }
    
    if(this.searchTerm.length != null){
      this.auth.loadVilles2(this.searchTerm).then(data => {
          if(data!=null){
            this.villes = data;
          }
        });
    }
  }

 

 
}




