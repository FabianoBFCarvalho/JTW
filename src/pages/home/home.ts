import { Component }        				from '@angular/core';
import { NavController, ToastController,
		 LoadingController } 				from 'ionic-angular';
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
		private toastCtrl: ToastController,
		private loadingCtrl: LoadingController
	) { }
	 message: string;

	 ngOnInit() {
		 this._authentication.logout();
	 }
  
	login(email: string, password: string) {
		if (email.trim() && password.trim()) {
			this.loginLoading();
			this._authentication.login(email.trim(),password.trim())
			.subscribe(res => {
				if (res) {
					this.message = 'Bem vindo!';
					this.navCtrl.setRoot(BankPage);
					this.messageToast();
				}
			},
			error => {
				if (error == 401 || error == 500) {
					this.message = 'Usuario ou senha invalido';
				} else {
					this.message = 'Confire os dados novamente';
				}
				this.messageToast();
			});
		} else {
			this.message = 'preencha todos os campos!';
			this.messageToast();
		}
	}
	
	messageToast() {
		const toast = this.toastCtrl.create({
			message: this.message,
			duration: 2000,
			position: 'middle'
		});
		toast.present();
	}

	loginLoading() {
		let loader = this.loadingCtrl.create({
		  content: "Carregando...",
		  duration: 2800
		});
		loader.present();
	}
}
