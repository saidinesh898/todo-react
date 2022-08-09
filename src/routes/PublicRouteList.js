import React from 'react'
const  Login = React.lazy(() => import('./LoginRoute'))
const  SignUp = React.lazy(() => import('./SignUp'))


const PublicList = [{
    path : "/login",
    element : <Login/>,
    key : 1
},
{
    path : "/sign-up",
    element : <SignUp/>,
    key : 2
}]

export default PublicList