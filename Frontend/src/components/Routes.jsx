import React, {useEffect} from 'react'
import {useNavigate, useRoutes } from "react-router-dom";


// Page list
import Dashboard from './dashboard/Dashboard';
import Profile from './user/Profile';
import Signup from './auth/Signup';
import Signin from './auth/Signin';

import { useAuth } from '../authContext';

const ProjectRouter = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigte = useNavigate();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && !["/auth","/signup"].includes(window.location.pathname)){
            navigte("/auth");
        }

        if(userIdFromStorage && window.location.pathname == "/auth"){
            navigte("/");
        }
    }, [currentUser, navigte, setCurrentUser]); // if isme se koi bhi value change hua then means trigger reload

    let element = useRoutes([
        {
            path : "/",
            element : < Dashboard />
        },
        {
            path : "/auth",
            element : < Signin />
        },
        {
            path : "/signup",
            element : < Signup />
        },
        {
            path : "/profile",
            element : < Profile />
        }
    ]);

    return element;
};

export default ProjectRouter;