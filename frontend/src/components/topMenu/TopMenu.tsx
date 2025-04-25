/* eslint-disable no-sequences */
import { IconButton, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import './top-menu.css'

interface TopMenuTypes {
  title: string
  route: string
  // setSelectedItem: any;
}

export default function TopMenu({ title, route }: TopMenuTypes) {
  const location = useLocation()

  return (
    <Link to={route} style={{ textDecoration: 'none' }}>
      <IconButton
        style={{ borderRadius: 0, marginLeft: 10 }}
        className={location.pathname === route ? 'active-item' : 'inactive-item'}
      >
        <Typography
          style={{
            fontSize: 15,
            width: 'max-content',
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      </IconButton>
    </Link>
  )
}
