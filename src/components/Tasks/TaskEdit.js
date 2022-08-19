import { useEffect, useState } from "react";
import useHttp from '../../hooks/httpRequest'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import css from './TaskEdit.module.css'
import {APIURL} from '../../constants'


const TaskEdit = () => {

    const params = useParams();
    const authDetails = useSelector(state => state.auth)
    const [task, setTask] = useState({
        description: "placeholder",
        status : false
    })
    const [taskStatic, setTaskStatic] = useState({})
    const getResponseData = (data)=> {
        console.log(data)
        setTask(data)
        setTaskStatic(data)
    }
        const fetchTaskArgument =  {
        url: APIURL+"/tasks/"+params.taskID,
        method : 'GET',
        headers: {
            "Authorization" : `Bearer ${authDetails.token}` 
        }
    }
    const {error, isLoading, sendRequest} = useHttp(getResponseData) 
    useEffect(()=>{
        sendRequest(fetchTaskArgument)
    },[params.taskID,authDetails.token ])

    const taskDescriptionChangeHandler = (e) => {
        setTask(prevState => ({
            ...prevState,
            description: e.target.value
        }))
    }
    const taskStatusChangeHandler = (e) => {
        const updatedStatus =   ( e.target.value === 'true' ) ? true : false
        setTask(prevState => ({
            ...prevState,
            status: updatedStatus
        }))
       
    }
    const resetInputHandler = () => {
        setTask(taskStatic)
    } 

    const updateTaskHandler = () => {
        const updateTaskArgument =  {
            url: APIURL+"/tasks/"+params.taskID,
            method : 'PATCH',
            headers: {
                "Authorization" : `Bearer ${authDetails.token}`,
                "Content-Type" :  "application/json"
            },
            body : {
                description : task.description,
                status : task.status
            }
        }
        sendRequest(updateTaskArgument)
    }
 
    return (
        <div className={css.pageWrapper}>
            <h2 className={css.title}>Edit Your Task</h2>
            <div className={css.taskCard}>
                <div className={css.taskDescription}>
                    <label>Description :</label>
                    <input 
                    value={task.description || ''} 
                    required
                    onChange={taskDescriptionChangeHandler}
                    />
                    
                </div>
                <div className={css.status}>
                    <label>Status : </label>
                    <select name="status" id="status" value={task.status} onChange={taskStatusChangeHandler}>
                    <option value="true" >Completed</option>
                    <option value="false" >Pending</option>
                    </select>
                </div>
                <div className={css.actions}>
                    <button onClick={updateTaskHandler} className={css.update}>Update</button>
                    <button onClick={resetInputHandler} className={css.reset}>Reset</button>
                </div>
            </div>
        </div>
    );
};

export default TaskEdit;