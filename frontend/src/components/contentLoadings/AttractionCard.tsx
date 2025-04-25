import React from 'react'
import ContentLoader from 'react-content-loader'

const AttractionCardLoading = () => (
  <ContentLoader
    rtl
    speed={1}
    width='100%'
    viewBox='0 0 500 460'
    backgroundColor='#dedede'
    foregroundColor='#ecebeb'
  >
    <rect x='0' y='0' rx='20' ry='20' width='90%' height='240' />
    <rect x='0' y='220' rx='0' ry='0' width='90%' height='35' />
    <circle cx='420' cy='290' r='18' />
    <rect x='0' y='285' rx='7' ry='7' width='45%' height='20' />
    <rect x='0' y='325' rx='4' ry='4' width='25%' height='15' />
    <rect x='0' y='360' rx='4' ry='4' width='85%' height='10' />
    <rect x='0' y='380' rx='4' ry='4' width='80%' height='10' />
  </ContentLoader>
)

export default AttractionCardLoading
