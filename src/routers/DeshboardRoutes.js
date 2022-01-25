import React from "react";
import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import { TodosPersn } from '../components/Dc/DcScreen'
import { HeroScreen } from '../components/heroes/HeroScreen'
import { SearchScreen } from "../components/search/SearchScreen";
import { Navbar } from '../components/ui/NavBar'



export const DeshboardRoutes = () => {
    
    return (
    <>
    <Navbar />
    <div className= "container mt-3">
    <Switch>
    <Route exact path = "/personaje/:heroeId" component = {HeroScreen}/>
    <Route exact path = "/personajes" component = {TodosPersn}/>
    <Route exact path = "/search" component = {SearchScreen}/>
    <Redirect to ="/personajes"/>
    </Switch>
    </div>    
    </>
    )
}
