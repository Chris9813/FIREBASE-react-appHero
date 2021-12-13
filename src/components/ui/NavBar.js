import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { startLogout } from '../../actions/auth';
import App from '../../App';


export const Navbar = () => {

    const dispatch = useDispatch()
    const {name} = useSelector(state => state.auth)


    function handleLogout() {
        dispatch(startLogout())
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        
                        className="nav-item nav-link" 
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        
                        className="nav-item nav-link" 
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        
                        className="nav-item nav-link" 
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>
            </div>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ms-auto">
                <App />
                    <span 
                        className="nav-item nav-link text-info align-self-end" 
                    >
                        {name}
                    </span>
                </ul>
            </div>


            <div className="navbar-collapse collapse w-200 order-3 dual-collapse2">
                <ul className="navbar-nav ms-auto">
                <button 
                        className="nav-item nav-link btn" 
                        onClick = {handleLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>

            
        </nav>
    )
}