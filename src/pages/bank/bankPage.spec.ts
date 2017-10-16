import { async, TestBed, ComponentFixture }         from "@angular/core/testing";
import { DebugElement }                             from "@angular/core";
import { IonicModule,NavController }                from "ionic-angular";
import { By }                                       from "@angular/platform-browser";
import { BankPage}                                  from "./bankPage";

import { Observable }                               from "rxjs/Observable";
import { BankService }                              from "../../sevice/bankService";
import { Bank } from "../../interface/bank";

class serviceMock {

    getBanks() {

    }

    postBank(name: string, code: string) {

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
    });

    it('should creat BankPage', () => expect(comp).toBeDefined());
});