import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRoutes = (props) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    //console.log(location);

    if (loading) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    if (!user) {
        return <Navigate state={location.pathname} to="/login" />;
    }

    return props.children;
};

export default PrivateRoutes;
