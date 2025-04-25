import React from 'react'
import ContentLoader from 'react-content-loader'

const MainHeaderLoader = () => (
  <ContentLoader
    rtl
    speed={1}
    width='100%'
    height='100%'
    viewBox='0 0 400 200'
    backgroundColor='#dedede'
    foregroundColor='#ffffff'
  >
    <path d='M 136.5 35.1 c 10.4 7.7 18.1 18.3 27.4 29.6 c 9.2 11.3 19.8 23.3 20.5 35.7 c 0.6 12.3 -8.8 25.1 -16.9 38.3 c -8 13.3 -14.8 27.1 -25.8 35 c -11.1 7.9 -26.4 9.9 -41.9 10.2 c -15.5 0.3 -31.1 -1.1 -40.3 -10.1 c -9.1 -9 -11.8 -25.5 -20.4 -39.1 c -8.6 -13.6 -23.2 -24.1 -26.6 -36.7 C 9 85.5 16.7 70.9 25.4 57.4 C 34.1 44 43.7 31.5 56.3 25.1 c 12.6 -6.4 28.1 -6.7 42.4 -4.6 c 14.3 2.2 27.4 7 37.8 14.6 z' />
  </ContentLoader>
)

export default MainHeaderLoader
