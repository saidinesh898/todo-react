import { useSelector } from 'react-redux';
import Notification from './Notification';
import css from './NotificationGroup.module.css'




const NotificationGroup = (props) => {
    const notifyState = useSelector(state => state.notify)

    return (
        <div className={css.notificationGroup}>
           {notifyState.map(notify => (<Notification id={notify.id} key= {notify.id} type={notify.type}  header={notify.header} message={notify.message} timer={notify.timer}/>))  }
        </div>
    );
};

export default NotificationGroup;