import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
    import {
        BrowserRouter as Router,
        Switch
    } from "react-router-dom";
import { LoginScreen } from '../components/login/LoginScreen';
import { DeshboardRoutes } from "./DeshboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import {firebase} from '../firebase/firebase-config'
import { login } from "../actions/auth";

export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setchecking] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false)


    useEffect(() => {
        firebase.auth().onAuthStateChanged(async(user) =>{
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setisLoggedIn(true)
            } else {
                setisLoggedIn(false)
            }
            setchecking(false)
        })
    }, [dispatch, setchecking, setisLoggedIn])


if(checking) {
    return(
        <h1>Wait...</h1>
    )
}

    return (
        <div>
        <Router>
    <div>
        <div>
        <Switch>
        <PublicRoute
        exact path = "/login" component = {LoginScreen}
        isAuthenticated = {isLoggedIn}
        />

        <PrivateRoute
        path="/" 
        component = {DeshboardRoutes} 
        isAuthenticated = {isLoggedIn}
        />

        </Switch>
        </div>
        
    </div>
    </Router>
        </div>
        
    )
}
