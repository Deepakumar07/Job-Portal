import {createSelector} from "@ngrx/store";
import {JoblistState} from "../Reducer/joblist-reducer"
import {getjobsvalues} from "../Reducer"

const getloading=(state:JoblistState)=>{
    return state.jobloading;
}
const getloadedjobs=(state:JoblistState)=>{
    return state.jobloaded;
}
const getjobs=(state:JoblistState)=>{
    return state.joblist;
}
const getjobserr=(state:JoblistState)=>{
    return state.error;
}

export const getjobsLoading= createSelector(getjobsvalues, getloading);
export const getjobsloaded= createSelector(getjobsvalues, getloadedjobs);
export const getjobslist= createSelector(getjobsvalues, getjobs);
export const getjobserror= createSelector(getjobsvalues, getjobserr);
