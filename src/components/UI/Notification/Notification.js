import css from './Notification.module.css'
import error from '../../../assests/svg/error.svg'
import successSVG from '../../../assests/svg/success.svg'
import infoSVG from '../../../assests/svg/info.svg'
import closeSVG from '../../../assests/svg/close.svg'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { notifyActions } from '../../../store/notification-slice'

const Notification = (props) => {
    const [show, setShow]  = useState(true)
    const dispatch = useDispatch()
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

    useEffect(()=>{
            setShow(true)
            const timer = setTimeout(()=>{
                dismissHandler(false)
            },props.timer)
    },[props])


    
    const dismissHandler = () => {
        setShow(false)
        dispatch(notifyActions.remove(props.id))

    }
    return (
        <>
        {show && 
        <div className={css.notificatioLayout}>
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
                    <img onClick={dismissHandler} src={closeSVG}></img>
                </div>
            </div>
        </div>}
        </>
        
    );
};

export default Notification;