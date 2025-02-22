import React, {useEffect} from 'react'
import {useNavigate, useRoutes } from "react-router-dom";

// Page list
import Dashboard from './dashboard/Dashboard';
import Profile from './user/Profile';
import Signup from './auth/Signup';
import Login from './auth/Login';

import { useAuth } from '../authContext';
import Create from './repo/Create';

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
            element : < Login />
        },
        {
            path : "/signup",
            element : < Signup />
        },
        {
            path : "/profile",
            element : < Profile />
        },
        {
            path : "/create",
            element : < Create />
        }
    ]);

    return element;
};

export default ProjectRouter;
