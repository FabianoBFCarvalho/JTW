import { TestBed, inject, async }               from "@angular/core/testing";
import { Http, HttpModule, Response,
         XHRBackend, ResponseOptions }          from "@angular/http";
import { MockBackend, MockConnection }          from '@angular/http/testing';
import { AuthenticationService }                from './authenticationService';
import { Observable }                           from "rxjs/Observable";

describe('AuthenticationService test', () => {

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
            const mockResponse = { success: { token: '123'} };
            mockBackend.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
            authenticationService.login('teste','teste').subscribe(login => {
                (expect(login).toBe(true));
            });
        })
    );
});