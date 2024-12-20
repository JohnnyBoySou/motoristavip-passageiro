import React from "react";

// set the defaults
const AuthContext = React.createContext({
  signIn: () => {},
  signOut: () => {},
  signUp: () => {}
});

export default AuthContext;
