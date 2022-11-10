import {loginReducerState} from "../Reducer/loginreducer"
import  {createSelector} from "@ngrx/store";
import {getvalues} from '../Reducer/index';


 const getloading=(state:loginReducerState)=>{
    return state.loading
}
const getloaded=(state:loginReducerState)=>{
   return state.loaded
}
const geterror=(state:loginReducerState)=>{
   return state.error
}
const getloginvalues=(state:loginReducerState)=>{
  return   state.loginvalues
}
export const getloginloading=createSelector(getvalues,getloading);
export const getloginloaded=createSelector(getvalues,getloaded);
export const getlogivalues=createSelector(getvalues,getloginvalues);
export const getloginerror=createSelector(getvalues,geterror);
