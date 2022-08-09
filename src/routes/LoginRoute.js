import { Fragment } from 'react'
import {useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom'
import LoginPage from '../components/Login/Login'
const Login = ()=>{

    const authState = useSelector(state => state.auth)

    return(
        <Fragment>
        { !authState.isLoggedin &&  <LoginPage/>}
        { authState.isLoggedin && <Navigate replace to='/dashboard' />}
        </Fragment>
    )

}

export default Login