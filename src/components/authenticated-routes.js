import React from 'react';
import {Redirect} from 'react-router-dom';
import {CurrentUserContext} from '../context/user-context';

export default function AuthenticatedRoutes({children}) {
    const [userContext, setuserContext] = React.useContext(CurrentUserContext);
  
    if (!userContext.isLoggedIn) {
      return <Redirect to = "/" />
    }
    return (
      children
    )
}