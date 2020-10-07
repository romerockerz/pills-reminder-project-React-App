import React, {useState, useContext, useEffect} from 'react';
import {Constant} from '../constants/api-constants';
import {CurrentUserContext} from '../contexts/current-user-context'
import useFetch from '../hooks/use-fetch';

export default function CurrentUserChecker({children}) {
    const token = localStorage.getItem(Constant.AUTH_TOKEN);
    const [currentUserState , setCurrentUserState] = useContext(CurrentUserContext);
    const {loading, response, error, doFetch} = useFetch("http://localhost:4000/sessions/user");

    useEffect(() => {
        if(!token) {
            setCurrentUserState( state => ({
                ...state,
                isLoggedIn: false
            }))
            return;
        }
        doFetch();

        setCurrentUserState( state => ({
            ...state,
            isLoading: true
        }));
    },[setCurrentUserState, token])

    useEffect(()=> {
        if(!response) return;

        setCurrentUserState(state =>({
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: response
        }))
    },[setCurrentUserState,response])
    return children;
}