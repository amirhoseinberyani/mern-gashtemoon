import { Box, Grid, Tooltip, Typography } from '@mui/material'
import starIcon from '../../../assets/icons/star.svg'
import './attraction-item.css'
import { API } from 'config'
import { lang } from 'localization'
import { Link } from 'react-router-dom'
import AttractionCardGridLoading from '../../contentLoadings/AttractionCard'

const cssBaseClass = 'dashboard-project-item'

export interface AttractionGridProps {
  name: string
  id: any
  generalId: any
  province: any
  loading: boolean
  county: any
  attractionType: any
  title: string
  cover: string
  rate: { sum: number; userCount: number; rate: number }
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...'
  }
  return text
}

export default function ProjectCardGrid({
  title,
  id,
  generalId,
  province,
  county,
  loading,
  rate,
  attractionType,
  cover,
}: AttractionGridProps) {
  const getAttractionType = () => {
    let text = ''
    attractionType &&
      attractionType.map((item: any, index: any) => {
        text = text + '/ ' + item?.title
      })
    return text.substr(1)
  }

  const attractionTypeText = getAttractionType()
  const truncatedAttractionType = truncateText(attractionTypeText, 40)

  return loading ? (
    <AttractionCardGridLoading />
  ) : (
    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/attractions/${id}/${generalId}`}>
      <Box className={`${cssBaseClass}`}>
        <Grid container direction='column'>
          <Box className={`${cssBaseClass}-top`}>
            <img
              className={`${cssBaseClass}-cover`}
              src={API.BASE_URL + cover + '_org.png'}
              alt='attraction-cover'
            />
          </Box>
          <Grid p={2}>
            <Grid>
              <Grid container justifyContent='space-between'>
                <Typography fontSize={14} fontWeight='bold'>
                  {title}
                </Typography>
                <Grid display='flex' flexDirection='column' alignItems='center'>
                  <img src={starIcon} width={20} alt='main-cover' />
                  <Typography fontWeight='bold' fontSize={14}>
                    {Number((rate?.rate).toFixed(1))}
                  </Typography>
                </Grid>
              </Grid>
              <Grid mt='-10px' display='flex' flexDirection='column'>
                <Grid container>
                  {province?.slice(0, 3)?.map((item: any, index: number) => (
                    <Typography color={'#4e4e4e'} fontSize={12} fontWeight={500}>
                      {lang === 'en' ? item?.name_en : item?.name_fa}

                      {index >= 2 ? '/...' : '/'}
                    </Typography>
                  ))}
                  {county?.map((item: any, index: number) => (
                    <Typography color={'#4e4e4e'} fontSize={12} fontWeight={500}>
                      {lang === 'en' ? item?.name_en : item?.name_fa}
                    </Typography>
                  ))}
                </Grid>
                <Tooltip
                  title={
                    <Typography fontWeight={400} fontSize={12}>
                      {attractionTypeText}
                    </Typography>
                  }
                >
                  <Typography
                    fontWeight={400}
                    fontSize={12}
                    // textAlign='end'
                    style={{
                      direction: 'rtl',
                      color: 'rgb(134 134 134)',
                      marginTop: 5,
                      height: 25,
                      overflowY: 'hidden',
                    }}
                  >
                    {truncatedAttractionType}
                  </Typography>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Link>
  )
}
