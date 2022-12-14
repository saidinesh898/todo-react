// import logo from './logo.svg';
import './App.css';
import {Route, Routes, Navigate } from 'react-router-dom'
import React from 'react';
import { useEffect, Suspense} from 'react';
import useAuth from './hooks/useAuth';
import {useSelector} from 'react-redux'
import ProtectedList from './routes/ProtectedRouteList';
import PublicList from './routes/PublicRouteList';
import Header from './components/UI/Header';
import PrivateRoute from './routes/PrivateRoute'
import Loader from './components/UI/Loader';
import Notification from './components/UI/Notification/Notification';
import NotificationGroup from './components/UI/Notification/NotificationGroup';


function App() {
  const authState = useSelector(state=>state.auth)
  const {checkValidity} = useAuth()

  useEffect(()=>{
    checkValidity()
  },[authState.auth])


  return (
    <Suspense fallback={ <Loader/> }>
      <header>
        <Header></Header>
      </header>
     
      <Routes>
      <Route path="/" element={ <Navigate to="/login" />}/>
        {PublicList.map(routes => <Route  key={routes.key} path={routes.path} element={routes.element}></Route>)}
        {ProtectedList.map(routes => <Route  key={routes.key} path={routes.path} element={<PrivateRoute>{routes.element}</PrivateRoute>}></Route>)}
      </Routes>
      <NotificationGroup></NotificationGroup>
    </Suspense>
  );
}

export default App;
