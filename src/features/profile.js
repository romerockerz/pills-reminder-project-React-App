import React, {useState,useEffect,useContext} from 'react';
import useFetch from '../hooks/use-fetch';
import {Link} from 'react-router-dom';
import {CurrentUserContext} from  '../contexts/current-user-context';
import { Constant } from '../constants/api-constants';



export default function Profile () {
    const user_id = localStorage.getItem(Constant.USER_ID);
    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
    const [userData, setUserData] = useState({})
    const [user, setUser] = useState({
        name : "",
        email: "",
        contact: "",
        country: "",
        date_of_birth: "",
        password: "",
    })

    const [dependent, setDependent] = useState({
        relationship : "",
        name : "",
        email: "",
        contact: "",
        bloodgroup: "",
        date_of_birth: "",
        weight: "",
        height: "",
    })

    const {loading: loading_user, response: response_user, error: error_user, doFetch: doFetch_user} = useFetch(`http://localhost:4000/users/${user_id}.json`);
    useEffect(() =>{
        doFetch_user({
            method: "get"
        })
    },[]);

    
    useEffect(() =>{
        if (response_user){
            console.log(response_user);
            setUser({
                name: response_user.user_name,
                email: response_user.email,
                contact: response_user.contact,
                country: response_user.country,
                date_of_birth: response_user.date_of_birth
            })
            console.log(user);
        }
    },[response_user]);
    
    const {loading: loading_up, response: response_up, error: error_up, doFetch: doFetch_up} = useFetch(`http://localhost:4000/users/${user_id}.json`);
    const handleUserProfileSubmit = (e) => {
        e.preventDefault();
        doFetch_up({
            method: "put",
            body: JSON.stringify({
                user: {
                user_name: user.name,
                email: user.email,
                contact: user.contact,
                country: user.country,
                date_of_birth: user.date_of_birth,
                password_digest: user.password
                }
            })
        })
    }
    const {loading, response , error, doFetch} = useFetch(`http://localhost:4000/dependents.json`);
    const handleDependentProfileSubmit = (e) => {
        e.preventDefault();
        doFetch({
            method: "post",
            body: JSON.stringify({
                dependent: {
                    relationship: dependent.relationship,
                    d_name: dependent.name,
                    d_email: dependent.email,
                    d_contact: dependent.contact,
                    d_blood_group: dependent.bloodgroup,
                    d_date_of_birth: dependent.date_of_birth,
                    weight: dependent.weight,
                    height: dependent.height,
                    user_id: currentUserState.currentUser.id
                }
            })
        })
    }
    const [selectData, setSelectData] = useState(null);
    const [viewFormData, setViewFormData] =useState(null);
    const {loading: loading_d, response: response_d, error: error_d, doFetch: doFetch_d} = useFetch(`http://localhost:4000/dependents.json`);
    useEffect(() => {
        doFetch_d({
          method: "get",
        });
    },[]);

    useEffect(() => {
        console.log(response_d)
        if (response_d){
            setSelectData(response_d)
        }
    },[response_d])
    const handleSelectDependent = (e) => {
        e.preventDefault();

        const whichDependent = selectData.filter((h)=>{
            return h.relationship == e.target.value
        })
        console.log(whichDependent);
        if(whichDependent){
        setViewFormData(whichDependent);}

        console.log("This is viewformdata: ", viewFormData)


    }
    
    const handleChangeUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeDependent = (e) => {
        setDependent({
            ...dependent,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>    
         <div className="card text-center"> 
                <div className = "card-header">
                    <div className="container" > 
                        <h2>My Profile</h2>
                    </div>
                </div>
            </div>                   
        <div>
            {error && JSON.stringify(error)}
        </div>
        <div className="tableborderprofile" >
        <table className="table table-striped table-condensed">
            <tr>
                <td>      
                    <div className="card p-5" style={{maxWidth:"400px"}}>
                        <form onSubmit = {handleUserProfileSubmit} >
                            {/* <h4> Display Image </h4>
                            <h2> "Display Name" </h2> */}
                            <h2> Update Profile </h2>
                            <div>
                                {response_up && JSON.stringify(response_up)}
                                {error_up && JSON.stringify(error_up)}
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" 
                                    onChange = {handleChangeUser}
                                    value = {user.name}
                                    name ="name"
                                    className = "form-control"  
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" 
                                    onChange = {handleChangeUser}
                                    value = {user.email}
                                    name ="email"
                                    className = "form-control"  
                                />
                            </div>
                            <div className="form-group">
                                <label>Contact Number</label>
                                <input type="number" 
                                    onChange = {handleChangeUser}
                                    value = {user.contact}
                                    name ="contact"
                                    className = "form-control"  
                                />
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <input type="text" 
                                    onChange = {handleChangeUser}
                                    value = {user.country}
                                    name ="country"
                                    className = "form-control"  
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" 
                                    onChange = {handleChangeUser}
                                    value = {user.date_of_birth}
                                    name ="date_of_birth"
                                    className = "form-control"  
                                />
                            </div>
                            <span>
                                <div className = "d-flex justify-content-center" >
                                    <button className="btn btn-dark">Save</button> 
                                </div>
                                <div className = "d-flex justify-content-around" >
                                    <Link to = "/login" >Cancel</Link>
                                </div>
                            </span>
                        </form>
                    </div>
                </td>
                <td>
                    <div className="card p-5" style={{maxWidth:"400px"}}>
                        <form onSubmit = {handleDependentProfileSubmit} >
                            <h2> Add Dependents</h2>
                            <div className="form-group">
                                <label>Relationship</label>
                                <input type="text" 
                                    onChange = {handleChangeDependent}
                                    value = {dependent.relationship}
                                    name ="relationship"
                                    className = "form-control"  
                                />
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" 
                                    onChange = {handleChangeDependent}
                                    value = {dependent.name}
                                    name ="name"
                                    className = "form-control"  
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" 
                                    onChange = {handleChangeDependent}
                                    value = {dependent.email}
                                    name ="email"
                                    className = "form-control"  
                                />
                            </div>
                            <div className="form-group">
                                <label>Contact Number</label>
                                <input type="number" 
                                    onChange = {handleChangeDependent}
                                    value = {dependent.contact}
                                    name ="contact"
                                    className = "form-control"  
                                />
                            </div>
                            <div className="form-group">
                                <label>BloodGroup</label>
                                <input type="text" 
                                    onChange = {handleChangeDependent}
                                    value = {dependent.bloodgroup}
                                    name ="bloodgroup"
                                    className = "form-control"  
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" 
                                    onChange = {handleChangeDependent}
                                    value = {dependent.date_of_birth}
                                    name ="date_of_birth"
                                    className = "form-control"  
                                />
                            </div>
                            <div className="form-group">
                                <label>Weight (kg) </label>
                                <input type="number" 
                                    onChange = {handleChangeDependent}
                                    value = {dependent.weight}
                                    name ="weight"
                                    className = "form-control"  
                                />
                            </div>
                            <div className="form-group">
                                <label>Height (cm) </label>
                                <input type="number" 
                                    onChange = {handleChangeDependent}
                                    value = {dependent.height}
                                    name ="height"
                                    className = "form-control"  
                                />
                            </div>
                            <div className = "d-flex justify-content-center" >
                                <button className="btn btn-dark">Save</button> 
                            </div>
                            <div className = "d-flex justify-content-around" >
                                <Link to = "/login" >Cancel</Link>
                                
                            </div>
                        </form>
                    </div>
                </td>
                <td>
                    <div>
                        <label className = "text-primary">View Dependents     </label>
                        <select name="dependents" onChange={handleSelectDependent}>
                            <option value="false"></option>
                            {selectData && selectData.map((opt)=>{
                                return <option>{opt.relationship}</option>
                            })}
                        </select>
                    </div>
                    { viewFormData && JSON.stringify(viewFormData)}
                    {
                    viewFormData && viewFormData.length>0 &&
                    <div>
                        <form>
                            <div className="form-group">
                                <label>Relationship </label>
                                <input type="text" value={viewFormData[0].relationship} />
                                {viewFormData.relationship}
                            </div>
                            <div className="form-group">
                                <label>Name </label>
                                <input type="text" value={viewFormData[0].d_name} />
                            </div>
                            <div className="form-group">
                                <label>Email </label>
                                <input type="text" value={viewFormData.d_email} />
                            </div>
                            <div className="form-group">
                                <label>Contact Number </label>
                                <input type="text" value={viewFormData.d_contact} />
                            </div>
                            <div className="form-group">
                                <label>Blood Group </label>
                                <input type="text" value={viewFormData.d_blood_group} />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth </label>
                                <input type="text" value={viewFormData.d_date_of_birth} />
                            </div>
                            <div className="form-group">
                                <label>Height </label>
                                <input type="text" value={viewFormData.height} />
                            </div>
                            <div className="form-group">
                            <label>Weight </label>
                            <input type="text" value={viewFormData.weigth} />
                            </div>
                        </form>
                    </div>
                    }
                </td>
            </tr>
        </table>
        </div>
        </div>
    )
}