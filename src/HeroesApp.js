import React, { useEffect, useReducer } from 'react'
import { Provider } from 'react-redux'
import { authReducer } from './auth/authReducer'
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'
import "./styles.css"


export const HeroesApp = () => {

    const init = () => {
        return JSON.parse(localStorage.getItem("user")) || {
            logged: false
        }
    }
    const [user, dispatch] = useReducer(authReducer, {}, init);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])
    return (
        <div>
        <Provider store={store}>
            <AppRouter />
        </Provider>
        </div>
    )
}
