import { Injectable } 										from '@angular/core';
import { Http, Headers, RequestOptions }         			from '@angular/http';
import { Observable } 										from 'rxjs';

@Injectable()
export class AuthenticationService {
	
	constructor( private http: Http ) { }
	
	login(email: string, password: string): Observable<Boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let params: JSON = JSON.parse('{}');
        params['email'] = email.trim();
        params['password'] = password.trim();
        params['device'] = 'core';
        return new Observable(observer => {
            const loginUrl = 'http://api.imobzi.com/v1/login';
            this.http.post(loginUrl, JSON.stringify(params), options).subscribe(
                response => {
                    localStorage.setItem('token',
                    response.json().success.token);
                    observer.next(true);
                },
                 error => {
                    if (error.status == 401 || error.status == 500)             
                        observer.error('Usuario ou senha invalido');
                    else
                        observer.error('Verifique a sua conexão!');
                }
            );
        });
    }

    logout() {
        localStorage.removeItem('token');
    }
}
