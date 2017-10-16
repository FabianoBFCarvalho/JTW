
import { Injectable }                                       from '@angular/core';
import { Http, Headers, RequestOptions }                    from '@angular/http';
import { Observable }                                       from 'rxjs';
import { Bank }                                             from '../interface/bank';

@Injectable()
export class BankService {

	private urlBanks = 'http://api.imobzi.com/v1/banks';
	private headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
	private options = new RequestOptions({ headers: this.headers });
	
    constructor(
        private http: Http,
    ) { }

	getBanks(): Observable<Bank[]> {
        return new Observable<Bank[]>(observer => {
            this.http.get(this.urlBanks, this.options)
            .subscribe( response => {
                observer.next(response.json().success.banks);
            });
        });
    }

    postBank(name: string, code: string): Observable<Boolean> {
        return new Observable(obserser => {
            let body = JSON.stringify({name: name, code: code});          
            this.http.post(this.urlBanks, this.options, body).subscribe(response => {
             obserser.next(true);

            });
        });

    }
}