import { Observable }                       from "rxjs/Observable";
import { Bank }                             from "../interface/bank";


export class ServiceMock {

    getBanks():Observable<Bank[]> {
    return new Observable<Bank[]>(response => {
        response.next(
            [{
                code: "string", name: "brasileiro", db_id: 0
            },
            {    
                code: "string", name: "russo", db_id: 0
            }]
            ); 
        });
    }

    postBanks(name: string, code: string): Observable<string> {
        return new Observable(obserser => {
             obserser.next('sucesso');
            });
    }

    postBank(id: number, name: string, code: string):Observable<string>  {
        return new Observable(obserser => {
            obserser.next('sucesso');
        });
    }

    deleteBank(id: number):Observable<string>  {
        return new Observable(obserser => {
            obserser.next('sucesso');;
        });
    }
}