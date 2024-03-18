import { Outlet, Navigate } from 'react-router-dom'
import Cookie from 'js-cookie';
const PrivateRoutes = () => {
    const auth = Cookie.get("id");
    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
