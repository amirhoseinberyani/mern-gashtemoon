import { Grid, Typography } from '@mui/material'

interface TitleProps {
  item: any
}

export default function Title({ item }: TitleProps) {
  return (
    <Grid
      paddingBottom={'2%'}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px 0',
      }}
    >
      <Typography variant='h2'>{item.value}</Typography>
    </Grid>
  )
}
