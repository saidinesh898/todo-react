import css from './Input.module.css'
const Input = (props) => {
    return (
        <> 
        <label htmlFor={props.htmlFor}>{props.label}</label>
        <input 
        className={css.input + " " + props.className} 
        htmlFor={props.htmlFor}
        id={props.id}
        placeholder={props.placeHolder} 
        key={props.key}
        required={props.required}
        onChange={props.onChange}
        onBlur={props.onBlur}
        type={props.type}
        />    
        </>
    )}
 

export default Input;