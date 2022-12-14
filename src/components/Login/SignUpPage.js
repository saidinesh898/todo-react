import Button from '../UI/FormComponents/Button';
import Input from '../UI/FormComponents/Input';
import css from './LoginSignUp.module.css'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {authActions} from '../../store/auth-slice'
import useHttp from '../../hooks/httpRequest'
import { notifyActions } from '../../store/notification-slice';
import { APIURL } from '../../constants';



const SignUp = () => {
    const dispatch = useDispatch()
    const onLoginHanlder = (response, statusCode) => {
        console.log(response)
        if(statusCode === 400 && response.errors){
        dispatch(notifyActions.notify({
            type : "error",
            header : "Validation Error",
            message : "Entered Password is shorter than the minimum allowed length (7).",
            timer : 3000
        }))
       }
       else if(statusCode === 400){
        dispatch(notifyActions.notify({
            type : "error",
            header : "Failed to Create an Acount",
            message : "Email Already Exists",
            timer : 3000
        }))
       }
       else{
        dispatch(notifyActions.notify({
            type : "success",
            header : "Sucess",
            message : "Successfully Created an Account",
            timer : 3000
        }))
        dispatch(authActions.onLogin(response))
        localStorage.setItem("authDetails", JSON.stringify(response))
       }
    }
    const {isLoading, error, sendRequest} = useHttp(onLoginHanlder)
    const signUpSubmitHandler = (e) => {
        e.preventDefault()
        const enteredEmail = e.target.email.value
        const enteredPassword = e.target.password.value
        const enteredName = e.target.name.value
        const reqBody = {
            name : enteredName,
            email : enteredEmail,
            password : enteredPassword
        }
//
        if(enteredEmail.trim().length>0 && enteredPassword.trim().length>0){
            sendRequest({
                url: APIURL+"/users",
                method: "POST",
                body : reqBody,
                headers :  {
                    "Content-Type" : "application/json"
                }
            })
        }
    }
    return (
        <div className={css.loginLayout}>
            <div className={css.branding}><h1>Todo App Branding</h1></div>
            <div className={css.loginWrapper}>
                <h3>Sign up for your account</h3> 
                <form onSubmit={signUpSubmitHandler}>
                <Input
                    type="name"
                    className={css.loginInput} 
                    placeHolder="Enter Name"
                    htmlFor="name"
                    id="name"
                    required={true}
                />
                <Input
                    type="email"
                    className={css.loginInput} 
                    placeHolder="Enter Email"
                    htmlFor="email"
                    id="email"
                    required={true}
                />
                <Input
                    type="password"
                    className={css.loginInput} 
                    placeHolder="Enter Password"
                    htmlFor="password"
                    id="password"
                    required={true}
                />
                <Button className={css.submitButton} type="submit" id="submit">Create an Account</Button>
                </form>
                <hr className={css.solid}/>
                <Link to="../login"> <div className={css.signup}>Already have an account? Log in</div></Link>
            </div>
        </div>
    );
};
//
export default SignUp;