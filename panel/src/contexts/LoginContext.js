import React, { createContext, useState } from "react";

const LoginContext = createContext({
  token: "",
  setToken: () => {},
  name: "",
  setName: () => {},
  role: "",
  setRole: () => {},
});
export { LoginContext };

function LoginContextProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.token ? localStorage.token : ""
  );
  const [name, setName] = useState(localStorage.name ? localStorage.name : "");
  const [role, setRole] = useState(localStorage.role ? localStorage.role : "");
  return (
    <LoginContext.Provider
      value={{
        token: token,
        setToken: setToken,
        name,
        setName,
        role,
        setRole,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
export default LoginContextProvider;
