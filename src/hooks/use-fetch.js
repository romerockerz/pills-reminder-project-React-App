import React, {useCallback, useEffect,useState} from 'react'
import {Constant} from '../constants/api-constants';

export default function useFetch(url) {
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [options, setOptions] = useState({});
    
    const doFetch = useCallback((options ={}) => {
        setLoading(true);
        setOptions(options);
    },[]);

    useEffect(()=> {
        //if already loaded than return  
        console.log("reached usefetch");
        if (!loading) return;
        console.log("loading is still there");
        async function fetchData(){
            try {
                let token = localStorage.getItem(Constant.AUTH_TOKEN);
                const response = await fetch(url, {
                    ...options,
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json; charset=UTf-8",
                        "Access-Control-Allow-Origin":"*",
                        "Authorization": token ? `Token ${token}` : "" 
                    }
                });

                const data = await response.json();
                setLoading(false);
                setResponse(data);
                setError(null); 
            } catch (e) {
                setError({
                    error: e.message
                })
            }   
        }
        
        try {
            fetchData();
        } catch (e) {
            setError({
                error: e.message
            })
        }
    },[loading, url, options])

    return {loading, response ,error, doFetch}
} 
