import {Injectable} from "@angular/core";
import {AccountService} from "../service/account.service"
import {Store} from "@ngrx/store"
import { LoadJobFailure, LoadJobs, LoadJobsSuccess } from "../actions/joblist-action";
import { combineLatest, Observable } from "rxjs";
import {getjobserror, getjobslist, getjobsloaded, getjobsLoading} from "../Selectors/joblist-selector"
import { map, take } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
  })


export class JobreduxService{
    
    constructor(private service:AccountService , private store:Store){}


    getalljobs(force:boolean):[Observable<boolean>, Observable<any>, Observable<string>]{
        const getjoblist$=this.store.select(getjobslist);
        const getjobloading$=this.store.select(getjobsLoading);
        const getjobloaded$=this.store.select(getjobsloaded);
        const getjoberror$=this.store.select(getjobserror);
        combineLatest([getjobloaded$ ,getjobloading$]).pipe(take(1)).subscribe(result=>{
            if((!result[0] && !result[1])  || (force) ){
                this.store.dispatch(new LoadJobs());   
                const getalljobs$=this.service.getAlljobs();
                getalljobs$.subscribe(data=>{
            
                    // console.log(data);
                    this.store.dispatch(new LoadJobsSuccess({data}));
                }),err=>{
                    this.store.dispatch(new LoadJobFailure(err));
                }
             }
        })
        return [getjobloading$,getjoblist$,getjoberror$]

    }
}