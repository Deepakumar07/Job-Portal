
import {Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getvalues } from '../Reducer';
import {getloginerror, getlogivalues} from '../Selectors/login-selector';

@Injectable({ providedIn: 'root' })

export  class Repository{

constructor(private store: Store){

}
    getloginvalues(){
     const getvalue$=this.store.select(getlogivalues);
     return getvalue$;
    }
}

  