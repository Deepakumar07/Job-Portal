import * as fromlogin from "../Reducer/loginreducer";
import * as fromjobs from "../Reducer/joblist-reducer";
import {  ActionReducerMap,} from '@ngrx/store';


export interface loginReducerState{
    login: fromlogin.loginReducerState,
    jobs:fromjobs.JoblistState
}

export const Reducer:ActionReducerMap<loginReducerState>={

    login : fromlogin.LoginReducer,
    jobs: fromjobs.joblistReducer,
}

export const getvalues=(state:loginReducerState)=>{ return state.login};

export const getjobsvalues=(state:loginReducerState)=>{return state.jobs};