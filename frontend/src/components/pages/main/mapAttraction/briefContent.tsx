import React, { useContext, useEffect, useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { API } from 'config'
import { translate, lang } from 'localization'
import RawImage from '../../../common/rawImage/RawImage'
import { FetchContext } from '../../../../contexts/fetchContext'
import './brief.css'

interface BriefContentProps {
  selectedProvince: any
}

export default function BriefContent({ selectedProvince }: BriefContentProps) {
  const [imageSrc, setImageSrc] = useState<any>()
  const [brief, setBrief] = useState<{ cover: any; attractions: number }>({
    cover: [],
    attractions: 0,
  })

  const { request } = useContext(FetchContext)

  useEffect(() => {
    if (selectedProvince?._id === undefined) return

    request(API.Attraction.MapBrief + '?id=' + selectedProvince?._id, 'GET').then(
      ({ status, data }) => {
        if (status === 200) {
          setBrief(data.result)
          data.result.cover
            ? // ? setImageSrc(API.BASE_URL + data.result?.cover[0] + "_md.png")
              setImageSrc(API.BASE_URL + data.result?.cover[0] + '_org.png')
            : setImageSrc('')
        }
      },
    )
  }, [selectedProvince])

  return (
    <Grid className='brief-container'>
      <Grid mb={5} container justifyContent='center'>
        <Typography fontWeight='bold'>
          {lang === 'en'
            ? selectedProvince?.name_en + ' ' + translate?.other?.province
            : translate?.other?.province + ' ' + selectedProvince?.name_fa}
        </Typography>
      </Grid>
      {brief.cover ? (
        <img
          src={imageSrc}
          alt='tehran-symbol'
          style={{ width: '100%', minHeight: '80%', borderRadius: 10 }}
        />
      ) : (
        <RawImage width='100%' height='80%' />
      )}
      <Grid container justifyContent='flex-start'>
        <Grid container justifyContent='space-around'>
          <Typography fontWeight={400}>{translate?.map?.attractions}</Typography>
          <Typography fontWeight='bold'>{brief.attractions}</Typography>
        </Grid>
      </Grid>
      <Link
        to={`/map/attractions/${selectedProvince?._id}/${selectedProvince?.name_en
          ?.split(' ')
          .join('-')}`}
        style={{ textDecoration: 'none' }}
      >
        <Button fullWidth variant='contained'>
          <Typography color='white' style={{ textTransform: 'none' }} variant='body2'>
            {translate?.map?.more}
          </Typography>
        </Button>
      </Link>
    </Grid>
  )
}
