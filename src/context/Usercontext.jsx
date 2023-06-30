import { createContext,useEffect,useReducer} from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null
}

const Reducer = (state,action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return{
                user: action.payload
            }
        case 'LOGIN_FAILURE':
            return{
                user:null
            }
        case 'LOGOUT':
            return{
                user:null
            }
        default: return state
    }
}

export const usercontext = createContext(INITIAL_STATE)

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer,INITIAL_STATE)


    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
    },[state.user])

    return <usercontext.Provider value={{user:state.user,dispatch}}>
        {children}
    </usercontext.Provider>
}