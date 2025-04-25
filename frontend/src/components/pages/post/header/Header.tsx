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
      margin='auto'
      marginTop={'3rem'}
      className='post-header-root'
      height='700px'
      width='100%'
    >
      <Grid bgcolor='black' width='100%' height='100%' sx={{ opacity: 0.5 }} />
      <Grid
        position='absolute'
        top={200}
        width='70%'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Grid width='40%'>
          <motion.div
            initial={{ opacity: 0, x: 100 }} // شروع از سمت چپ و بدون دید
            animate={{ opacity: 1, x: 0 }} // حرکت به مرکز صفحه و دیده شدن
            transition={{ duration: 1 }} // مدت زمان انیمیشن
          >
            <Typography fontSize={50} color={'white'} fontWeight={600}>
              {translate.post.title}
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }} // شروع از سمت چپ و بدون دید
            animate={{ opacity: 1, x: 0 }} // حرکت به مرکز صفحه و دیده شدن
            transition={{ duration: 2 }} // مدت زمان انیمیشن
          >
            <Typography mt={5} fontSize={18} fontWeight={700} color={'white'}>
              {translate.post.descriptionOne}
            </Typography>
          </motion.div>
        </Grid>
        <Grid width='50%'>
          <motion.div
            initial={{ opacity: 0, x: -100 }} // شروع از سمت چپ و بدون دید
            animate={{ opacity: 1, x: 0 }} // حرکت به مرکز صفحه و دیده شدن
            transition={{ duration: 2 }} // مدت زمان انیمیشن
          >
            <Typography fontSize={18} color={'white'}>
              {translate.post.descriptionTwe}
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Grid>
  )
}
