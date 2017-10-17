import { Component }        				from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AuthenticationService }		 	from '../../sevice/authenticationService';
import { BankPage } 						from '../bank/bankPage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(
	  public navCtrl: NavController,
	  private _authentication: AuthenticationService,
	  private toastCtrl: ToastController
	) { }

	
  
	login(email: string, password: string) {
		let message;
		if(email.trim() && password.trim()) {
			this._authentication.login(email,password).subscribe(res => {
				if(res) {
					this.navCtrl.setRoot(BankPage);
				}
			},
			error => {
				if(error == 401) {
					message = 'Senha Invalida';
				} else if(error == 500) {
					message = 'Usuario ou senha invalido';
				} else {
					message = 'Confire os dados novamente';
				}
				this.messageToast(message);
			});
		} else {
			message = 'preencha todos os campos!';
			this.messageToast(message);
		}
	}
	messageToast(message: string) {
		const toast = this.toastCtrl.create({
			message: message,
			duration: 2000,
			position: 'middle'
		});
		toast.present();
	}
}
