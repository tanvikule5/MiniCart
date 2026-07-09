import { createContext,useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
function AuthProvider({ children }) { 
  const [token, setToken] = useState(null);
   const [user, setUser] = useState(null); 
   const [loading, setLoading] = useState(true); 

useEffect(() => {

  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    setToken(storedToken);
  }

  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    setUser(JSON.parse(storedUser));
  }

  setLoading(false);

}, []);

  const login = (token, user) => {

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);

  };


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

  };


  return (
    <AuthContext.Provider
     value={{
  token,
  user,
  setUser,
  setToken,
  isAuthenticated: !!token,
  loading,
  login,
  logout
}}
    >
      {children}
    </AuthContext.Provider>
  );
}


export default AuthProvider;