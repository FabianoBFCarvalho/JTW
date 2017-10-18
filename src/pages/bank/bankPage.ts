import { Component } 								from '@angular/core';
import { BankService } 								from '../../sevice/bankService';
import { Bank } 									from '../../interface/bank';
import { ToastController, ModalController,
	 AlertController } 								from 'ionic-angular';
import { BankDetail } 								from '../bankDetail/bankDetail';

@Component({
  selector: 'bankPage',
  templateUrl: 'bank.html'
})
export class BankPage {
	
	constructor(
		private _bankService: BankService,
		private toastCtrl: ToastController,
		private modalCtrl: ModalController,
		private alertCtrl: AlertController
	) { }

	banks: Bank[];
	listBanks:Bank[];
	message: string;
	selectedBank: Bank;
	newBank: Boolean;


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
				this.buttonCancelar();
			});
		} else {
			this.message = 'Preencha todos os campos!';
			this.messageToast();
		}
	}

	onSelectBank(bank: Bank) {
		this.selectedBank = bank;
		this.buttonCancelar();
	}

	presentBankDeitalModal() {
		let bankModal = this.modalCtrl.create(BankDetail, {bankSelected: this.selectedBank});
		bankModal.present();
	}

	creatNewBank() {
		this.newBank = true;
		this.selectedBank = null;
	}

	buttonCancelar() {
		this.newBank = false;
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

