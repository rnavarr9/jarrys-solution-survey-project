import React, {useContext} from 'react';

const Auth = React.createContext(null);
export const AuthProvider = Auth.Provider;

export default Auth;