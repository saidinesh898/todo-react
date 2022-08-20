import { useNavigate } from 'react-router-dom';
import css from './AddTask.module.css'
import addImg from '../../assests/img/add.png'


const AddTask = () => {
    const navigate = useNavigate() 
    const addTaskClickHandler = () => {
        navigate('../tasks/new', {replace : true})
    }
    return (
        <div onClick= {addTaskClickHandler}className={css.addTaskWrapper}>
           <img src={addImg} className={css.addIMG}></img> <p>Add New Task</p>
        </div>
    );
};

export default AddTask;