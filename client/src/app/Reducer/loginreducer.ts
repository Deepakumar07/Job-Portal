import { loginAction, loginActionType } from '../actions/loginaction'
import { login } from '../model/login-model'


export interface loginReducerState {
    loading: boolean
    loaded: boolean
    error: string
    loginvalues:any
}
const initialState: loginReducerState = {
    loading: false,
    loaded: false,
    error : "",
    loginvalues: []
}

export function LoginReducer(state = initialState, action: loginAction): loginReducerState {

    switch (action.type) {
        case loginActionType.Loadvalues: {
            return { ...state, loading: true,  }
        }
        case loginActionType.LoadValuesSuccess: {
            const data =action.payload.data;
            return { ...state, loading: false, loaded: true, loginvalues: data }
        }
        case loginActionType.LoadFailure: {
            const err = action.payload.err;
            return { ...state, error: err, }
        }
        case loginActionType.RemoveLoad:{
            return { ...state, loginvalues:[]}
        }
        default:
            return state;
    }

}



