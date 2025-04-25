import { IconButton, Typography } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link, useLocation } from 'react-router-dom'

interface DrawerListProps {
  item: any
}

export default function DrawerList({ item }: DrawerListProps) {
  const location = useLocation()
  return (
    <Link to={item.route} onClick={() => {}} style={{ textDecoration: 'none' }}>
      <ListItem
        disablePadding
        style={{
          backgroundColor: location.pathname === item.route ? '#d8f0ff' : '#fff',
          borderRadius: 5,
          height: 40,
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <IconButton color={location.pathname === item.route ? 'primary' : 'default'}>
              {item.icon}
            </IconButton>
          </ListItemIcon>
          <ListItemText style={{ display: 'flex' }}>
            <Typography
              color={location.pathname === item.route ? 'primary' : 'default'}
              variant='subtitle2'
            >
              {item.title}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
