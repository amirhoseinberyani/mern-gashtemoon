import React from 'react'
import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import useStyles from './styles/menuItems.styles'
import activeIcon from '../../assets/images/Group4546.png'
import inactiveIcon from '../../assets/images/Group5599.svg'
import { lang } from '../../localization'

const basePath = lang === "en" ? "/en" : ""

export default function MenuItem({ to, title }) {
  const classes = useStyles()
  const location = useLocation()
  const path = location.pathname
  let comparePath = (to === "/" || to === "/fa") ?
    (path === `${basePath}${to}`) : (new RegExp(`^${basePath}${to}`).test(path))
  return (
    <ListItem button component={Link} to={`${basePath}${to}`}>
      <ListItemIcon>
        <img
          src={comparePath ? activeIcon : inactiveIcon}
          alt="گردشگر"
          className={
            comparePath
              ? classes.ActiveMenuIcon
              : classes.inActiveMenuIcon
          }
        />
      </ListItemIcon>
      <ListItemText>
        <Typography
          variant="body2"
          color={comparePath ? 'textPrimary' : 'textSecondary'}
          className={classes.menuText}
        >
          {title}
        </Typography>
      </ListItemText>
    </ListItem>
  )
}
