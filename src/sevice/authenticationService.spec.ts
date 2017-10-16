import { TestBed, inject, async }               from "@angular/core/testing";
import { Http, HttpModule, Response,
         XHRBackend, ResponseOptions }          from "@angular/http";
import { MockBackend, MockConnection }          from '@angular/http/testing';
import { AuthenticationService }                from './authenticationService';
import { Observable }                           from "rxjs/Observable";

const mockResponse = 
    { success: {
          token: "token",
          message: "Token successfully generated"
        }
    }

describe('UserService test', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule],
            providers: [
                AuthenticationService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ]
        })
    }));

    it('should return getBanks()', 
        inject([AuthenticationService,XHRBackend],(authenticationService: AuthenticationService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
            authenticationService.login('felipe@quickfast.com','iquick7s@2017').subscribe(login => {
                (expect(login).toBe(true));
            })
        })
    );    
});