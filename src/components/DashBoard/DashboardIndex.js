import { useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from 'react';
import useHttp from '../../hooks/httpRequest'

import css from './DashBoardIndex.module.css'

const DashboardIndex = () => {
    const authDetails = useSelector(state=>state.auth)
    const [tasks,setTasks] = useState([])
    const loadedTask = (data, statusCode) => {
        setTasks(data)
    

    }
    const {isLoading, error, sendRequest} = useHttp(loadedTask)
    const sortOnClickHanlder = () => {
        const helperArray = tasks.sort((a,b) => {return b.status - a.status})
        setTasks([...helperArray])
        console.log(tasks)
    }
    console.log(tasks)
    
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
        <div className={css.dashboardWrapper}>
            <div className={css.sort}>
            <button onClick={sortOnClickHanlder}>SORT</button>
            </div>
            <div>
                    Your Tasks               
            </div>
         <div className={css.taskWrapper}>
             {tasks && tasks.map((task)=>  
                <div key = {task._id} className={css.tasksCard + ' ' + (task.status ? css.success : css.pending)}>
                    <div className={css.taskDescription}>
                        <p>Task Description</p> <p>:</p> <p><b>{task.description}</b></p>
                    </div>
                    <div className={css.taskStatus}>
                    <p>Task Status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> <p>:</p> <p><b>{(task.status && "Completed") || (!task.status && "Pending") }</b></p>
                    </div>
                </div> 
                )}
            </div>
        
        </div>
    );
};

export default DashboardIndex;