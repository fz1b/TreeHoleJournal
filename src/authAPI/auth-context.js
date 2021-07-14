import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    userid: '',
    isLoggedIn: false,
    loginHandler: (userData) => {},
    logoutHandler: () => {}
});

export const AuthContextProvider = (props) => {
    const initToken = localStorage.getItem('token')
    const initUserid = localStorage.getItem('userid')
    const [token, setToken] = useState(initToken);
    const [userid, setUserid] = useState(initUserid);
    const isLoggedIn = !!token;

    const loginHandler = (userData) => {
        setToken(userData.token);
        localStorage.setItem('token', userData.token);
        setUserid(userData.userid);
        localStorage.setItem('userid', userData.userid);
    };

    const logoutHandler = () => {
        setToken('');
        setUserid('');
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
    };

    const contextValue = {
        token: token,
        userid: userid,
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;

