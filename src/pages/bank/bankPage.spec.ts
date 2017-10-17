import { async, TestBed, ComponentFixture }         from "@angular/core/testing";
import { DebugElement }                             from "@angular/core";
import { IonicModule,NavController }                from "ionic-angular";
import { By }                                       from "@angular/platform-browser";
import { BankPage}                                  from "./bankPage";

import { Observable }                               from "rxjs/Observable";
import { BankService }                              from "../../sevice/bankService";
import { Bank }                                     from "../../interface/bank";

class serviceMock {
    getBanks():Observable<Bank[]> {
    return new Observable<Bank[]>(response => {
        response.next(
            [{
                code: "string", name: "brasileiro", db_id: 0
            },
            {    
                code: "string", name: "russo", db_id: 0
            }]
            ); 
        });
    }

    postBanks(name: string, code: string): Observable<string> {
        return new Observable(obserser => {
             obserser.next('sucesso');
            });
    }

    postBank(id: number, name: string, code: string):Observable<string>  {
        return new Observable(obserser => {
            obserser.next('sucesso');
        });
    }

    deleteBank(id: number):Observable<string>  {
        return new Observable(obserser => {
            obserser.next('sucesso');;
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
                    useClass: serviceMock
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
        expect(comp.message).toBe('sucesso');
    });

    it('test deleteBank()', () => {
        comp.deleteBank(2);
        expect(comp.message).toBe('sucesso');
    });

    it('test editBank()', () => {
        comp.editBank(2,'teste','teste');
        expect(comp.message).toBe('sucesso');
    });

});