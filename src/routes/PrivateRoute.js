import { Fragment, useEffect} from "react";
import {useSelector} from 'react-redux'
import { Navigate } from "react-router-dom";


 


const PrivateRoute = (props) => {

    const authCache = localStorage.getItem('authDetails')
    const authState = useSelector(state=>state.auth)
    return (
        <Fragment>
            {authCache ? props.children : <Navigate to="/login" />}
        </Fragment>
    );
};

export default PrivateRoute;