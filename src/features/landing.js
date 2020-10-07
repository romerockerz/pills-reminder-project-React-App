import React,{useState,useEffect} from 'react';
import {CurrentUserContext} from '../contexts/current-user-context';
import useFetch from '../hooks/use-fetch';
import {Link} from  'react-router-dom';
import {Constant} from '../constants/api-constants';
import Table from 'react-bootstrap/Table';
import Login from './login';

export default function Landing() {
  const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
  const user_id = localStorage.getItem(Constant.USER_ID);
  const [selfhistory, setSelfHistory] = useState(null);
  const [dependenthistory, setDependentHistory] = useState(null);
  const {loading, response, error, doFetch} = useFetch(`http://localhost:4000/medical_histories/${user_id}/self`);
  useEffect(() => {
    doFetch({
      method: "get"
    })
  },[])
  
  useEffect(() => {
    console.log(response);
    if (response){
    setSelfHistory(response)}
  }, [response])
  
  const {loading: loading_d, response: response_d, error: error_d, doFetch: doFetch_d} = useFetch(`http://localhost:4000/medical_histories/${user_id}/deps`);
  useEffect(() => {
    doFetch_d({
      method: "get"
    })
  },[])
  
  useEffect(() => {
    console.log(response_d);
    if (response_d){
    setDependentHistory(response_d)}
  }, [response_d])


  console.log(currentUserState.currentUser);
  return (
    <div>
      <div className="container" > 
            <h2>User Profile</h2>
      </div>
      <div className="container">
        <h3>Welcome {currentUserState.currentUser && currentUserState.currentUser.email}</h3>
      </div>
      <hr  style={{
                        color: '#000000',
                        backgroundColor: '#000000',
                        height: .5,
                        borderColor : '#000000'
                    }}/> 
      <div className = "d-flex justify-content-around" >
            <Link to = "/medical_history"> 
                <button type ="button" className="btn btn-info">
                    Add Medical History
                </button>
            </Link>     
      </div>
      <br/>
      
      <table> 
        <tr> 
            <td className = "paddingleft"> 
                <h5>Medical History for Self</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th scope="col">Illness</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Medicine</th>
                        <th scope="col">Dosage Time</th>

                        </tr>
                    </thead>
                    <tbody>
                        {selfhistory && selfhistory.map(h => {
                        return (
                            <tr>
                                <td>{h.illness}</td>
                                <td>{h.drname}</td>
                                <td>{h.medicine}</td>
                                <td>{h.dosage_time}</td>
                            </tr>
                        )
                        })}
                    </tbody>
                </Table>
                
            </td>
            
            <div className = "spaceleft">
            <td >
                <h5>Medical History for Dependents</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th scope="col">Illness</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Medicine</th>
                        <th scope="col">Dosage Time</th>

                        </tr>
                    </thead>
                    <tbody>
                        {dependenthistory && dependenthistory.map(h => {
                        return (
                            <tr>
                                <td>{h.illness}</td>
                                <td>{h.drname}</td>
                                <td>{h.medicine}</td>
                                <td>{h.dosage_time}</td>
                            </tr>
                        )
                        })}
                    </tbody>
                </Table>
            </td>
            </div>
        </tr> 
      </table>
      
      






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
      
      
    </div>
  )
}