import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../Login/Login';
import { userContext } from '../../App';


const PrivateRoute = ({children}) => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
    // const [user] = useAuthState(auth);
    const location = useLocation();

    if(!loggedInUser.email){
        return <Navigate to="/login" state ={{from: location}} replace></Navigate>
    }
    
    return children;
};

export default PrivateRoute;