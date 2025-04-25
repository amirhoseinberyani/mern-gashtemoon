import { Grid2 } from '@mui/material'
import { Header, MapAttractions, StatisticInfo } from 'components'
import { useEffect } from 'react'
import LazyLoad from 'react-lazyload'

export default function MainPage() {
  useEffect(() => {
    document.title = 'بلوط | صفحه اصلی'
  }, [])

  return (
    <Grid2 pb={50}>
      <Header />
      <LazyLoad height='auto'>
        <Grid2 maxWidth='lg' margin='auto' pt={5}>
          <StatisticInfo />
        </Grid2>
      </LazyLoad>
      <LazyLoad height='auto'>
      </LazyLoad>
      <LazyLoad height='auto'>
        <Grid2 maxWidth='lg' margin='auto' pt={20}>
          <MapAttractions />
        </Grid2>
      </LazyLoad>
    </Grid2>
  )
}
