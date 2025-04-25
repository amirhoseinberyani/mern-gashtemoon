import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Flip } from 'react-toastify'
import { Grid, Hidden } from '@mui/material'
import { DesktopMenu, FooterMenu, MobileMenu } from 'components'
import { MainRoutes } from 'routes'

export default function MasterLayout() {
  return (
    <Grid>
      <Hidden mdDown>
        <DesktopMenu />
      </Hidden>
      <Hidden mdUp>
        <MobileMenu />
      </Hidden>
      <MainRoutes />
      <FooterMenu />
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        transition={Flip}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Grid>
  )
}
