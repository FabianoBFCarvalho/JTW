import { Component }                        from '@angular/core'; 
import { Bank }                             from '../../interface/bank';
import { NavParams, ViewController,
     ToastController, AlertController }     from 'ionic-angular';
import { BankPage }                         from '../bank/bankPage';
import { BankService }                      from '../../sevice/bankService';

@Component({
    selector: 'bankDetail',
    templateUrl: './bankDetail.html'
})
export class BankDetail {
    
    constructor
    (   
        private _bankService: BankService,
        private params: NavParams,
        public viewCtrl: ViewController,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
       
    ) { }

    bank: Bank;
    edit: boolean;
    message: string;
    selectedBank: Bank;
    
    ngOnInit() {
        this.bank = this.params.get('bankSelected');
    }

    onClickBank() {
        this.selectedBank = this.bank;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    showConfirmDelete() {
		let confirm = this.alertCtrl.create({
		  title: 'Atenção!',
		  message: 'Deseja realmente apagar o banco '+this.bank.name+' ?',
		  buttons: [
			{
				text: 'Sim',
				handler: () => {
					this.deleteBank(this.bank.db_id);
				}
			},
			{
				text: 'Não', handler: () => { }
			}
		  ]
		});
		confirm.present();
	}
	
    deleteBank(id: number) {
		this._bankService.deleteBank(id).subscribe(response =>{
			this.message = response;
			if(this.message != null) {
                this.messageToast();
                this.dismiss();
			}
		});
    }

    editBank(name: string, code: string) {
		if(name.trim() && code.trim()) {
			this._bankService.postBank(this.bank.db_id, name, code).subscribe(response => {
				this.message = response;
				if(this.message != null) {
					this.messageToast();
                    this.dismiss();
                }
			});
		} else {
            this.message = 'Preencha todos os campos!';
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
    
}