import HomeIcon from '@mui/icons-material/HomeOutlined'
import AboutUsIcon from '@mui/icons-material/InfoOutlined'
import PersonOutline from '@mui/icons-material/PersonOutlineRounded'
import AttractionIcon from '@mui/icons-material/PlaceOutlined'
import PostIcon from '@mui/icons-material/RssFeed'
import { Divider, Grid, List } from '@mui/material'
import { Box } from '@mui/system'
import { MyButton } from 'components'
import { LoginContext } from 'contexts/loginContext'
import { translate } from 'localization'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChangeLangModal from './ChangeLangModal'
import DrawerHeader from './DrawerHeader'
import DrawerList from './DrawerList'

export default function DrawerContent() {
  const navigate = useNavigate()
  const [openChangeLang, setOpenChangeLang] = useState<boolean>(false)
  const { token, logout } = useContext(LoginContext)
  const sideMenu = [
    { title: translate?.top_menu?.home, id: 1, route: '/', icon: <HomeIcon /> },
    {
      title: translate?.top_menu?.attractions,
      id: 3,
      route: '/attractions',
      icon: <AttractionIcon />,
    },
    {
      title: translate?.top_menu?.leaders,
      id: 4,
      route: '/leaders',
      icon: <PersonOutline />,
    },
    {
      title: translate?.top_menu?.post,
      id: 5,
      route: '/posts',
      icon: <PostIcon />,
    },

    {
      title: translate?.top_menu?.aboutus,
      id: 7,
      route: '/about-us',
      icon: <AboutUsIcon />,
    },
  ]

  return (
    <Grid p={5} height='70%'>
      <DrawerHeader />
      {token && (
        <>
          <Divider />
          <Box mb={5} mt={5}>
            <MyButton
              label={translate.top_menu.myprofile}
              variant='outlined'
              fullWidth={true}
              onClick={() => navigate('/myprofile')}
              color='secondary'
            />
          </Box>
        </>
      )}

      <Divider />
      <Grid>
        <List>
          {sideMenu?.map((item: any, index: any) => (
            <DrawerList key={index} item={item} />
          ))}
        </List>
      </Grid>
      <Box mb={5}>
        <MyButton
          label={translate.drawer.changLang}
          variant='text'
          fullWidth={true}
          onClick={() => setOpenChangeLang(true)}
          color='primary'
        />
      </Box>
      <MyButton
        label={token ? translate?.top_menu?.logout : translate?.top_menu?.loginOrRegister}
        variant='outlined'
        fullWidth={true}
        onClick={() => (token ? logout() : navigate('/signin'))}
        color='secondary'
      />
      {openChangeLang && (
        <ChangeLangModal open={openChangeLang} onClose={() => setOpenChangeLang(false)} />
      )}
    </Grid>
  )
}
