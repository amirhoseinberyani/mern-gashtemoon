/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { Grid, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { API } from 'config'
import { translate } from 'localization'
import { FetchContext } from 'contexts/fetchContext'
import { LoginContext } from 'contexts/loginContext'
import { avatars, badges } from 'assets'

export default function DrawerHeader() {
  const { request } = useContext(FetchContext)
  const { token } = useContext(LoginContext)
  const [userInfo, setUserInfo] = React.useState<any>([])
  const defaultAvatar = [
    avatars.avatar1,
    avatars.avatar2,
    avatars.avatar3,
    avatars.avatar4,
    avatars.avatar5,
    avatars.avatar6,
  ]

  // Get User Info
  useEffect(() => {
    {
      token &&
        request(API.Authentication.userInfo, 'GET').then(({ status, data }) => {
          if (status === 200) {
            setUserInfo(data.data)
          }
        })
    }
  }, [])

  return (
    <Grid
      width='100%'
      mb={10}
      display='flex'
      justifyContent='center'
      alignItems='center'
      direction='column'
      height='30%'
    >
      {userInfo && (
        <img
          width='90px'
          height='90px'
          style={{ borderRadius: '30%', position: 'relative' }}
          src={
            userInfo?.profileUrl
              ? API.BASE_URL + userInfo?.profileUrl
              : defaultAvatar[userInfo?.defaultAvatar - 1 || 0]
          }
          alt='profile'
        />
      )}
      <Grid mt={5} display='flex' flexDirection='column' alignItems='center'>
        {userInfo && userInfo?.firstName && userInfo?.lastName ? (
          <Typography fontWeight='bold' variant='h5'>
            {userInfo?.firstName + ' ' + userInfo.lastName}
          </Typography>
        ) : (
          <Typography fontWeight='bold' variant='h5'>
            {translate.user.guest}
          </Typography>
        )}
        <Grid container alignItems='center' justifyContent='center' mt={2}>
          {userInfo.role === 2 ? (
            <img width='30px' height='25px' src={badges.culture} alt='dfg' />
          ) : userInfo.role === 3 ? (
            <img width='30px' height='25px' src={badges.nature} alt='dfg' />
          ) : userInfo.role === 1 ? (
            <img width='30px' height='25px' src={badges.user} alt='dfg' />
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  )
}
