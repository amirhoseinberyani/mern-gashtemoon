import { Grid } from '@mui/material'
import { Main, Signin, Signup } from 'pages'
import { Route, Routes } from 'react-router-dom'
import './main-routes.css'
import ProtectedRoute from './ProtectedRoute'

export default function MainRoutes() {
  const isAuthenticated = localStorage.getItem('token') ? true : false

  return (
    <Grid className='main-grid'>
      <Routes>
        <Route index element={<Main />} />

        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />

        
      </Routes>
    </Grid>
  )
}
