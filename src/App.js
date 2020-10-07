import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

import {
  BrowserRouter as Router, 
  Switch,
  Route 
} from 'react-router-dom';
import Layout from './pages/layout';
import Login from './features/login';
import Logout from './pages/logout';
import Register from './features/register';
import Profile from './features/profile';
import Landing from './features/landing';
import {CurrentUserProvider} from './providers/current-user-provider';
import CurrentUserChecker from './components/current-user-checker';
import MedicalHistory from './features/medical_history';
function App() {
  return (
    <div className = "container-fluid"> 
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <Layout/>
          <div>
          <Switch>
            <Route path= "/" exact>
              <h1>Pills Reminder Project</h1>      
            </Route>
            <Route path= "/login">
              <Login/>
            </Route>
            <Route path= "/register">
              <Register/>
            </Route>
            <Route path="/landing">
              <Landing/>
            </Route>
            <Route path= "/profile">
              <Profile/>
            </Route>
            <Route path= "/medical_history">
              <MedicalHistory/>
            </Route>
            
          </Switch>
          </div>
        </Router>
      </CurrentUserChecker> 
    </CurrentUserProvider>
    </div>
    
  );
}

export default App;
