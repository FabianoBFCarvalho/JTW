import { Component }                            from '@angular/core'; 
import { Bank }                                 from '../../interface/bank';
import { NavParams, ViewController,
         ToastController, AlertController }     from 'ionic-angular';
import { BankService }                          from '../../service/bankService';

@Component({
    selector: 'bankDetail',
    templateUrl: './bankDetail.html'
})
export class BankDetail {
    
    constructor(
        private _bankService: BankService,
        private params: NavParams,
        public viewCtrl: ViewController,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
    ) { }

    bank: Bank;
    edit: boolean;
    message: string;
    newBank: boolean;
    name: string;
    codigo: string;
    
    ngOnInit() {
        this.newBank = this.params.get('newBank');
        this.bank = this.params.get('bankSelected');
    }

    onClickBankEdit() {
        this.newBank = true;
        this.name = this.bank.name;
        this.codigo = this.bank.code;
        this.edit = true;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    postBanks(name: string, code: string) {
		if (name.trim() && code.trim()) {
            this._bankService.postBanks(name, code).subscribe(
                response => {
				this.message = response;
                this.messageToast();
                this.dismiss();
                },
                error => {
                    this.message = error;
                    this.messageToast();
                    this.dismiss();  
                });
        }
        else {
			this.message = 'Preencha todos os campos!';
			this.messageToast();
		}
    }
    
    showConfirmDelete() {
		let confirm = this.alertCtrl.create({
            title: 'Atenção!',
            message: 'Deseja realmente apagar '+this.bank.name+' ?',
            buttons: [
                {
                    text: 'Sim',
                    handler: () => {
                        this.deleteBank(this.bank.db_id);
                    }
                },
                { text: 'Não', handler: () => { } }
            ]
		});
		confirm.present();
	}
	
    deleteBank(id: number) {
        this._bankService.deleteBank(id).subscribe(
            response => {
                this.message = response;
                this.messageToast();
                this.dismiss();
            },
            error => {
                this.message = error;
                this.messageToast();
                this.dismiss();
            });
    }

    editBank(name: string, code: string) {
		if (name.trim() && code.trim()) {
            this._bankService.postBank(
                this.bank.db_id, name, code).subscribe(
                response => {this.message = response;
                    this.messageToast();
                    this.dismiss();
                },
                error => {
                    this.message = error;
                    this.messageToast();
                    this.dismiss();
                }
            );
        } 
        else {
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
