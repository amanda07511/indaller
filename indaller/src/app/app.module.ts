import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//My pages
import { SearchPage } from '../pages/search/search';
import { ComptePage } from '../pages/compte/compte';
import { PopoverPage2 } from '../pages/compte/compte';
import { AnnoncesPage } from '../pages/annonces/annonces';
import { ServicePage } from '../pages/service/service';
import { MyAnnoncePage } from '../pages/my-annonce/my-annonce';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
//My providers
import { AuthService } from '../providers/auth-service';
import { SearchService } from '../providers/search-service';

//My components
import {Popover} from '../components/popover/popover';
// Imports 
import { Ionic2RatingModule } from 'ionic2-rating';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    ComptePage,
    AnnoncesPage,
    PopoverPage2,
    ServicePage,
    MyAnnoncePage,
    LoginPage,
    SignupPage,
    Popover
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    ComptePage,
    AnnoncesPage,
    PopoverPage2,
    ServicePage,
    MyAnnoncePage,
    LoginPage,
    SignupPage,
    Popover
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, IonicStorageModule, AuthService, SearchService]
})
export class AppModule {}
