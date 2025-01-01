import React, { createContext, useState, useContext, useEffect, useId } from 'react'

// Step 1 Creation of Context
const AuthContext = createContext();


// custome hook when we call useContext it will give logIn status
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (useId) {
            setCurrentUser(userId);
        }
    }, []);

    // Step 2 Provide the value that you want to children to have
    return < AuthContext.Provider value={{ currentUser, setCurrentUser}}>
        {children} 
    </AuthContext.Provider>

    // step 3rd pure main.jsx ke ander isko Wrap kar dena ya use karna tha sit 
}




// step 1 - define the context
// step 2 - Wraped the context inside the decendent children.
// note :- When you define the provider also define kya bhjna hai value={};
// import React, { createContext, useContext, useState } from 'react';

