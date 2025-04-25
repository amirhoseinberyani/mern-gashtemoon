import { Grid } from '@mui/material'

interface TitleProps {
  item: any
}

export default function ViewSeperator({ item }: TitleProps) {
  return (
    <Grid
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '100px 0 100px 0',
      }}
    ></Grid>
  )
}
