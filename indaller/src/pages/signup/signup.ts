import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth-service';
import { NavController, AlertController, LoadingController, Loading  } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  villes: any;
  searchTerm: string = '';
  loading: Loading;
  registerCredentials = {nom: '', prenom: '' , email: '', password: '', tel: '', ddn: '', ville: '', type: 0 };
  type = {a:'', b:''};
  personne: any;

  public selectD = true;

  constructor( public storage: Storage, public nav: NavController,  private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  	if(this.villes==null){
  		this.selectD= true;
  		this.villes= [{id: '0', nom: 'Insert un code postal'}];
  	}
  	
  }

  searchVille(ev: any){
  	this.villes = [''];
  	this.selectD= true;

  	this.searchTerm = ev.target.value;
  	if (this.searchTerm!=null) {
  		console.log(this.searchTerm);
  	}
  	
  	if(this.searchTerm.length>1 && this.searchTerm.length<6 ){
  		this.auth.loadVilles(this.searchTerm).then(data => {
          if(data!=null){
          	this.villes = data;
          	this.selectD= false;
          }
        });
  	}
  }
  
singup(){
    this.showLoading();
  	console.log(this.registerCredentials);
  	
    if (this.type.a=="personne") {
  		if (this.type.b=="simple") {
  			this.registerCredentials.type = 2;
  		} else {
  			this.registerCredentials.type = 3;
  		}

  	} else {
  		if (this.type.b=="simple") {
  			this.registerCredentials.type = 4;
  		} else {
  			this.registerCredentials.type = 5;
  		}

  	}

  	this.auth.createAccount(this.registerCredentials).then((result) => {
            this.loading.dismiss();
            console.log(result['status']);
            if(result['status']==500)
              this.showError("L'email ou password son incorrect");
            else{
            	// set a key/value
              this.storage.set('token', result["token"]);
              this.nav.setRoot(SearchPage);
              window.location.reload();
            }
        }, (err) => {
            this.showError("Il y a un problème, tentez autre fois!");
            console.log(err);
        });

 }

 showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Attendez s il vouz plaît...'
    });
    this.loading.present();
  }
 
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Opps',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
