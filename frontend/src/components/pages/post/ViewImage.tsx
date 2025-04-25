import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { API } from 'config'
import uploadPlaceHoclder from '../../.././assets/images/upload.png'

interface ImageProps {
  item: any
}

export default function Image({ item }: ImageProps) {
  return (
    <Grid
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '50px 0 50px 0',
      }}
    >
      <Grid
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          // width: "75%",
          alignItems: 'center',
        }}
      >
        <img
          style={{ borderRadius: 5, width: '100%' }}
          src={
            item.value.cover !== ''
              ? API.BASE_URL + item.value.cover + '_org.png'
              : uploadPlaceHoclder
          }
          alt='cover'
        />
        <Box mt={3}>
          <Typography variant='subtitle2' fontSize={12}>
            {item.value.caption}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
