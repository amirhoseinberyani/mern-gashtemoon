import Logout from '@mui/icons-material/Logout'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import { Box, Divider, Grid, IconButton, ListItemIcon } from '@mui/material'
import { Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { UserAvatar } from 'components'
import { API } from 'config'
import { FetchContext } from 'contexts/fetchContext'
import { LoginContext } from 'contexts/loginContext'
import { translate } from 'localization'
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateUserInfo, userInfo } from '../../../redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'

export default function ProfilePanel() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { user } = useAppSelector(userInfo)
  const dispatch = useAppDispatch()

  const open = Boolean(anchorEl)
  const { request } = useContext(FetchContext)
  const { logout } = useContext(LoginContext)

  const navigate = useNavigate()
  const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const items = [
    {
      text: localStorage.token ? translate?.top_menu?.myprofile : translate?.top_menu?.signup,
      id: 2,
      icon: <PersonAdd fontSize='small' />,
      click: () => (localStorage.token ? navigate('/myprofile') : navigate('/signup')),
    },
    ...(user.role > 1
      ? [
          {
            text: localStorage.token ? translate?.top_menu?.myposts : translate?.top_menu?.signup,
            id: 2,
            icon: <PersonAdd fontSize='small' />,
            click: () => (localStorage.token ? navigate('/myposts') : navigate('/signup')),
          },
        ]
      : []),

    {
      text: localStorage.token ? translate?.top_menu?.logout : translate?.top_menu?.login,
      id: 3,
      icon: <Logout fontSize='small' />,
      click: () => logout(),
    },
  ]

  //
  useEffect(() => {
    request(API.Authentication.userInfo, 'GET').then(({ status, data }) => {
      if (status === 200) {
        dispatch(updateUserInfo(data.data))
      }
    })
  }, [])

  return (
    <>
      <Tooltip
        title={<Typography variant='subtitle2'>{translate?.top_menu?.myprofile}</Typography>}
      >
        <IconButton
          onClick={handleClickProfile}
          size='small'
          style={{ width: 50, height: 50, margin: 'auto' }}
        >
          <UserAvatar data={user} />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
        <MenuItem>
          <Grid
            container
            alignItems='center'
            style={{ textDecoration: 'none' }}
            component={user?.role !== 1 ? Link : Grid}
            to={`${
              user?.role !== 1 ? `/user-profile/${user?._id}/${user?.firstName}` : ''
            }  `}
          >
            <UserAvatar data={user} />
            <Box margin='0 5px'>
              <Typography variant='body2'>
                {user?.firstName} {user?.lastName}
              </Typography>
            </Box>
          </Grid>
        </MenuItem>
        <Divider />
        {items.map((item: any, index: any) => (
          <MenuItem key={index} onClick={item.click}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
