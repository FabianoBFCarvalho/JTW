import { Component } 						from '@angular/core';
import { BankService } 						from '../../sevice/bankService';
import { Bank } 							from '../../interface/bank';
import { ToastController } 					from 'ionic-angular';


@Component({
  selector: 'bankPage',
  templateUrl: 'bank.html'
})
export class BankPage {

	constructor(
		private _bankService: BankService,
		private toastCtrl: ToastController
	) { }

	banks: Bank[];
	message: string = null;
	selectedBank: Bank;

	ngOnInit() {
		this.getBanks();
	}

	getBanks() {
		this._bankService.getBanks().subscribe(banks => this.banks = banks);
	}

	postBanks(name: string, code: string) {
		this._bankService.postBanks(name, code).subscribe(response => this.message = response);
		if(this.message) {
			this.messageToast();
		}
	}

	deleteBank(id: number) {
		this._bankService.deleteBank(id).subscribe(response => this.message = response);
		if(this.message) {
			this.messageToast();
		}
	}

	editBank(id: number, name: string, code: string) {
		this._bankService.postBank(id, name, code).subscribe(response => this.message = response);
		if(this.message) {
			this.messageToast();
		}
	}
	onSelectBank(bank: Bank) {
		this.selectedBank = bank;
	}
	messageToast() {
		const toast = this.toastCtrl.create({
			message: this.message,
			duration: 2000,
			position: 'middle'
		});
		toast.present();
		this.getBanks();
	}
}

