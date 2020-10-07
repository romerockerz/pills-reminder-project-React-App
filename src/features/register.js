import React, {useState,useEffect} from 'react';
import useFetch from '../hooks/use-fetch';
import {Link} from 'react-router-dom';

const API_USER_REGISTER = "http://localhost:4000/users";

export default function Register () {
    const [user, setUser] = useState({
        name : "",
        email: "",
        contact: "",
        country: "",
        date_of_birth: "",
        password: "",
        
    })

    const {response , doFetch} = useFetch(API_USER_REGISTER);

    const handleSubmit = (e) => {
        e.preventDefault();
        doFetch({
            method: "post",
            body: JSON.stringify({
                user: {
                user_name: user.name,
                email: user.email,
                contact: user.contact,
                country: user.country,
                date_of_birth: user.date_of_birth,
                password: user.password
                }
            })
        })
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    let checkpassword = "";
    const checkPassword = (e) => {
        if (e.target.value == user.password) {
            checkpassword = " Password and Confirm Password matches ";
        }
        checkpassword = " Password and Confirm Password does not match";
    }

    return (
        <div>
            <div className="card text-center"> 
                <div className = "card-header">
                <div className="container" >
                    <div className="paddingtop">
                        <h2> Registration</h2>
                    </div>
                </div>
                </div>
            </div>
            <div className="container">    
                <h2 className="text-muted"> Please enter below information to Register! </h2>
            </div> 
            <div className="container">
            <div className="card p-5" style={{maxWidth:"400px"}}>
            <form onSubmit = {handleSubmit} >
                   
                    <div className="form-group">
                        <label>Name*</label>
                        <input type="text" 
                            onChange = {handleChange}
                            value = {user.name}
                            name ="name"
                            className = "form-control"  
                        />
                </div>
                <div className="form-group">
                    <label>Email*</label>
                    <input type="email" 
                           onChange = {handleChange}
                           value = {user.email}
                           name ="email"
                           className = "form-control"  
                    />
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="number" 
                           onChange = {handleChange}
                           value = {user.contact}
                           name ="contact"
                           className = "form-control"  
                    />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" 
                           onChange = {handleChange}
                           value = {user.country}
                           name ="country"
                           className = "form-control"  
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth*</label>
                    <input type="date" 
                           onChange = {handleChange}
                           value = {user.date_of_birth}
                           name ="date_of_birth"
                           className = "form-control"  
                    />
                </div>
                <div className = "form-group">
                    <label>Password*</label>
                    <input type= "password"
                           onChange = {handleChange}
                           value = {user.password}
                           name = "password"
                           className = "form-control"
                    />
                </div>
                <span>
                <div className = "form-group">
                    <label>Confirm Password*</label>
                    <input type= "password"
                           onChange = {checkPassword}
                           name = "confirm_password"
                           className = "form-control"
                    />
                </div>
                <div>
                    {checkpassword}
                </div>
                </span>
                <div className = "d-flex justify-content-center" >
                    <button className= "btn btn-primary">Register</button> 
                </div>
                <div className = "d-flex justify-content-around" >
                    <Link to = "/login" >Cancel</Link>
                </div>
            </form>
            </div>
            </div>
        </div>
    )
} 