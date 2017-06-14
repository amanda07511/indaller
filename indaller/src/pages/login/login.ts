import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
//My pages
import { SearchPage } from '../search/search';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: Loading;
  registerCredentials = {email: '', password: ''};
  user: any;

  constructor(public nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController,  public storage: Storage) {}

  public login() {

    this.showLoading();

    this.auth.login(this.registerCredentials).then((result) => {
            this.loading.dismiss();
            console.log(result['status']);
            if(result['status']==500)
              this.showError("L'email ou password son incorrect");
            else{
            	// set a key/value
              this.getUser(result["token"])
            }
        }, (err) => {
            this.showError("Il y a un problème, tentez autre fois!");
            console.log(err);
        });

  }//login
 
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

  singup() {

    this.nav.push(SignupPage);
  }

  getUser(token){
    this.auth.getUser(token).then((result) => {
            this.loading.dismiss();
            console.log(result);
            if(result['status']==500)
              this.showError("L'email ou password son incorrect");
            else{
              // set a key/value
              this.storage.set('token', token);
              this.storage.set('user', result);
              this.nav.setRoot(SearchPage);
              window.location.reload();
            }
        }, (err) => {
            this.showError("Il y a un problème, tentez autre fois!");
            console.log(err);
        });
  }
}
