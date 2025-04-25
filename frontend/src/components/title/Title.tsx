import { Grid, Typography } from '@mui/material'

interface TitleProps {
  title: string
  caption?: string
}

export default function Title({ title, caption }: TitleProps) {
  return (
    <Grid display='flex' justifyContent='center' flexDirection='column'>
      <Typography variant='h2' fontSize={28} fontWeight='bold'>
        {title}
      </Typography>
      {caption && (
        <Typography variant='h6' mt={2} mb={2} fontWeight={300}>
          {caption}
        </Typography>
      )}
    </Grid>
  )
}
