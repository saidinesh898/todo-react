import { useNavigate } from 'react-router-dom';
import css from './AddTaskPage.module.css'
import { useSelector } from 'react-redux';
import  {useState} from 'react';
import useHttp from '../../hooks/httpRequest';
import { APIURL } from '../../constants';
import { useDispatch } from 'react-redux';
import { notifyActions } from '../../store/notification-slice';

const AddTaskPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authDetails = useSelector(state => state.auth)
    const [task, setTask] = useState({})
    
    const cancelHandler = ()=> {
        navigate('../../dashboard', {replace:true})
    }
    
    const getResponseData = (data, statusCode)=> {
        if(statusCode===201){
            dispatch(notifyActions.notify({
                type : "success",
                header : "Task Added",
                message : "Successfully Added the Task",
                timer : 3000
            }))
    
            navigate('../../dashboard', {replace:true})
        }
    }

    const addTaskArgument =  {
        url: APIURL+"/tasks/",
        method : 'POST',
        headers: {
            "Authorization" : `Bearer ${authDetails.token}` ,
            "Content-Type" : "application/json"
        },
        body : task
    }

    const {error, isLoading, sendRequest} = useHttp(getResponseData) 

    const taskDescriptionChangeHandler = (e) => {
        setTask((prev => ({
            ...prev,
            description : e.target.value
        })))
    }
    const taskStatusChangeHandler = (e) => {
        const updatedStatus =   ( e.target.value === 'true' ) ? true : false
        setTask((prev => ({
            ...prev,
            status : updatedStatus
        })))
       
    }

    const onAddTaskHandler = () => {
        sendRequest(addTaskArgument)
    }
    return (
        <div className={css.pageWrapper}>
            <h2 className={css.title}>Add New Task</h2>
            <div className={css.taskCard}>
                <div className={css.taskDescription}>
                    <label>Description :</label>
                    <input 
                    onChange={taskDescriptionChangeHandler}
                    required
                    placeholder="Please Enter Task's Description"
                    />

                </div>
                <div className={css.status}>
                    <label>Status : </label>
                    <select name="status" id="status" defaultValue="disabled" onChange={taskStatusChangeHandler}>
                    <option value="disabled" disabled>Please Select Any Status</option>
                    <option value="true" >Completed</option>
                    <option value="false" >Pending</option>
                    </select>
                </div>
                <div className={css.actions}>
                    <button onClick={onAddTaskHandler}className={css.update}>Add Task</button>
                    <button onClick={cancelHandler} className={css.reset}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskPage;