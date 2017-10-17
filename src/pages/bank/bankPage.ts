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
	listBanks:Bank[];
	message: string;
	selectedBank: Bank;
	newBank: Boolean;
	editBankSelected: Boolean;

	ngOnInit() {
		this.getBanks();
	}

	getBanks() {
		this._bankService.getBanks().subscribe(banks =>{
			this.banks = banks;
			this.listBanks = banks;	
		});
	}

	postBanks(name: string, code: string) {
		if(name.trim() && code.trim()) {
			this._bankService.postBanks(name, code).subscribe(response => {
				this.message = response;
				if(this.message != null) {
					this.messageToast();
				}
				this.newBank = false;
			});
		} else {
			this.message = 'Preencha todos os campos!';
			this.messageToast();
		}
	}

	deleteBank(id: number) {
		this._bankService.deleteBank(id).subscribe(response =>{
			this.message = response;
			if(this.message != null) {
				this.messageToast();
			}
		});
	}

	editBank(id: number, name: string, code: string) {
		if(name.trim() && code.trim()) {
			this._bankService.postBank(id, name, code).subscribe(response => {
				this.message = response;
				if(this.message != null) {
					this.messageToast();
				}
			});
		} else {
			const toast = this.toastCtrl.create({
				message: 'Preencha todos os campos',
				duration: 2000,
				position: 'middle'
			});
			toast.present();
		}
	}

	onSelectBank(bank: Bank) {
		this.selectedBank = bank;
		this.newBank = false;
	}

	creatNewBank() {
		this.newBank = true;
		this.selectedBank = null;
		this.editBankSelected = null;
	}

	onClickBank(){
		this.editBankSelected = true;
		this.newBank = false;
	}

	cancelar() {
		this.selectedBank = null;
		this.editBankSelected = null;
		this.newBank = false;
	}

	messageToast() {
		const toast = this.toastCtrl.create({
			message: this.message,
			duration: 2000,
			position: 'middle'
		});
		toast.present();
		this.selectedBank = null;
		this.editBankSelected = null;
		this.getBanks();
	}

	searchBanks(nameBank: any) {
		this.banks = this.listBanks;
		let nameSearch = nameBank.target.value;
		if (nameSearch && nameSearch.trim() != '') {
			this.banks = this.banks.filter( bank => {
			return (bank.name.toLowerCase().indexOf(nameSearch.toLowerCase()) > -1);
			});
		}
	}
}

