import { useSelector} from "react-redux";
import {useEffect, useState} from 'react';
import useHttp from '../../hooks/httpRequest'
import arrow from '../../assests/img/arrow.png'
import { useRef } from "react";
import css from './DashBoardIndex.module.css'
import {Link} from 'react-router-dom'
import { APIURL } from "../../constants";



const DashboardIndex = () => {
    const hideToggle = useRef()
    const authDetails = useSelector(state=>state.auth)
    const [sortToggle, setSortToggle] = useState(true)
    const [hideCompletedToggle, setHideCompletedToggle] = useState(false)
    const [tasks,setTasks] = useState([])
    const loadedTask = (data, statusCode) => {
        setTasks(data)
    }
    const deteledTask = (data, statusCode) => {
        sendRequest(fetchTaskArgument)
    }
    const fetchTaskArgument =  {
        url: APIURL+"/tasks/",
        method : 'GET',
        headers: {
            "Authorization" : `Bearer ${authDetails.token}` 
        }
    }

    
    const {isLoading, error, sendRequest} = useHttp(loadedTask)
    const {sendRequest: deleteTask} = useHttp(deteledTask)
    const sortOnClickHanlder = () => {
        setSortToggle((prev) => !prev)
        if(sortToggle){
            const helperArray = tasks.sort((a,b) => {return Date.parse(b.createdAt) - Date.parse(a.createdAt)})
            setTasks([...helperArray])
        }
        else{
            const helperArray = tasks.sort((a,b) => {return Date.parse(a.createdAt) - Date.parse(b.createdAt)})
            setTasks([...helperArray])
        }
    }

    const hideCompletedHandler = (e)=> {
        hideToggle.current.checked = !hideToggle.current.checked
        setHideCompletedToggle(hideToggle.current.checked)
    } 

    const deleteTaskHandler = (e)=>{
        const id = e.currentTarget.id
        const deleteTaskArgument =  {
            url: APIURL+'/tasks/'+id,
            method : 'DELETE',
            headers: {
                "Authorization" : `Bearer ${authDetails.token}` 
            }
        }
        deleteTask(deleteTaskArgument)
     
    }

    useEffect(() => {
        if(authDetails.token){
            sendRequest(fetchTaskArgument)
        }


    },[authDetails.token]);

    const wrapper = (task)=> {
        return (
        <div key = {task._id} className={css.tasksCard + ' ' + (task.status ? css.success : css.pending)}>
          <div className={css.taskDescription}>
              <p>Task Description</p> <p>:</p> <p><b>{task.description}</b></p>
          </div>
          <div className={css.taskStatus}>
          <p>Task Status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> <p>:</p> <p><b>{(task.status && "Completed") || (!task.status && "Pending") }</b></p>
          </div>
          <div className={css.actions} >
          <Link to={`../tasks/${task._id}`} ><button  className={css.editTask} ><p>Edit Task</p></button></Link>
          <button  className={css.deleteTask} onClick={deleteTaskHandler} id= {task._id}><p>Delete Task</p></button>
          </div>
      </div>
        )
    }
    const TasksJSX = hideCompletedToggle ?
    tasks && tasks.filter((task) => task.status!==true).map((task) => wrapper(task)) :    
      tasks && tasks.map((task)=>  wrapper(task))

    const arrowSVG = <img src={arrow} className={sortToggle ? css.arrow  : css.arrow + ' ' +  css.invertIMG}></img>


    return (
        <div className={css.dashboardWrapper}>
            <div className={css.sort}>
            <button className={css.sortButton} onClick={sortOnClickHanlder}><p>Sort By Date </p> {arrowSVG}</button>
            <div className={css.hideCompleted} onClick={hideCompletedHandler}> <p>Hide Completed</p><input onChange={hideCompletedHandler} type="checkbox" value="Hide Completed Task" ref={hideToggle}></input></div>
            </div>
            <div className={css.taskHeader}>
                    <h2>Your Tasks</h2>               
            </div>
         <div className={css.taskWrapper}>
                {TasksJSX}
            </div>
        </div>
    );
};

export default DashboardIndex;