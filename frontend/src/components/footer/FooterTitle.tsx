import { Grid, Typography } from '@mui/material'

interface FooterTitleProps {
  title: string
}

export default function FooterTitle({ title }: FooterTitleProps) {
  return (
    <Grid >
      <Typography variant='h5' >
        {title}
      </Typography>
    </Grid>
  )
}
