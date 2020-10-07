import React, {useState, useEffect, useContext} from 'react'
import {CurrentUserContext} from '../contexts/current-user-context';
import useFetch from '../hooks/use-fetch';
import {Constant} from '../constants/api-constants';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

const API_SESSIONS = "http://localhost:4000/sessions";
export default function Login (){
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);

    const {loading, response, error , doFetch} = useFetch(API_SESSIONS);

    let token = localStorage.getItem(Constant.AUTH_TOKEN);
    console.log("Token :" ,  token);
    // add key to map elements 
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Successfully Logged In");
        doFetch({
            method: "post" ,
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        })
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        console.log("Reached this use effect")
        if(!response) return 
        console.log("Response: ", response);
        if(!response.token) return

        localStorage.setItem(Constant.AUTH_TOKEN,response.token);
        localStorage.setItem(Constant.USER_ID, response.id);

        setCurrentUserState(state => ({
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: response
        }))
    },[response])
    if (currentUserState.currentUser) {
        return <Redirect to = "/landing" />
    }
    return (
        <div>            
            <div className="card text-center"> 
                <div className = "card-header">
                    <h2>Welcome to Pills Reminder</h2>
                </div>
            </div>
        <div className = "cardposition">    
        <div className="container">  
        <div className="card p-5" style={{maxWidth:"400px"}}>
            <form onSubmit = {handleSubmit} >
                
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" 
                           onChange = {handleChange}
                           value = {user.email}
                           name ="email"
                           className = "form-control"  
                    />
                </div>
                <div className = "form-group">
                    <label>Current Password</label>
                    <input type= "password"
                           onChange = {handleChange}
                           value = {user.password}
                           name = "password"
                           className = "form-control"
                    />
                </div>
                <div className = "d-flex justify-content-center" >
                    <button className="btn btn-success">Sign In</button> 
                </div>
                <div className = "d-flex justify-content-around" >
                    <span>
                        <Link to = "/register" >New User</Link>
                    </span>
                </div>
            </form>
        </div>
        </div>
        </div>
        </div>
    )
}
