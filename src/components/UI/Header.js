import React, { Fragment } from 'react';
import css from './Header.module.css'
import {Link, NavLink} from 'react-router-dom'
import { useState } from 'react';
import hamSVG from '../../assests/svg/ham'
import { useSelector } from 'react-redux';


const MENULIST =[{
    text : "Login",
    path : "/login",
    noAuth : true,
    key : 1,
},{
    text : "Sign Up",
    path : "/sign-up",
    noAuth : true,
    key : 2,
},{
    text : "Dashboard",
    path : "/dashboard",
    noAuth : false,
    key : 3,
},
{
    text : "Account",
    path : "/account",
    noAuth : false,
    key : 4,
},
{
    text : "Logout",
    path : "/logout",
    noAuth : false,
    key : 5,
},] 



const Header = () => {
    const authState = useSelector(state => state.auth)
    const [hamClicked, setHamClicked] = useState(false)
    const [hamAnimation, setHamAnimation] = useState('')
    const navClass = ({ isActive }) => isActive ?  css.navigation + " " + css.active : css.navigation
    const hambergurClickHandler = ()=>{
        setHamClicked((prev)=> !prev)
        setHamAnimation((prev) =>{
            if(prev === 'opened'){
                return ""
            }
            else
            return "opened"
        } )

    }
    return (
        <Fragment>
        <header>
            <div className={css.headerWrapper}>
                <Link to="/"><div className={css.branding}>Todo App</div></Link>
                <nav>
                {!authState.isLoggedin && MENULIST.filter((menu)=> menu.noAuth===true).map((menu) => <div key={menu.key} className={css.navLinks + " " + css.navigationWapper}> <NavLink className={navClass} to={menu.path}>{menu.text}</NavLink></div>)}
                {authState.isLoggedin && MENULIST.filter((menu)=> menu.noAuth===false).map((menu) => <div key={menu.key} className={css.navLinks + " " + css.navigationWapper}> <NavLink className={navClass} to={menu.path}>{menu.text}</NavLink></div>)}
                {/* {MENULIST.map((menu) => <div className={css.navLinks + " " + css.navigationWapper}> <NavLink className={navClass} to={menu.path}>{menu.text}</NavLink></div>)} */}
                    <div className={css.hambergur}>
                        <button className={css.menu +" "+ css[hamAnimation]} onClick={hambergurClickHandler}>
                        {hamSVG}
                        </button> 
                    </div>
                    
               </nav>
            </div>
        </header>
        <div className={css.mobileMenuWrapper}>
                {hamClicked && !authState.isLoggedin && MENULIST.filter((menu)=> menu.noAuth===true).map((menu) => <div key={menu.key} className={css.mobileMenu + " " + css.navigationWapper}> <NavLink className={navClass} to={menu.path}>{menu.text}</NavLink></div>)} 
                {hamClicked && authState.isLoggedin && MENULIST.filter((menu)=> menu.noAuth===false).map((menu) => <div key={menu.key} className={css.mobileMenu + " " + css.navigationWapper}> <NavLink className={navClass} to={menu.path}>{menu.text}</NavLink></div>)} 
                </div>
        </Fragment>
    );
};

export default Header;