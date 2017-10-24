import { BrowserModule }                          from '@angular/platform-browser';
import { ErrorHandler, NgModule }                 from '@angular/core';
import { HttpModule }                             from '@angular/http';
import { IonicApp, IonicErrorHandler,
   		 IonicModule }                            from 'ionic-angular';
import { StatusBar }                              from '@ionic-native/status-bar';
import { SplashScreen }                           from '@ionic-native/splash-screen';
import { MyApp }                                  from './app.component';
import { HomePage }                               from '../pages/home/home';
import { BankPage }                               from '../pages/bank/bankPage';
import { BankDetail } 							  from '../pages/bankDetail/bankDetail';
import { BankService }                            from '../service/bankService';
import { AuthenticationService }                  from '../service/authenticationService';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		BankPage,
		BankDetail
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
		BankDetail
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
