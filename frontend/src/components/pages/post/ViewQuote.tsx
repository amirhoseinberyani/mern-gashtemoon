import { Grid, Typography } from '@mui/material'
import { API } from 'config'

interface TitleProps {
  item: any
}

export default function ViewQuote({ item }: TitleProps) {
  return (
    <Grid
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '50px 0 50px 0',
      }}
    ></Grid>
  )
}
