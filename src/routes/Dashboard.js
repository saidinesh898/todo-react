import { useDispatch, useSelector} from "react-redux";

const Dashboard = ()=>{
    const authDetails = useSelector(state=>state.auth)
    
    return(

        <>
        <p>This is a Dashboard Page</p>

        </>
    )

}

export default Dashboard