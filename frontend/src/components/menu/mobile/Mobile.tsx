import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { Grid, IconButton, SwipeableDrawer } from '@mui/material'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from 'config'
import { SiteInfoContext } from 'contexts/siteInfoContext'
import { direction } from 'localization'
import Drawer from './DrawerContent'
import './mobile.css'

export default function Mobile() {
  const [state, setState] = useState(false)
  const navigate = useNavigate()
  const { siteInfo } = useContext(SiteInfoContext)

  const toggleDrawer = () => {
    setState(!state)
  }

  return (
    <Grid>
      <Grid
        position='fixed'
        zIndex={200}
        height={50}
        container
        justifyContent='space-between'
        alignItems='center'
        p={2}
        borderBottom='1px solid #e6e6e6'
        bgcolor='#ecf5fd'
      >
        <IconButton
          style={{
            padding: 0,
            borderRadius: 5,
          }}
        >
          <MenuRoundedIcon className='menu-button' color='primary' onClick={toggleDrawer} />
        </IconButton>
        <img
          src={API.BASE_URL + siteInfo?.navbarIcon}
          onClick={() => navigate('/')}
          height='100%'
          alt='logo'
        />
      </Grid>

      <SwipeableDrawer
        anchor={direction === 'rtl' ? 'left' : 'right'}
        style={{ right: 0 }}
        open={state}
        classes={{
          paper: direction === 'ltr' ? 'drawer-paper-ltr' : 'drawer-paper-rtl',
        }}
        onClose={() => setState(false)}
        onOpen={() => setState(true)}
      >
        <Drawer />
      </SwipeableDrawer>
    </Grid>
  )
}
