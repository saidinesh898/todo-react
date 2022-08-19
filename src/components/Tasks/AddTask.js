import { useNavigate } from 'react-router-dom';
import css from './AddTask.module.css'


const AddTask = () => {
    const navigate = useNavigate() 
    const addTaskClickHandler = () => {
        navigate('../tasks/new', {replace : true})
    }
    return (
        <div onClick= {addTaskClickHandler}className={css.addTaskWrapper}>
            Add New Task
        </div>
    );
};

export default AddTask;