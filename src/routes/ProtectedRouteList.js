import React from 'react'

const  Dashboard = React.lazy(() => import('./Dashboard'))
const  Account = React.lazy(() => import('./Account'))
const  Logout = React.lazy(() => import('./Logout.js'))
const  Tasks = React.lazy(() => import('./Tasks.js'))


const ProtectedList = [{
    path : "/account",
    element : <Account/>,
    key : 2
},
    {
    path : "/dashboard",
    element : <Dashboard/>,
    key : 1
},
{
    path : "/logout",
    element : <Logout/>,
    key : 3
},
{
    path : "/tasks/:taskID",
    element : <Tasks/>,
    key : 4
},
]

export default ProtectedList