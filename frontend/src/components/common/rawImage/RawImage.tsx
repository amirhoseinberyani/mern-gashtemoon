import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import raw_img from '../../../assets/vector/raw-image.svg'

interface RawImageProps {
  width: number | string
  height?: number | string
}

export default function RawImage({ width, height }: RawImageProps) {
  return (
    <Grid
      bgcolor='#e6e6e6'
      width={width}
      height={height}
      borderRadius='27px'
      border='1px solid #ccc'
      display='flex'
      justifyContent='center'
      flexDirection='column'
      alignItems='center'
    >
      {/* <img src={raw_img} alt="raw_img" width="30%" height="30%" />
      <Box mt={5}>
        <Typography fontWeight="bold" variant="body2">
          Upload Image
        </Typography>
      </Box>
      <Grid display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Typography variant="body1">{width}</Typography>
        <Box mr={2} ml={2}>
          <Typography>x</Typography>
        </Box>
        <Typography variant="body1">{height ? height : width}</Typography>
      </Grid> */}
    </Grid>
  )
}
