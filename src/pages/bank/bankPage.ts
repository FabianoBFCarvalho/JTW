import { Component } 								from '@angular/core';
import { BankService } 								from '../../service/bankService';
import { Bank } 									from '../../interface/bank';
import { ModalController }			 				from 'ionic-angular';
import { BankDetail } 								from '../bankDetail/bankDetail';

@Component({
  selector: 'bankPage',
  templateUrl: 'bank.html'
})
export class BankPage {
	
	constructor(
		private _bankService: BankService,
		private modalCtrl: ModalController
	) { }

	banks: Bank[];
	selectedBank: Bank;
	
	ngOnInit() {
		this.getBanks();
	}

	getBanks() {
		this._bankService.getBanks().subscribe(banks => {
			this.banks = banks;
		});
	}

	onSelectBank(bank: Bank) {
		this.selectedBank = bank;
	}

	presentBankDeitalModal(newBank: boolean) {
		let bankModal = this.modalCtrl.create(BankDetail, {
			bankSelected: this.selectedBank, 
			newBank: newBank
		});
		bankModal.present();
		bankModal.onWillDismiss(() => this.getBanks());
	}

	searchBanks(inputSearch: any) {
		let bankName = inputSearch.target.value;
		if (bankName && bankName.trim() != '') {
			this.banks = this.banks.filter(bank => {
				return (bank.name.toLowerCase().indexOf(
					bankName.toLowerCase()) > -1);
			});
		}
		else {
			this.getBanks();
		}
	}
}