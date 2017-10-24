import { Observable }                           from "rxjs/Observable";
import { Bank }                                 from "../interface/bank";

export class BankServiceMock {

    getBanks():Observable<Bank[]> {
        return new Observable<Bank[]>(response => {
            response.next([
                { code: "3", name: "brasileiro", db_id: 0 },
                { code: "3", name: "russo", db_id: 0 }
            ]);
        });
    }

    postBanks(name: string, code: string): Observable<string> {
        return new Observable(observer => {
            if (name == 'Banco 2')
                observer.error('Você não possue autorização para esta ação!');
            else
                observer.next('Banco adicionado');
        });
    }

    postBank(id: number, name: string, code: string):Observable<string> {
        return new Observable(observer => {
            if (name == 'Banco 2')
                observer.error('Você não possue autorização para esta ação!');
            else
                observer.next('Banco atualizado');
        });
    }

    deleteBank(id: number):Observable<string> {
        return new Observable(observer => {
            if (id == 2)
                observer.error('Você não possue autorização para esta ação!');
            else
                observer.next('Banco deletado');
        });
    }
}