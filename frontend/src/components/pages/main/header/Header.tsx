import { Button, Grid, Hidden, Typography } from '@mui/material'
import { base_api } from 'config/api'
import { translate } from 'localization'
import { useContext } from 'react'
import { SiteInfoContext } from 'contexts/siteInfoContext'
import './header.css'

export default function Header() {
  const { siteInfo } = useContext(SiteInfoContext)

  return (
    <Grid
      container
      display='flex'
      alignItems='start'
      justifyContent='center'
      margin='auto'
      marginTop={'3rem'}
      height='700px'
      width='100%'
      className='main-header-root'
    >
      <Grid bgcolor='black' width='100%' height='100%' sx={{ opacity: 0.5 }} />
      <Grid
        width='80%'
        position='absolute'
        top={200}
        display='flex'
        alignItems='end'
        justifyContent='space-between'
      >
        <Grid>
          <Hidden mdDown>
            <Typography width='60%' fontSize={50} color={'white'} fontWeight={600}>
              سفری به دنیای زیبای ایران
            </Typography>
            <Typography mt={5} width='90%' fontSize={24} color={'white'}>
              با زیبایی‌های کشور عزیز ایران آشنا شوید و از جاذبه‌های طبیعی و تاریخی آن لذت ببرید.
              ایران، سرزمینی با فرهنگ غنی و طبیعتی بی‌نظیر، منتظر شماست تا داستان‌های جدیدی را کشف
              کنید.
            </Typography>
          </Hidden>
          <Grid container justifyContent='end'>
            <Button
              variant='outlined'
              style={{
                marginTop: '15px',
                border: '2px solid white',
                borderRadius: 36,
                minHeight: 50,
              }}
              className='call-to-action-button'
            >
              <Typography className='call-to-action-text' fontSize={14} color={'white'}>
                {translate.header.headetButton}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
