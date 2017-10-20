
import { async, TestBed, ComponentFixture }         from "@angular/core/testing";
import { DebugElement }                             from "@angular/core";
import { IonicModule, NavController,
         ToastController, NavParams,
         ViewController, AlertController}           from "ionic-angular";
import { By }                                       from "@angular/platform-browser";
import { BankDetail }                               from "./bankDetail";
import { Bank }                                     from "../../interface/bank";
import { BankService }                              from "../../sevice/bankService";
import { BankServiceMock }                          from "../../mock/bankServiceMock";
import { ViewControllerMock }                       from '../../mock/viewControllerMock';
import { ToastMock }                                from '../../mock/toastMock';
import { NavParamsMock }                            from '../../mock/navParamsMock';

describe('Test BankDetail', () => {

    let de: DebugElement;
    let comp: BankDetail;
    let fixture: ComponentFixture<BankDetail>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                IonicModule.forRoot(BankDetail),
            ],
            declarations: [
                BankDetail
            ],
            providers: [
                {
                    provide: BankService,
                    useClass: BankServiceMock
                },
                {
                    provide: ToastController,
                    useClass: ToastMock
                },
                {
                    provide: NavParams,
                    useValue: NavParamsMock
                },
                {
                    provide: ViewController,
                    useClass: ViewControllerMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BankDetail);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should creat BankDetail', () => expect(comp).toBeDefined());

    it('test postBanks()', () => {
        comp.postBanks('Banco de Teste','123');
        expect(comp.message).toBe('Banco adicionado');
    });

    it('test postBank empty', () => {
        comp.postBanks('','');
        expect(comp.message).toBe('Preencha todos os campos!');
    });
    
    it('test deleteBank()', () => {
        comp.deleteBank(2);
        expect(comp.message).toBe('Banco deletado');
    });
    
    it('test editBank()', () => {
        comp.editBank('teste','teste');
        expect(comp.message).toBe('Banco atualizado');
    });

    it('test editBank with field empty', () => {
        comp.editBank('  ','  ');
        expect(comp.message).toBe('Preencha todos os campos!');
    });

    it('should detail bank', () => {
        comp.bank =  { code: "31", name: "Banco 2", db_id: 3 };
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('ion-card-content span'))[1]
        .nativeElement.innerText).toBe('Banco 2');
    });
});
