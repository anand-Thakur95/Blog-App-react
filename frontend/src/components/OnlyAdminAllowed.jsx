import {  RouteSignIn } from '@/helpers/RouteName'

import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const OnlyAdminAllowed = () => {
    const user = useSelector(state => state.user)
    if (user && user.isLoggedIn && user.user.role === 'admin') {
        return (
            < Outlet />
        )
    } else {
        return <Navigate to={RouteSignIn} />
    }

}

export default OnlyAdminAllowed