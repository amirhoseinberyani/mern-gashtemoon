import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Theme from './theme'
import RTL from './components/RTL'
import { getDirection } from './localization'
import MasterLayout from './screens/MasterLayout'
import LoginContextProvider from './contexts/LoginContext'
import AlertProvider from './components/alert'
import FetchContextProvider from './contexts/FetchContext'

function App() {
  return (
    <Theme>
      {getDirection() === "rtl" ? (
        <RTL>
          <AlertProvider>
            <LoginContextProvider>
              <FetchContextProvider>
                <Router>
                  <MasterLayout />
                </Router>
              </FetchContextProvider>
            </LoginContextProvider>
          </AlertProvider>
        </RTL>
      ) : (
        <AlertProvider>
          <LoginContextProvider>
            <FetchContextProvider>
              <Router>
                <MasterLayout />
              </Router>
            </FetchContextProvider>
          </LoginContextProvider>
        </AlertProvider>
      )}
    </Theme>
  )
}

export default App;

