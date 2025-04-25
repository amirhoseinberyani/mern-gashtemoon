import { Grid, Typography } from '@mui/material'
import { icons, badges } from 'assets'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { lang } from 'localization'
import 'moment/locale/fa'
import { API } from 'config'
import defaulAvatar from '../../../../assets/icons/default_avatar_1.svg'
import tehranSymbol from '../../../../assets/images/tehran.jpg'

interface PostProps {
  attractionInfo: {
    _id: any
    image: string
    title: string
    type: number
    writer: {
      firstName: string
      lastName: string
      role: number
    }
    description: string
    comments: any
    usersLike: any
    usersSave: any
    createdAt: any
  }
}

export default function Post({ attractionInfo }: PostProps) {
  return (
    <Link
      to={`/posts/${attractionInfo?._id}/${attractionInfo?.title?.split(' ').join('-')}`}
      style={{
        textDecoration: 'none',
        width: '270px',
        margin: '0 10px 0 10px',
      }}
    >
      <Grid
        width='270px'
        p={5}
        borderRadius={8}
        border='1px solid rgba(0,0,0,0.08)'
        boxShadow='none'
        display='flex'
        flexDirection='column'
      >
        <Grid height='70%'>
          <img
            src={attractionInfo.image ? API.BASE_URL + attractionInfo.image : tehranSymbol}
            alt='tehran-symbol'
            style={{ width: '100%', height: 200, borderRadius: 20 }}
          />
        </Grid>
        <Grid height='30%'>
          <Box m={5}>
            <Typography variant='h5'>{attractionInfo.title}</Typography>
          </Box>
          <Grid
            display='flex'
            flexDirection='row'
            justifyContent='flex-start'
            alignItems='center'
            mt={5}
            mb={5}
          >
            <img
              width='50px'
              height='50px'
              src={defaulAvatar}
              alt='dfg'
            />
            {attractionInfo.writer.role === 1 || attractionInfo.writer.role === 2 ? (
              <>
                <img
                  style={{ marginRight: -15, marginTop: 30 }}
                  width='20px'
                  height='20px'
                  src={badges.verified}
                  alt='dfg'
                />
                <Grid mr={5} ml={5} container flexDirection='column'>
                  <Typography fontWeight='bold' variant='caption'>
                    {attractionInfo?.writer?.firstName + ' ' + attractionInfo?.writer?.lastName}
                  </Typography>
                  <Typography fontWeight={500} variant='caption'>
                    راهنمای گردشگری فرهنگی
                  </Typography>
                </Grid>
              </>
            ) : (
              <Grid mr={5} ml={5} container flexDirection='column'>
                <Typography fontWeight='bold' variant='caption'>
                  {attractionInfo?.writer?.firstName + ' ' + attractionInfo?.writer?.lastName}
                </Typography>
                <Typography variant='caption'>
                  {moment(attractionInfo?.createdAt, 'YYYYMMDD')
                    .locale(lang || 'en')
                    .fromNow()}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          height='10%'
          display='flex'
          borderTop='1px solid #eee'
          pt={5}
          justifyContent='space-around'
          width='100%'
        >
          <Grid display='flex' alignItems='center'>
            <img style={{ cursor: 'pointer' }} width={23} src={icons.notLikeIcon} alt='likeIcon' />
            <Typography mr={4}>{attractionInfo?.usersLike?.length}</Typography>
          </Grid>
          <Grid display='flex' alignItems='center'>
            <img style={{ cursor: 'pointer' }} width={23} src={icons.comment} alt='commentIcon' />
            <Typography mr={4}>{attractionInfo?.comments?.length}</Typography>
          </Grid>
          <Grid display='flex' alignItems='center'>
            <img
              height={22}
              style={{ marginTop: '4px', cursor: 'pointer' }}
              width={23}
              src={icons.notSaveIcon}
              alt='saveIcon'
            />
            <Typography mr={4}>{attractionInfo?.usersSave?.length}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  )
}
