import { Component } 						from '@angular/core';
import { BankService } 						from '../../sevice/bankService';
import { Bank } 							from '../../interface/bank';


@Component({
  selector: 'bankPage',
  templateUrl: 'bank.html'
})
export class BankPage {

	constructor(private bankService: BankService) { }
	banks: Bank[];


	ngOnInit() {
		this.getBanks();
	}

	getBanks() {
		this.bankService.getBanks().subscribe(response => this.banks = response);
	}

	postBank(name: string, code: string) {
		this.bankService.postBank(name, code).subscribe(res => console.log(res+' Post banco'));
	}

}

