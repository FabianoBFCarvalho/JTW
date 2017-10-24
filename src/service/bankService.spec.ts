import { TestBed, inject, async }               from "@angular/core/testing";
import { Http, HttpModule, Response,
         XHRBackend, ResponseOptions }          from "@angular/http";
import { MockBackend, MockConnection }          from '@angular/http/testing';
import { BankService }                          from './bankService';
import { Observable }                           from "rxjs/Observable";
import { ToastController }                      from "ionic-angular";

describe('BankService test', () => {

    let backEnd = (mockBackend,mockResponse) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
            })));
        });
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule],
            providers: [
                BankService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ]
        })
    }));

    it('should return getBanks()', 
        inject([BankService,XHRBackend],
            (bankService: BankService, mockBackend: MockBackend) => {
            const mockResponse = {
                success: { 
                    banks: [
                        { code: "string", name: "brasileiro", db_id: 0 },
                        { code: "string", name: "russo",db_id: 0 }
                    ]
                }
            }
          backEnd(mockBackend,mockResponse);
            bankService.getBanks().subscribe(banks => {
                expect(banks[0].name).toBe('brasileiro');
            });
        })
    );

    it('should return postBanks()', 
        inject([BankService,XHRBackend],
            (bankService: BankService, mockBackend: MockBackend) => {
            const mockResponse = { success: { message: "Banco Adicionado!" }};
            backEnd(mockBackend,mockResponse);
            bankService.postBanks('name','code').subscribe(post => {
                expect(post).toBe('Banco Adicionado!');
            });
        })
    );

    it('should return EditBank()',
        inject([BankService,XHRBackend],
            (bankService: BankService, mockBackend: MockBackend) => {
            const mockResponse = { success: { message: "Atualizado!" }};
            backEnd(mockBackend,mockResponse);
            bankService.postBank(1,'name','code').subscribe(post => {
                expect(post).toBe('Atualizado!');
            });
        })
    );

    it('should return deleteBank()',
        inject([BankService,XHRBackend],
            (bankService: BankService, mockBackend: MockBackend) => {
            const mockResponse = { success: { message: "Deletado!" }};
            backEnd(mockBackend,mockResponse);
            bankService.deleteBank(15).subscribe(post => {
                expect(post).toBe('Deletado!');
            });
        })
    );
});