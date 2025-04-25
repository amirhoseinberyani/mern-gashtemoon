import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 225,
    }
  }
}))
