import {Action} from "@ngrx/store";
import {joblist} from "../model/joblist-model"

export enum joblistActionType{

    LoadJobs='[LoadJobs] Load Jobs List',
    LoadJobsSuccess="[LoadJobSuccess] Load Jobs Success",
    LoadJobFailure="[LoadJobFailure] Load Jobs Failure",
    Updatejob="[UpdateJob] Update Job",
    DeleteJob="[DeleteJob] Delete Job"

}

export class LoadJobs implements Action{
    readonly type=joblistActionType.LoadJobs;
}

export class LoadJobsSuccess implements Action{
    readonly type=joblistActionType.LoadJobsSuccess;
    constructor(public payload:{data?: joblist[]}){}
}
export class LoadJobFailure implements Action{
    readonly type =joblistActionType.LoadJobFailure;
    constructor(public payload:{data?:string}){}
}
export class UpdateJob implements Action {
    readonly type=joblistActionType.Updatejob;
    constructor (public payload:{id?:string,data?: joblist[]}){}
}
export class DeleteJob implements Action {
    readonly type=joblistActionType.DeleteJob;
    constructor(public payload:{id:string}){}
}

export type JoblistAction= LoadJobs | LoadJobsSuccess | LoadJobFailure | UpdateJob | DeleteJob;