import { Grid, Typography } from '@mui/material'
import './header.css'
import { translate } from 'localization'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <Grid
      container
      display='flex'
      alignItems='start'
      justifyContent='center'
      // margin='auto'
      marginTop={'3rem'}
      height='700px'
      width='100%'
      className='attraction-header-root'
    >
      <Grid bgcolor='black' width='100%' height='100%' sx={{ opacity: 0.5 }} />
      <Grid
        position='absolute'
        top={200}
        width='80%'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Grid>
          <motion.div
            initial={{ opacity: 0, x: 100 }} // شروع از سمت چپ و بدون دید
            animate={{ opacity: 1, x: 0 }} // حرکت به مرکز صفحه و دیده شدن
            transition={{ duration: 1.5 }} // مدت زمان انیمیشن
          >
            <Typography fontSize={50} width='60%' color={'white'} fontWeight={600}>
              {translate.attraction.header}
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }} // شروع از سمت چپ و بدون دید
            animate={{ opacity: 1, x: 0 }} // حرکت به مرکز صفحه و دیده شدن
            transition={{ duration: 2 }} // مدت زمان انیمیشن
          >
            <Typography fontSize={18} mt={5} width='100%' fontWeight={700} color={'white'}>
              {translate.attraction.description}
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Grid>
  )
}
