import css from './Loader.module.css'
import loaderGif from '../../assests/gif/loading.gif'

const Loader = () => {
    return (
        <div className={css["full-page"]}>
            <div className={css["full-page-loader"]}>
                <img src={loaderGif}></img>
            </div>
        </div>
    );
};

export default Loader;