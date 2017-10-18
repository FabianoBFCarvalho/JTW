import { async, TestBed, ComponentFixture }         from "@angular/core/testing";
import { DebugElement }                             from "@angular/core";
import { IonicModule, NavController, 
    ToastController }                               from "ionic-angular";
import { By }                                       from "@angular/platform-browser";
import { BankPage}                                  from "./bankPage";

import { Observable }                               from "rxjs/Observable";
import { BankService }                              from "../../sevice/bankService";
import { Bank }                                     from "../../interface/bank";

import { ServiceMock }                              from "../../mock/serviceMock";

 class ToastMock {

    create() {
       return new ToastMock;
    }

     present(): Promise<any> {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}

describe('Test BankPage', () => {

    let de: DebugElement;
    let comp: BankPage;
    let fixture: ComponentFixture<BankPage>;

    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
            imports: [
                IonicModule.forRoot(BankPage),
            ],
            declarations: [BankPage],
            providers: [
                {
                    provide: BankService,
                    useClass: ServiceMock
                },
                {
                    provide: ToastController,
                    useClass: ToastMock
                },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BankPage);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should creat BankPage', () => expect(comp).toBeDefined());

    it('should list', () => {
        de = fixture.debugElement.query(By.css('p'));
        expect(de.nativeElement.innerText).toBe('brasileiro');
    });

    it('test postBanks()', () => {
        comp.postBanks('teste','teste');
        fixture.detectChanges();
        expect(comp.message).toBe('sucesso');
    });

    it('test deleteBank()', () => {
        fixture.detectChanges();
        comp.deleteBank(2);
        expect(comp.message).toBe('sucesso');
    });

    it('test editBank()', () => {
        comp.editBank(2,'teste','teste');
        expect(comp.message).toBe('sucesso');
    });

});