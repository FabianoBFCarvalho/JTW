
import { Injectable }                                from '@angular/core';
import { Http, Headers, RequestOptions }             from '@angular/http';
import { Observable }                                from 'rxjs';
import { Bank }                                      from '../interface/bank';

@Injectable()
export class BankService {

	private urlBanks = 'http://api.imobzi.com/v1/banks';
    private headers = new Headers({ 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    });
	private options = new RequestOptions({ headers: this.headers });
	
    constructor( private http: Http ) { }

	getBanks(): Observable<Bank[]> {
        return new Observable<Bank[]>(observer => {
            this.http.get(this.urlBanks, this.options).subscribe(
                response => {
                    observer.next(response.json().success.banks);
                },
                erro => {
                    
                }
            );
        });
    }

    postBanks(name: string, code: string): Observable<string> {
        return new Observable(observer => {
            let body = JSON.stringify({name: name.trim(), code: code.trim()});         
            this.http.post(this.urlBanks, body, this.options)
            .subscribe(response => {
                observer.next(response.json().success.message);
            },
            error => {
                observer.error(error.status);
            });
        });
    }

    postBank(id: number, name: string, code: string): Observable<string> {
        const url = `${'http://api.imobzi.com/v1/bank'}/${id}`; 
        return new Observable(observer => {
            let body = JSON.stringify({name: name.trim(), code: code.trim()});         
            this.http.post(url, body, this.options).subscribe(response => {
                observer.next(response.json().success.message);
            },
            error => {
                observer.error(error.status);
            });
        });
    }

    deleteBank(id: number): Observable<string> {
        const url = `${'http://api.imobzi.com/v1/bank'}/${id}`; 
        return new Observable(observer => {
            this.http.delete(url, this.options).subscribe(response => {
                observer.next(response.json().success.message);
            },
            error => {
                observer.error(error.status);
            });
        });
    }
}