import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

let refreshTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    refreshToken: '',
    expirationTime: '',
    loginHandler: (tokenData) => {},
    logoutHandler: () => {}
});

export const AuthContextProvider = (props) => {
    const initData = {
        token: localStorage.getItem('token'),
        expirationTime: localStorage.getItem('expirationTime'),
        refreshToken: localStorage.getItem('refreshToken')
    }

    let initToken, initExpirationTime, initRefreshToken;

    if (initData.token && initData.expirationTime && initData.refreshToken) {
        initToken = initData.token;
        initExpirationTime = initData.expirationTime;
        initRefreshToken = initData.refreshToken;
    }

    const [token, setToken] = useState(initToken);
    const [expirationTime, setExpirationTime] = useState(initExpirationTime);
    const [refreshToken, setRefreshToken] = useState(initRefreshToken);
    const isLoggedIn = !!token;

    const loginHandler = (tokenData) => {
        setToken(tokenData.token);
        localStorage.setItem('token', tokenData.token);
        setExpirationTime(tokenData.expirationTime);
        localStorage.setItem('expirationTime', tokenData.expirationTime);
        setRefreshToken(tokenData.refreshToken);
        console.log(tokenData.refreshToken);
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
        console.log("refresh!");
        const reqBody = JSON.stringify({
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem('refreshToken'),
        });

        if (!localStorage.getItem('refreshToken')){
            console.log("WHY");
            logoutHandler();
            return;
        }

        try {
            const response = await axios.post(
                'https://securetoken.googleapis.com/v1/token?key=AIzaSyDaKTAclgtccZACOapwTXYEudrvGfqNrGs',
                reqBody,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );
            const expirationTime = new Date(
                new Date().getTime() + + response.data.expiresIn * 1000
            );
            const tokenData = {
                token: response.data.idToken,
                expirationTime: expirationTime.toISOString(),
                refreshToken: response.data.refreshToken
            }
            console.log("Refresh successful")
            loginHandler(tokenData);

        } catch (err){
            logoutHandler();
        }
    }, []);

    useEffect(() => {
        if (expirationTime && expirationTime !== '') {
            console.log(expirationTime);
            const remainingTime = new Date(expirationTime).getTime() - new Date().getTime() - 5*60*1000;
            console.log(remainingTime);
            if (remainingTime < 5*60*1000) {
                refreshTimer = setTimeout(refreshHandler, 0);
            } else {
                refreshTimer = setTimeout(refreshHandler, 30*1000);
            }
        } else {
            clearTimeout(refreshTimer);
        }
    }, [expirationTime, refreshHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: isLoggedIn,
        refreshToken: refreshToken,
        expirationTime: expirationTime,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;

