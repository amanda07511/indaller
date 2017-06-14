import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MyAnnoncePage } from '../my-annonce/my-annonce';


@Component({
  selector: 'page-annonces',
  templateUrl: 'annonces.html'
})
export class AnnoncesPage {

  mAnnonces: string = "annonces";
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  
  myAnnonce(){
    this.navCtrl.push( MyAnnoncePage);
  }
}
