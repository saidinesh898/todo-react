import css from './Notification.module.css'
import error from '../../../assests/svg/error.svg'
import successSVG from '../../../assests/svg/success.svg'
import infoSVG from '../../../assests/svg/info.svg'
import closeSVG from '../../../assests/svg/close.svg'

const Notification = (props) => {

    let notificationICON, cssClass
    if(props.type === "error"){
        notificationICON = error
        cssClass = css.error

    }
    else if(props.type === "success"){
        notificationICON = successSVG
        cssClass = css.success
    }
    else {
        notificationICON = infoSVG
        cssClass = css.info
    }
    return (
        <div className={css.notificationWrapper + " "+cssClass }>
            <div className={css.notificatioIcon}>
                <img  src={notificationICON}></img>
            </div>
            <div className={css.notificationBodyWrapper}>
                <div className={css.notificatioHeader}>
                    <p>{props.header}</p>
                </div>
                <div className={css.notificationBody}>
                    <p>{props.message}</p>
                </div>
            </div>
            <div className={css.notificationDismiss}>
                 <img  src={closeSVG}></img>
            </div>
        </div>
        
    );
};

export default Notification;