import { ThemeProvider } from '@mui/system'
import { darkTheme, lightTheme, RTLComponent } from 'theme'
import './App.css'
import FetchContextProvider from './contexts/fetchContext'
import LoginContextProvider from './contexts/loginContext'
import SiteInfoContextProvider from './contexts/siteInfoContext'
import MasterLayout from './pages/MasterLayout'
import { ConfigInfo } from './redux/slices/configSlice'
import { useAppSelector } from './redux/store'

function App() {
  const { themeMode } = useAppSelector(ConfigInfo)

  return (
    <RTLComponent>
      <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        <LoginContextProvider>
          <FetchContextProvider>
            <SiteInfoContextProvider>
                <MasterLayout />
            </SiteInfoContextProvider>
          </FetchContextProvider>
        </LoginContextProvider>
      </ThemeProvider>
    </RTLComponent>
  )
}

export default App
