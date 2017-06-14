import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

//My pages
import { SearchPage } from '../pages/search/search';
import { ComptePage } from '../pages/compte/compte';
import { AnnoncesPage } from '../pages/annonces/annonces';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public log = false;
  public unlog = true; 
  rootPage: any = SearchPage;

  pages: Array<{title: string, icon: any, component: any}>;
  user = {nom: '' , type:'', photo: '' };

  constructor(public platform: Platform, public storage: Storage, public menuCtrl: MenuController, private loadingCtrl: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', icon: 'home', component: SearchPage },
      { title: 'Mon compte', icon: 'md-person', component: ComptePage },
      { title: 'Mes Annonces', icon: 'md-paper', component: AnnoncesPage }
    ];

    //this.storage.set('token', null);
    this.storage.get('token').then((value) => {
      if(value!=null){
        console.log(value);
        this.log = true;
        this.unlog = false;
      }
      else{
        console.log("No token");
        this.log = false;
        this.unlog = true;
      }
    });

    
    this.storage.get('user').then((value) => {
      if (value!=null) {
        console.log(value);

        if (value.type == 1) {
          this.user.type = 'Administrator';
        } else if (value.type == 2 || value.type == 3) {
          this.user.type = value.email;
        }
        else if (value.type == 4 || value.type == 5) {
            this.user.type = 'Fournisseur';
        }
        this.user.nom = value.nom + ' ' + value.prenom;
        this.user.photo = value.photo;
      }
      else{
        console.log('No user');
         this.user = {nom: '' , type:'', photo: '' };

      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    //this.storage.set('token', null);

    this.storage.remove('token').then((val) => {
        console.log('Removed ' + val + "");
    });
    this.storage.remove('user').then((val) => {
       console.log('Removed ' + val + "");
    });
    this.storage.clear();
    window.location.reload();
  }

   login() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push(LoginPage);
  }

  singup() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push(SignupPage);
  }

}
