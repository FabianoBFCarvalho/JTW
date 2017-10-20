import { Observable }       from "rxjs/Observable";

export class AuthenticationServiceMock {
    login(email: string, password: string): Observable<Boolean> {
        if (email == 'fabiano@quickfast.com' && password == 'senha') 
            return new Observable<Boolean>(observer => observer.next(true));
        else
            return new Observable<Boolean>(observer => observer.error(500));
    }
    logout() {
        return { }
    }
}