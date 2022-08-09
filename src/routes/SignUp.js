import SignUpPage from '../components/Login/SignUpPage'
import { Fragment } from 'react'
import {useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom'



   
const SignUp = ()=>{
    const authState = useSelector(state => state.auth)

    return(
        <Fragment>
        { !authState.isLoggedin &&  <SignUpPage/>}
        { authState.isLoggedin && <Navigate replace to='/dashboard' />}
        </Fragment>
     
    )

}

export default SignUp