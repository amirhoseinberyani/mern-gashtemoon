import { Grid, Typography } from '@mui/material'
import { API } from 'config'
import { FetchContext } from 'contexts/fetchContext'
import { translate } from 'localization'
import { useContext, useEffect, useState } from 'react'
import { vectors } from 'assets'

export default function StatisticInfo() {
  const { request } = useContext(FetchContext)
  const [statisticInfo, setStatisticInfo] = useState<any>()

  // Get Site Info
  useEffect(() => {
    request(API.Site.StatisticInfo, 'GET').then(({ status, data }) => {
      if (status === 200) {
        setStatisticInfo(data.result)
      }
    })
  }, [])

  return (
    <Grid>
      <Grid container justifyContent='space-around' mt={5} mb={15} >
        <Grid xs={12} md={4} item display='flex' flexDirection='column' alignItems='center'>
          <img width='192px' height='150px' src={vectors.leaders} alt='dfg' />
          <Grid container flexDirection='column' alignItems='center'>
            <Typography fontWeight={700}>{statisticInfo?.userCount}</Typography>
            <Typography maxWidth='300px' textAlign='center'>
              {translate?.statistics?.active_leader}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} display='flex' flexDirection='column' alignItems='center'>
          <img width='192px' height='150px' src={vectors.attractions} alt='dfg' />
          <Grid container flexDirection='column' alignItems='center'>
            <Typography fontWeight={700}>{statisticInfo?.attractionCount}</Typography>
            <Typography maxWidth='300px' textAlign='center'>
              {translate?.statistics?.attraction_inserted}
            </Typography>
          </Grid>
        </Grid>
        <Grid xs={12} md={4} item display='flex' flexDirection='column' alignItems='center'>
          <img width='192px' height='150px' src={vectors.posts} alt='dfg' />
          <Grid container flexDirection='column' alignItems='center'>
            <Typography fontWeight={700}>{statisticInfo?.postCount}</Typography>
            <Typography maxWidth='300px' textAlign='center'>
              {translate?.statistics?.post_inserted}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
