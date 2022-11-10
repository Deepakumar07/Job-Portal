import {JoblistAction, joblistActionType} from "../actions/joblist-action";
import {joblist} from "../model/joblist-model";
import {filter} from "rxjs/operators";

export interface JoblistState{
    jobloading:boolean,
    jobloaded:boolean,
    error:string,
    joblist:joblist[]
    delete:boolean,
    Update:boolean
}

const initialState:JoblistState={

    jobloading:false,
    jobloaded:false,
    error:"",
    delete:false,
    Update:false,
    joblist:[]
}

export function joblistReducer(state = initialState ,action:JoblistAction):JoblistState{

    switch(action.type){
        case joblistActionType.LoadJobs:{
            return {...state, jobloading:true}
        }
        case joblistActionType.LoadJobsSuccess:{
            const data=action.payload.data;
            return {...state, jobloading:false ,jobloaded:true, joblist:data}
        }
        case joblistActionType.LoadJobFailure:{
            const data=action.payload.data
            return {...state , error:data}
        }
        case joblistActionType.Updatejob:{
           const result=action.payload.id;
           return {
               ...state, Update:true, 
           }
        }
        case joblistActionType.DeleteJob:{
            
            const result=state.joblist.filter(data=>data.id !== action.payload.id)
            return {
                ...state, ...{result},delete:true,
            }
        }
        default:{
            return state;
        }
    }
}