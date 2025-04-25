import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginContextTypes {
  token: string | null
  login: (newToken: string) => void
  logout: () => void
}

const LoginContext = createContext<LoginContextTypes>({
  token: '',
  login: (newtoken: string) => {},
  logout: () => {},
})
export { LoginContext }

interface LoginContextProviderTypes {
  children: React.ReactNode
}

export default function LoginContextProvider({ children }: LoginContextProviderTypes) {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  const login = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }
  const logout = () => {
    setToken('')
    localStorage.clear()
    navigate('/')
  }
  return <LoginContext.Provider value={{ token, login, logout }}>{children}</LoginContext.Provider>
}
