import { Component } from '@angular/core';
import {ViewController, NavParams } from 'ionic-angular';

import { SearchService } from '../../providers/search-service';
/*
  Generated class for the Popover component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class Popover {

  selectedTitle: string;
  isSecondary1 : any;
  isSecondary2 : any;
  domaines: any;
  selectOptions: any;
  filters : any;
  oldFilters: any;

  constructor(private viewCtrl: ViewController, public searchService: SearchService, public params: NavParams) {
    this.selectedTitle = "";

    this.filters = params.get('filters');
    this.changeColor(this.filters.type);
    

    this.loadDomaines();
  }

   setSelectedTitle(filter) {
    
    this.filters.type = filter;
    this.changeColor(this.filters.type);

     console.log(this.filters);

     if(this.filters!=null){
       this.viewCtrl.dismiss(this.filters);
     }
    
  }

  loadDomaines(){
       this.searchService.loadDomaines().then(data => {
          this.domaines = data;
       });
   }

  selectLocalisation(filter) {
    this.filters.localisation = filter;
    console.log(this.filters);

    if(this.filters!=null){
       this.viewCtrl.dismiss(this.filters);
     }
  }

  selectDomaine(filter) {
    this.filters.domaine = filter;
    console.log(this.filters);

    if(this.filters!=null){
       this.viewCtrl.dismiss(this.filters);
     }
  }

  changeColor(filter){
     
     if (filter == "Annonce") {
      this.isSecondary1 = false;
      this.isSecondary2 = true;
    } else if (filter == "Service") {
      this.isSecondary1 = true;
      this.isSecondary2 = false;
    }

  }

  getData(){
    if (this.oldFilters !=  null) {
      this.filters = this.oldFilters;
    } else {
      this.filters = {type: 'Service', localisation: 'TF' , domaine: 'none'};
    }
    
  }



}
