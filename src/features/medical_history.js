import React, {useState,useEffect,useContext} from 'react';
import useFetch from '../hooks/use-fetch';
import {Link} from 'react-router-dom';
import {CurrentUserContext} from  '../contexts/current-user-context';
import { Constant } from '../constants/api-constants';

export default function MedicalHistory ( ) {
    const user_id = localStorage.getItem(Constant.USER_ID);
    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
    const [medicalData, setMedicalData] = useState({
        illness: "",
        doctor_name: "",
        medicine: "",
        startdate: "",
        enddate: "",
        dosage_amount: "",
        dosage_frequency: "",
        dosage_time: "",
        email_notification: true
      });
    const [history, setHistory] = useState([]);  
    const [data, setData] = useState(null);
    const [dependentMed,setDependentMed] = useState(null);
    const [selectData, setSelectData] = useState([]);
    const {loading, response, error, doFetch} = useFetch(`http://localhost:4000/medical_histories/${user_id}/self`);
    useEffect(()=>{
        doFetch({
            method: "get"
        })
    },[])
    const [whom,setWhom] = useState({
        medicalgetter: "",
        medicalposter: ""
    })
    useEffect(()=>{
        if(response){
            setData(response)
        }
    },[response])
    
    console.log(whom.medicalgetter)
    const {loading: loading_d, response: response_d, error: error_d, doFetch: doFetch_d} 
                                = useFetch(`http://localhost:4000/dependents.json`);
    useEffect(()=>{
        doFetch_d({
            method: "get"
        })
    },[])

    useEffect(()=>{
        console.log("Hi");
        console.log(response_d);
        if (response_d)
        setSelectData(response_d);
    },[response_d])

    const {loading: loading_dep, response: response_dep, error: error_dep, doFetch: doFetch_dep} 
                                = useFetch(`http://localhost:4000/medical_histories/${user_id}/deps`);
    useEffect(()=>{
        doFetch_dep({
            method: "get"
        })
    },[])

    useEffect(()=>{
        if(response_dep){
            setDependentMed(response_dep)
        }
    },[response_dep])

    const [displayMedHist, setDisplayMedHist] = useState([])
    const handleSubmitView = (e) =>{
        e.preventDefault();
        console.log(e.target.value);
        setWhom({
            ...whom,
            medicalgetter: e.target.value
        })
        console.log(response);
        console.log(data);
        if (e.target.value == "Self"){
            setDisplayMedHist(response);
            console.log(displayMedHist);
        }
        else {
            console.log(selectData);
            let whichrelative = selectData.filter((f)=>{
                return f.relationship == e.target.value; 
            })
            console.log(whichrelative);
            console.log(dependentMed);
            let dependent_data = dependentMed.filter((g)=>{
                return g.dependent_id == whichrelative[0].id
            })
            //let dependent_data = dependentMed;
            //console.log(dependent_data);
            setDisplayMedHist(dependent_data);
        }
    }
    const handleChange = (e) => {
        setMedicalData({
          ...medicalData,
          [e.target.name]: e.target.value
        })
    }
    const handlePostProfile = (e) => {
        setWhom({
            ...whom,
            medicalposter: e.target.value
        })
        console.log("Hithis is medical profile",whom.medicalposter)
    }
    const {loading: loading_med, response: response_med, error: error_med, doFetch: doFetch_med} 
                                = useFetch(`http://localhost:4000/medical_histories`);                                
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (whom.medicalposter== "Self") {
            doFetch_med({ 
                method: "post",
                body: JSON.stringify({medical_history: {
                    illness: medicalData.illness,
                    drname: medicalData.doctor_name,
                    medicine: medicalData.medicine,
                    startdate: medicalData.startdate,
                    enddate: medicalData.enddate,
                    dosage_amount: medicalData.dosage_amount,
                    dosage_frequency: medicalData.dosage_frequency,
                    dosage_time: medicalData.dosage_time,
                    email_notify: medicalData.email_notification,
                    user_id: currentUserState.currentUser.id
                    }
                })
            })
        }
        else {
            let dependentPost = selectData.find((v)=>{
                return v.relationship == whom.medicalposter;
            })
            doFetch_med({ 
                method: "post",
                body: JSON.stringify({medical_history: {
                    illness: medicalData.illness,
                    drname: medicalData.doctor_name,
                    medicine: medicalData.medicine,
                    startdate: medicalData.startdate,
                    enddate: medicalData.enddate,
                    dosage_amount: medicalData.dosage_amount,
                    dosage_frequency: medicalData.dosage_frequency,
                    dosage_time: medicalData.dosage_time,
                    email_notify: medicalData.email_notification,
                    user_id: currentUserState.currentUser.id,
                    dependent_id: dependentPost.id
                    }
                })
            })
        }
        setHistory([...history, medicalData]);
      }

    return (
    <div>
      <div className="card text-center"> 
            <div className = "card-header">
                <div className="container" >   
                    <h2>Medical History</h2>
                </div>
            </div>
       </div>            
        <div>
            <label className="text-primary">View Medical History:     </label>
                <select name="medical_profile" value ={whom.medicalgetter} onChange={handleSubmitView}>
                    <option value=""></option>
                    <option value="Self">Self</option>
                    {response_d && selectData.map((opt)=>{
                        return <option>{opt.relationship}</option>
                    })}
                </select>
        </div>
        <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th scope="col">Illness</th>
              <th scope="col">Doctor Details</th>
              <th scope="col">Medicine</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Dosage Amount</th>
              <th scope="col">Dosage Frequency</th>
              <th scope="col">Dosage Time</th>
              <th scope="col">Email Notification</th>
            </tr>
          </thead>
          <tbody> 
            {displayMedHist && displayMedHist.map(h => {
              return (
                <tr>
                  <td>{h.illness}</td>
                  <td>{h.drname}</td>
                  <td>{h.medicine}</td>
                  <td>{h.startdate}</td>
                  <td>{h.enddate}</td>
                  <td>{h.dosage_amount}</td>
                  <td>{h.dosage_frequency}</td>
                  <td>{h.dosage_time}</td>
                  <td><input type ="checkbox" name= "emailnotify" 
                        value = {h.email_notify}/>
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        
        <div className="medhistoryform">
        <hr  style={{
                        color: '#000000',
                        backgroundColor: '#000000',
                        height: .5,
                        borderColor : '#000000'
                    }}/>
        <div className= "container">
            <h3 className="text-info">Add new medical history</h3>
        </div>            
        <div className="container">
        <form onSubmit={handleSubmit}>
            <label>
                Person having new Medical History :     
            </label>
            <div className ="form-group">       
                <select name="medical_profile" value ={whom.medicalposter} onChange={handlePostProfile}>
                    <option value=""></option>
                    <option value="Self">Self</option>
                    {response_d && selectData.map((opt)=>{
                        return <option>{opt.relationship}</option>
                    })}
                </select>
            </div>     
            <label>
               Illness: 
            </label>
                <div className="form-group">    
                    <input type="text" name="illness" onChange={handleChange} 
                    placeholder="illness" value={medicalData.illness}/>
                </div>
            <label>
                Doctor Name: 
            </label>
                <div className="form-group">    
                    <input type="text" name="doctor_name" onChange={handleChange} 
                    placeholder="doctor name" value={medicalData.doctor_name}/>
                </div>
        <label>
          Medicine:
        </label> 
            <div className="form-group">
                <input type="text"  name="medicine"  onChange={handleChange} 
                placeholder="medicine" value={medicalData.medicine}/>
            </div>
        <label>
          Starting Date: 
        </label>
            <div className="form-group">
                <input type="date"  name="startdate"  onChange={handleChange} 
                placeholder="01-01-1990" value={medicalData.startdate}/> 
            </div>
        <label>
          Ending Date:
        </label>
            <div className="form-group">
                <input type="date"  name="enddate"  onChange={handleChange} 
                placeholder="ending date" value={medicalData.enddate}/>
            </div>
        <label>
          Dosage Amount :  
        </label>
            <div className="form-group">
                <input type="number"  name="dosage_amount"  onChange={handleChange} 
                placeholder="dosage amount" value={medicalData.dosage_amount}/> 
            </div>
        <label>
          Dosage Frequency:  
        </label>
            <div className="form-group">
                <input type="number"  name="dosage_frequency"  onChange={handleChange} 
                placeholder="dosage frequency" value={medicalData.dosage_frequency}/>
            </div>
        <label>
          Dosage Time:  
        </label>  
            <div className="form-group">
            <input type="number"  name="dosage_time"  onChange={handleChange} 
            placeholder="dosage time" value={medicalData.dosage_time}/>
            </div>
        
        <label >
          Email Notification:  
        </label>  
            <div className="form-group">      
                <input type ="checkbox" name="emailnotification" onChange={handleChange} 
                value ={medicalData.email_notification}   
                />       
            </div> 

        <button className="btn btn-info">Add Medical History</button>
       </form> 
       </div>

      {/* dependent_id: null
       dosage_amount: "1 dosage"
      dosage_frequency: "daily-twice"
      dosage_time: "2pm"
      drname: "Dr. Strange"
      email_notify: true
      enddate: "2020-10-04"
      id: 68
      illness: "Fever"
      medicine: "Paracetomol"
      startdate: "2020-10-01"
      */ }
      
      {/* { response && response.map(r => {
          return (
            <div key={r.id} className="card mt-2 p-2">
              <h4>{r.drname}</h4>
              <p>{r.illness}</p>
            </div>
          )
      })} */}
    </div>
    </div>
    )
}