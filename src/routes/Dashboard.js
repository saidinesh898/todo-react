import { useDispatch, useSelector} from "react-redux";
import DashboardIndex from "../components/DashBoard/DashboardIndex";

const Dashboard = ()=>{
    const authDetails = useSelector(state=>state.auth)
    
    return(

        <>
        <DashboardIndex/>
        </>
    )

}

export default Dashboard