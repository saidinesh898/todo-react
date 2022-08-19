
import { useDispatch, useSelector} from "react-redux";
import { authActions } from "../store/auth-slice";
import { useEffect } from "react";
import useHttp from "../hooks/httpRequest";
import { APIURL } from "../constants";
const Logout = () => {
    const authDetails = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    const responseHandler = (response, statusCode)=> {
        if(statusCode ===200){
            localStorage.removeItem('authDetails')
            dispatch(authActions.onLogout())
        }
    }
    const {sendRequest} = useHttp(responseHandler)

    
    useEffect(() => {

        sendRequest({
            url : APIURL+"/users/logout",
            method : 'POST',
            headers :  {
                "Authorization" : `Bearer ${authDetails.token}`
            },
            body : {}
        })


    }, []);




    return (
        <div>
            
        </div>
    );
};

export default Logout;