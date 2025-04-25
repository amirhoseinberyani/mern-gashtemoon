import { Grid } from '@mui/material'
import { Logo, TopMenu } from 'components'
import { navBarMenus } from 'constant'
import { LoginContext } from 'contexts/loginContext'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Languages from './Language'
import ProfilePanel from './ProfilePanel'
import UnregisteredButtons from './UnregisteredButtons'
import './desktop.css'

export default function Desktop() {
  const location = useLocation()
  const path = location.pathname
  const { token } = useContext(LoginContext)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  return (
    <Grid className='top-menu-root'>
      <Grid display='flex'>
        <Grid display='flex' height='fit-content' margin='auto'>
          {token && token?.length > 0 ? <ProfilePanel /> : <UnregisteredButtons />}
        </Grid>
      </Grid>
      <Grid display='flex' alignItems='center' textAlign='center'>
        {navBarMenus &&
          navBarMenus.map((item, index) => {
            return <TopMenu {...item} key={index} />
          })}
        <Languages />
      </Grid>
      <Logo />
    </Grid>
  )
}
