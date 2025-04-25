import { Box, Button, Grid, Hidden, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import starIcon from '../../../assets/icons/star.svg'
import { API } from 'config'
import { direction, translate, lang } from 'localization'
import './attraction-item.css'
import { MyButton } from 'components/uiKit'

const cssBaseClass = 'dashboard-project-item'

export interface ProjectCardListProps {
  name: string
  id: any
  generalId: any
  province: any
  county: any
  attractionType: any
  title: string
  cover: string
  rate: { sum: number; userCount: number; rate: number }
}

export default function ProjectCardList({
  title,
  province,
  id,
  county,
  rate,
  attractionType,
  cover,
  generalId,
}: ProjectCardListProps) {
  const getAttractionType = () => {
    let text = ''
    attractionType &&
      attractionType.map((item: any, index: any) => {
        text = text + '/ ' + item?.title
      })
    return '...' + text.substr(1).split(' ').slice(0, 10).join(' ')
  }

  return (
    <Grid
      data-testid='projectCard-list'
      container
      direction='row'
      mb={2}
      className={`${cssBaseClass}-list`}
    >
      <Grid display='flex' direction='row' alignItems='center'>
        <img
          // src={API.BASE_URL + cover + "_sm.png"}
          src={API.BASE_URL + cover + '_org.png'}
          alt='cover'
          className={`${cssBaseClass}-cover-list`}
          style={{
            borderRadius: direction === 'rtl' ? '0 10px 10px 0' : '10px 0 0 10px',
          }}
        />
      </Grid>

      <Box p={3} ml={5} flex={1}>
        <Grid container direction='column'>
          <Grid container justifyContent='flex-start'>
            <Typography fontWeight='bold'>{title}</Typography>
            <Grid mr={3} ml={3} display='flex' flexDirection='row' alignItems='center'>
              <img src={starIcon} width={15} alt='star-icon' />
              <Typography mr={3} ml={3} fontWeight='bold' variant='caption'>
                {Number((rate?.rate).toFixed(1))}
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction='row' alignItems='center'>
            <Grid mt={3} display='flex' flexDirection='column'>
              <Grid container>
                <Typography variant='caption'>
                  {lang === 'en' ? province?.name_en : province?.name_fa}
                </Typography>
                <Typography mr={2} ml={2} variant='caption'>
                  /
                </Typography>
                <Typography variant='caption'>
                  {lang === 'en' ? county?.name_en : county?.name_fa}
                </Typography>
              </Grid>
              <Typography
                fontWeight='bold'
                fontSize={10}
                variant='caption'
                textAlign='end'
                style={{
                  direction: 'initial',
                  color: '#afafaf',
                  marginTop: 5,
                  height: 35,
                  overflowY: 'hidden',
                }}
              >
                {getAttractionType()}
              </Typography>
            </Grid>
            <Hidden smDown>
              <Box mr={5} flex={1}>
                <Grid container direction='row-reverse' alignItems='center'>
                  <Link style={{ textDecoration: 'none' }} to={`${id}/${generalId}`}>
                    <MyButton
                      label={translate?.map?.more}
                      variant='contained'
                      size='small'
                      color='primary'
                    />
                  </Link>
                </Grid>
              </Box>
            </Hidden>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
