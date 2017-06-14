import { Component} from '@angular/core';
import { NavController, NavParams, PopoverController} from 'ionic-angular';

import { SearchService } from '../../providers/search-service';
import { Popover } from '../../components/popover/popover';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  filters : any;
  services : any;
  

  public rate = 3.5;

  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController, public searchService: SearchService) {
    this.filters = {type: 'Service', localisation: 'TF' , domaine: 'none'};
    this.loadFournisseurs();
  }

  presentPopover(ev) {
      let popover = this.popoverCtrl.create(Popover, {filters: this.filters});
      popover.present({
        ev: ev
      });
   
      popover.onDidDismiss((popoverData) => {
        
        if(popoverData!=null){
          this.filters = popoverData;
          this.loadContent(this.filters);
        }
        

      });


  }

  loadFournisseurs(){
    return new Promise(resolve => {
      this.searchService.loadAllFournisseurs().then(data => {
            this.services = data;
            resolve(true);
      });
      

    });
  }

  loadAnnonces(){
    return new Promise(resolve => {
      this.searchService.loadAllAnnonces().then(data => {
            this.services = data;
            resolve(true);
      });
      
    });
  }

  loadContent(data){

    if (data.type == "Service"){
      this.services = [];
      this.loadFournisseurs();
    }
    else if (data.type == "Annonce"){
      this.services = [];
      this.loadAnnonces();
    }
    else{

    }
  }

}
