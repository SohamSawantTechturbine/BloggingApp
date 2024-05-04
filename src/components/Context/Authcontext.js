import React, { createContext, useContext, useState ,useEffect} from 'react';

export const AuthContext = createContext({
    isLogin: false,
    setIsLogin: () => {},
    setUsernameInput: () => {},
    usernameInput:null,
  
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [usernameInput, setUsernameInput] = useState(null);

    const login = () => {

        setIsLogin(true);
      };
    
      const logout = () => {

        setIsLogin(false);
      };
    

    const providerValue = { setIsLogin, isLogin};
 
    // Return the context provider
    return React.createElement(AuthContext.Provider, { value: providerValue }, children);
};