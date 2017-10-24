import { async, TestBed, ComponentFixture }         from "@angular/core/testing";
import { DebugElement }                             from "@angular/core";
import { IonicModule, NavController, 
         ToastController }                          from "ionic-angular";
import { By }                                       from "@angular/platform-browser";
import { BankPage }                                 from "./bankPage";
import { BankService }                              from "../../service/bankService";
import { Bank }                                     from "../../interface/bank";
import { ToastMock }                                from "../../mock/toastMock";
import { BankServiceMock }                          from "../../mock/bankServiceMock";

describe('Test BankPage', () => {

    let de: DebugElement;
    let comp: BankPage;
    let fixture: ComponentFixture<BankPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                IonicModule.forRoot(BankPage),
            ],
            declarations: [
                BankPage
            ],
            providers: [
                {
                    provide: BankService,
                    useClass: BankServiceMock
                },
                {
                    provide: ToastController,
                    useClass: ToastMock
                }
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

    it('test searchBanks()', () => {
        comp.searchBanks('ru');
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('p'));
        expect(de.nativeElement.innerText).toBe('russo');
    });

});