import React, {useContext} from 'react';
import {CurrentUserContext} from '../contexts/current-user-context';

export default function Logout () {
    // const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    //     setCurrentUserState(state => ({
    //         ...state,
    //         isLoggedIn: false,
    //         isLoading: false,
    //     }))
    // }
    }
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}