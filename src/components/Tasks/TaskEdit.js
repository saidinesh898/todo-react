import { useEffect, useState } from "react";
import useHttp from '../../hooks/httpRequest'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import css from './TaskEdit.module.css'


const TaskEdit = (props) => {

    const params = useParams();
    const authDetails = useSelector(state => state.auth)
    const [task, setTask] = useState({})
    const getResponseData = (data)=> {
        setTask(data)
    }
        const fetchTaskArgument =  {
        url: "https://todo-app.sinuos.in/tasks/"+params.taskID,
        method : 'GET',
        headers: {
            "Authorization" : `Bearer ${authDetails.token}` 
        }
    }
    const {error, isLoading, sendRequest} = useHttp(getResponseData) 
    useEffect(()=>{
        sendRequest(fetchTaskArgument)
    },[params.taskID,authDetails.token ])
    return (
        <div className={css.pageWrapper}>
            <h2 className={css.title}>Edit Your Task</h2>
            <div className={css.taskCard}>
                <div className={css.taskDescription}>
                    <p>Description :</p>
                    <input 
                    defaultValue={task.description} 
                    required>
                    </input>
                </div>
                <div className={css.status}>
                    <p>Status :</p>
                    <select name="cars" id="cars" defaultValue={task.status}>
                    <option value="true" >Completed</option>
                    <option value="false" >Pending</option>
                    </select>
                </div>
                <div className={css.actions}>
                    <button>Update</button>
                
                </div>
            </div>
        </div>
    );
};

export default TaskEdit;