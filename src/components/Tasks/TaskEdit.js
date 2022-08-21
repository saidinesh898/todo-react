import { useEffect, useState } from "react";
import useHttp from '../../hooks/httpRequest'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import css from './TaskEdit.module.css'
import {APIURL} from '../../constants'
import { useNavigate } from "react-router-dom";
import { notifyActions } from "../../store/notification-slice";


const TaskEdit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams();
    const authDetails = useSelector(state => state.auth)
    const [task, setTask] = useState({
        description: "placeholder",
        status : false
    })
    const [taskStatic, setTaskStatic] = useState({})
    const getResponseData = (data, statusCode)=> {
        if(statusCode===200){
            setTask(data)
            setTaskStatic(data)
        }
        else{
            navigate("../404", { replace: true });
        }

    }
    const getUpdatedResponseData = (data)=> {
        dispatch(notifyActions.notify({
            type : "success",
            header : "Success",
            message : "Task Updated Successfully",
            timer : 3000
        }))
        setTask(data)
        setTaskStatic(data)
        navigate("../dashboard", { replace: true });
    }
        const fetchTaskArgument =  {
        url: APIURL+"/tasks/"+params.taskID,
        method : 'GET',
        headers: {
            "Authorization" : `Bearer ${authDetails.token}` 
        }
    }
    const {error, isLoading, sendRequest} = useHttp(getResponseData) 
    const {errorUpdate, isLoadingUpdate, sendRequest : updateTask} = useHttp(getUpdatedResponseData) 
    
    if(error){
        navigate("../404", { replace: true });
    }
    
    useEffect(()=>{
        if(authDetails.token){
            sendRequest(fetchTaskArgument)
        }
        
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
        if(task.description.trim().length > 3 ){
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
            updateTask(updateTaskArgument)
        }
        else{
            dispatch(notifyActions.notify({
                type : "error",
                header : "Error",
                message : "Description Length Should be Greater than 3 Character",
                timer : 3000
            }))
        }

        
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