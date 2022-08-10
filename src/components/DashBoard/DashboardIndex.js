import { useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from 'react';
import useHttp from '../../hooks/httpRequest'

const DashboardIndex = () => {
    const authDetails = useSelector(state=>state.auth)
    const [tasks,setTasks] = useState([])
    const loadedTask = (data, statusCode) => {
        setTasks(data)

    }
    const {isLoading, error, sendRequest} = useHttp(loadedTask)
    
    useEffect(() => {
        if(authDetails.token){
            sendRequest({
                url: "https://todo-app.sinuos.in/tasks/",
                method : 'GET',
                headers: {
                    "Authorization" : `Bearer ${authDetails.token}` 
                }
            })
        }


    },[authDetails.token]);

    return (
        <div>
            {tasks.map((task)=> <>{`Description : ${task.description}  Status:  ${task.status}`}</>)}            
        </div>
    );
};

export default DashboardIndex;