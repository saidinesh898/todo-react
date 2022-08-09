import Button from '../UI/FormComponents/Button';
import Input from '../UI/FormComponents/Input';
import css from './LoginSignUp.module.css'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {authActions} from '../../store/auth-slice'
import useHttp from '../../hooks/httpRequest'


const SignUp = () => {
    const dispatch = useDispatch()
    const onLoginHanlder = (response, statusCode) => {
       if(statusCode === 400){
        alert("User Already Exists")
       }
       else{
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

        if(enteredEmail.trim().length>0 && enteredPassword.trim().length>0){
            sendRequest({
                url: "https://todo-app.sinuos.in/users",
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

export default SignUp;