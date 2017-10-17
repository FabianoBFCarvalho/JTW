import { Component }        				from '@angular/core';
import { NavController }    				from 'ionic-angular';
import { AuthenticationService }		 	from '../../sevice/authenticationService';
import { BankPage } 						from '../bank/bankPage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
	  public navCtrl: NavController,
	  private _authentication: AuthenticationService
	) { }
  
  	login(email: string, password: string) {
		this._authentication.login(email,password).subscribe(res => {
			if(res) {
				this.navCtrl.setRoot(BankPage);
			}
		});
	}
}
