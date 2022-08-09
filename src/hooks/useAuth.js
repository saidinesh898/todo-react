import {useDispatch} from 'react-redux'
import { authActions } from '../store/auth-slice';
import useHttp from './httpRequest'; 
import {useCallback, useState} from 'react'





const useAuth = () => {

    const [loginStatus, setLoginStatus] = useState('');
    const dispatch = useDispatch()
    const authLocalStorageJSON = localStorage.getItem('authDetails')
    const authLocalStorage = JSON.parse(authLocalStorageJSON)
    const dataHandler = ( code, statusCode)=> {
        if(statusCode === 200){
        dispatch(authActions.onLocalStorageSuccess(authLocalStorage))
        setLoginStatus(true)
    }
    else if(statusCode===401){
        localStorage.removeItem('authDetails')
        dispatch(authActions.onLocalStorageFail())
        setLoginStatus(false)
    }
}
const { sendRequest } = useHttp(dataHandler)
    const checkValidity = useCallback(() => { 
     
    if(authLocalStorage){
      const requestConfig = {
        url:"https://todo-app.sinuos.in/users/me", 
        method : 'GET', 
        headers : {
          "Authorization" : authLocalStorage.token
        }
     }
      sendRequest(requestConfig)
    }
    },[])
    return {loginStatus,checkValidity};
 
};

export default useAuth;