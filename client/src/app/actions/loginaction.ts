import { Action } from "@ngrx/store"
import { login } from "../model/login-model"

export enum loginActionType {
    Loadvalues = '[login] Load values',
    LoadValuesSuccess = '[login] Load Values Success',
    LoadFailure = '[login] Loadd Failure',
    RemoveLoad="Remove login user"
}

export class LoadValues implements Action {
    readonly type = loginActionType.Loadvalues;
}
export class RemoveLoad implements Action{
    readonly type= loginActionType.RemoveLoad
}

export class LoadValuesSuccess implements Action {
    readonly type = loginActionType.LoadValuesSuccess;
    constructor(public payload: { data?: any }) { }
}

export class LoadFailure implements Action {
    readonly type = loginActionType.LoadFailure;
    constructor(public payload: { err?: string }) {}
}

export type loginAction = LoadValues | LoadValuesSuccess | LoadFailure | RemoveLoad;