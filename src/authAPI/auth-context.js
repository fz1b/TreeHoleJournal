import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    userid: '',
    isLoggedIn: false,
    loginHandler: (token) => {},
    logoutHandler: () => {}
});

export const AuthContextProvider = (props) => {
    const initToken = localStorage.getItem('token')
    const [token, setToken] = useState(initToken);
    const isLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logoutHandler = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    const contextValue = {
        token: token,
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;

