import { BrowserModule }                          from '@angular/platform-browser';
import { ErrorHandler, NgModule }                 from '@angular/core';
import { IonicApp, IonicErrorHandler,
   IonicModule }                                  from 'ionic-angular';

import { MyApp }                                  from './app.component';
import { HomePage }                               from '../pages/home/home';


import { StatusBar }                              from '@ionic-native/status-bar';
import { SplashScreen }                           from '@ionic-native/splash-screen';
import { BankPage }                               from '../pages/bank/bankPage';
import { HttpModule }                             from '@angular/http';
import { BankService }                            from '../sevice/bankService';
import { AuthenticationService }                  from '../sevice/authenticationService';
import { BankDetail } 							  from '../pages/bankDetail/bankDetail';
import { DetailBank } 							  from '../component/detailBank';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		BankPage,
		BankDetail,
		DetailBank
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		HttpModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		BankPage,
		BankDetail,
		DetailBank
		
	],
	providers: [
		StatusBar,
		SplashScreen,
		BankService,
		AuthenticationService,
		BankPage,
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule { }
