import Button from '../UI/FormComponents/Button';
import Input from '../UI/FormComponents/Input';
import css from './LoginSignUp.module.css'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {authActions} from '../../store/auth-slice'
import useHttp from '../../hooks/httpRequest'


const Login = () => {
    const dispatch = useDispatch()
    const onLoginHanlder = (response, statusCode) => {
       if(statusCode === 401){
        alert("Invalid Credentials")
       }
       else{
        dispatch(authActions.onLogin(response))
        localStorage.setItem("authDetails", JSON.stringify(response))
       }
    }
    const {isLoading, error, sendRequest} = useHttp(onLoginHanlder)
    const loginSubmitHandler = (e) => {
        e.preventDefault()
        const enteredEmail = e.target.email.value
        const enteredPassword = e.target.password.value
        const reqBody = {
            email : enteredEmail,
            password : enteredPassword
        }
    

        if(enteredEmail.trim().length>0 && enteredPassword.trim().length>0){
            sendRequest({
                url: "https://todo-app.sinuos.in/users/login",
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
                <h3>Log in to your account</h3> 
                <form onSubmit={loginSubmitHandler}>
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
                <Button className={css.submitButton} type="submit" id="submit">Login</Button>
                </form>
                <hr className={css.solid}/>
                <Link to="../sign-up"> <div className={css.signup}>Sign up for an account</div></Link>
            </div>
        </div>
    );
};

export default Login;