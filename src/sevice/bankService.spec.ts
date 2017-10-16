import { TestBed, inject, async }               from "@angular/core/testing";
import { Http, HttpModule, Response,
         XHRBackend, ResponseOptions }          from "@angular/http";
import { MockBackend, MockConnection }          from '@angular/http/testing';
import { BankService }                          from './bankService';
import { Observable }                           from "rxjs/Observable";

const mockResponse = 
{
    success: {
        banks: [{
            code: "string",
            name: "brasileiro",
            db_id: 0
        },
        {    
            code: "string",
            name: "russo",
            db_id: 0
        }]
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

describe('UserService test', () => {

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
            })
        })
    );    
});