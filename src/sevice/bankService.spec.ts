import { TestBed, inject, async }               from "@angular/core/testing";
import { Http, HttpModule, Response,
         XHRBackend, ResponseOptions }          from "@angular/http";
import { MockBackend, MockConnection }          from '@angular/http/testing';
import { BankService }                          from './bankService';
import { Observable }                           from "rxjs/Observable";

const mockResponse = {
    success: { 
        banks: 
        [
            { code: "string", name: "brasileiro", db_id: 0 },
            { code: "string", name: "russo",db_id: 0 }
        ]
    }
}

describe('BankService test', () => {

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
        inject([BankService,XHRBackend],(bankService: BankService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
            bankService.getBanks().subscribe(banks => {
                (expect(banks[0].name).toBe('brasileiro'));
            });
        })
    );

    it('should return postBanks()', 
        inject([BankService,XHRBackend],(bankService: BankService, mockBackend: MockBackend) => {
            const mockCreate = {
                success: { message: "Banco Adicionado!", bank: 5 }
            }
            mockBackend.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockCreate)
                })));
            });
            bankService.postBanks('nome','code').subscribe(post => {
                expect(post).toBe('Banco Adicionado!');
            });
        })
    );

    it('should return EditBank()',
        inject([BankService,XHRBackend],(bankService: BankService, mockBackend: MockBackend) => {
            const mockUpdate = {
                success: { message: "Atualizado!", bank: 5 }
            }
            mockBackend.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockUpdate)
                })));
            });
            bankService.postBank(1,'nome','code').subscribe(post => {
                expect(post).toBe('Atualizado!');
            });
        })
    );

    it('should return deleteBank()',
        inject([BankService,XHRBackend],(bankService: BankService, mockBackend: MockBackend) => {
            const mockDelete = {
                success: { message: "Deu certo!" }
            }
            mockBackend.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockDelete)
                })));
            });
            bankService.deleteBank(15).subscribe(post => {
                expect(post).toBe('Deu certo!');
            });
        })
    );
});