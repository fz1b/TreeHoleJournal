import React, { useState, useCallback, useEffect } from 'react';
import { refreshService } from '../services/UserServices';

let refreshTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    refreshToken: '',
    loginHandler: (tokenData) => {},
    logoutHandler: () => {}
});

export const AuthContextProvider = (props) => {
    let initData = {
        token: localStorage.getItem('token'),
        expirationTime: localStorage.getItem('expirationTime'),
        refreshToken: localStorage.getItem('refreshToken')
    }
    if (initData.expirationTime !== '') {
        const overTime = new Date().getTime() - new Date(initData.expirationTime).getTime();
        if (overTime > 60*60*1000) {
            // if now is more than one hour later than the token expiration time, logout the user 
            initData = {
                token: '',
                expirationTime: '',
                refreshToken: ''
            };
        } 
    }
    
    const [token, setToken] = useState(initData.token);
    const [expirationTime, setExpirationTime] = useState(initData.expirationTime);
    const [refreshToken, setRefreshToken] = useState(initData.refreshToken);
    const isLoggedIn = !!token;

    const loginHandler = (tokenData) => {
        setToken(tokenData.token);
        localStorage.setItem('token', tokenData.token);
        setExpirationTime(tokenData.expirationTime);
        localStorage.setItem('expirationTime', tokenData.expirationTime);
        setRefreshToken(tokenData.refreshToken);
        localStorage.setItem('refreshToken', tokenData.refreshToken)
    };

    const logoutHandler = () => {
        setToken('');
        localStorage.removeItem('token');
        setExpirationTime('');
        localStorage.removeItem('expirationTime');
        setRefreshToken('');
        localStorage.removeItem('refreshToken');
    };

    const refreshHandler = useCallback(async()=> {
        const reqBody = JSON.stringify({
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem('refreshToken'),
        });

        if (!localStorage.getItem('refreshToken')){
            logoutHandler();
            return;
        }

        try {
            const tokenData = await refreshService(reqBody);
            loginHandler(tokenData);

        } catch (err){
            logoutHandler();
        }
    }, []);

    // Control the timer of refresh token
    useEffect(() => {
        if (expirationTime && expirationTime !== '') {
            const remainingTime = new Date(expirationTime).getTime() - new Date().getTime() - 5*60*1000; // set the timer to be 5mins earlier than exp. time
            if (remainingTime < 5*60*1000) {
                refreshTimer = setTimeout(refreshHandler, 0);
            } else {
                refreshTimer = setTimeout(refreshHandler, remainingTime);
            }
        } else {
            clearTimeout(refreshTimer);
        }
    }, [expirationTime, refreshHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: isLoggedIn,
        refreshToken: refreshToken,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;

