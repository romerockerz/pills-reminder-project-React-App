import React,{useState} from 'react';
import {Constant} from '../constants/api-constants';
import {CurrentUserContext} from '../contexts/current-user-context';

export const CurrentUserProvider = ({children}) => {
    let token = localStorage.getItem(Constant.AUTH_TOKEN);

    const [state , setState] = useState({
        isLoggedIn: token ? true : false,
        isLoading: false,
        currentUser: token
    })
    return (
        <CurrentUserContext.Provider value = {[state,setState]}>
            {children}
        </CurrentUserContext.Provider>
    )
}