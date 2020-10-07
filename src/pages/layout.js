import React,{useContext} from 'react';
import {Constant} from '../constants/api-constants';
import {Link} from 'react-router-dom';
import Logout from './logout';
import {CurrentUserContext} from '../contexts/current-user-context'
import {
    NavLink,
    Redirect
} from 'react-router-dom';

export default function Layout(){
    let token = localStorage.getItem(Constant.AUTH_TOKEN)
    const [currentUserState,setCurrentUserState] = useContext(CurrentUserContext);


    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        setCurrentUserState(state =>({
            ...state,
            isLoggedIn: false,
            isLoading: false,
            currentUser: null,
        }))
        //return <Redirect to= "/login" />
      }
    if(!currentUserState.isLoggedIn){
        return <Redirect to = "/login" />
    }  
    return (
    <div className="card text-center"> 
        <div className = "card-header">
            <nav className="navbar navbar-light navbar-expand-lg bg-light">
            <div className="nav nav-tabs card-header-tabs">
                <a className="navbar-brand" href="#">Pills Reminder</a>    
            </div>          
                <button className="navbar-toggler" type="button" 
                    data-toggle="collapse" 
                    data-target="#top-nav" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="nav nav-tabs card-header-tabs">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">               
                            <Link className="nav-link" to="/landing">Home Page</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/profile">My Profile</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/medical_history">Medical History </Link>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="nav nav-tabs card-header-tabs">
                { currentUserState.currentUser && <a onClick={handleLogout} className="nav-link" href="#">Logout</a>} 
                </div>
            </nav>
        </div> 
    </div>  
    )
}