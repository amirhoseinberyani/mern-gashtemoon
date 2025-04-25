import React, { useContext } from 'react'
import useStyles from './MasterLayout.styles'
import DashBoardMenu from '../components/menus'
import Routes from '../routes'
import LoginRoutes from '../routes/LoginRoutes'
import { LoginContext } from '../contexts/LoginContext'

export default function MasterLayout() {
  let { token } = useContext(LoginContext)
  const classes = useStyles()
  if (token.length === 0) {
    return (
      <LoginRoutes />
    )
  }
  return (
    <div className={classes.root}>
      <DashBoardMenu />
      <Routes />
    </div>
  )
}
