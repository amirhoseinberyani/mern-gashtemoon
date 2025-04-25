import { Grid, Typography } from '@mui/material'
import { API } from 'config'

interface TitleProps {
  item: any
}

export default function ViewVideo({ item }: TitleProps) {
  return (
    <Grid
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '50px 0 50px 0',
      }}
    >
      <iframe title='video' src={item?.value?.videoFile} allowFullScreen={true} />
    </Grid>
  )
}
