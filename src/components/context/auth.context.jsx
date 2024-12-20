import { createContext,useState } from 'react';

export const AuthContext = createContext({
    isAuthencontext : false,
    user :{
        email: "",
        name :""
    }
});
export const WapperAuth = (props)=> {
    const [Auth, setAuth] = useState({
        isAuthencontext : false,
        user :{
            email: "",
            name :""
    }
    });
    // ...
    return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
        {props.children}
    </AuthContext.Provider>
    );
  }