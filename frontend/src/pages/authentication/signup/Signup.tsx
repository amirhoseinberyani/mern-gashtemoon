import { Box, Grid, Hidden, Typography } from '@mui/material'
import { vectors } from 'assets'
import { MyButton, MyInput, UploadImage } from 'components'
import { API } from 'config'
import { FetchContext } from 'contexts/fetchContext'
import { translate } from 'localization'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { emailRegex, passwordRegex } from 'utils/helpers'

export default function Signup() {
  useEffect(() => {
    document.title = 'بلوط | ثبت نام'
  }, [])
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailErrMsg, setEmailErrMsg] = useState<string>('')
  const [passwordErrMsg, setPasswordErrMsg] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [profileUrl, setProfileUrl] = useState<string>('')
  const [defaultAvatar, setDefaultAvatar] = useState<number>(1)
  const { request } = useContext(FetchContext)
  const navigate = useNavigate()

  const body = {
    email,
    password,
    firstName,
    lastName,
    profileUrl,
    defaultAvatar,
  }

  const registerUser = () => {
    request(API.Authentication.Register, 'POST', body).then(({ status, data }) => {
      if (status === 200) {
        navigate('/signin')
      }
    })
  }

  const signupVerify = () => {
    if (email.length > 1 && !emailRegex.test(email)) {
      setEmailErrMsg(translate.register_page.emailRegex)
      setIsDisabled(true)
    } else {
      setEmailErrMsg('')
    }
    if (password.length > 1 && !passwordRegex.test(password)) {
      setPasswordErrMsg(translate.register_page.passwordRegex)
      setIsDisabled(true)
    } else {
      setPasswordErrMsg('')
    }
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }

  useEffect(() => {
    signupVerify()
  }, [email, password])

  return (
    <Grid container justifyContent='space-evenly' alignItems='center' height='100vh'>
      <Hidden mdDown>
        <Grid item md={6} pl={10}>
          <img src={vectors.signupImg} width='100%' height={400} alt='logo' />
        </Grid>
      </Hidden>
      <Grid item xs={10} md={4}>
        <Box mb={5}>
          <UploadImage
            profileUrl={profileUrl}
            setProfileUrl={setProfileUrl}
            defaultAvatar={defaultAvatar}
            setDefaultAvatar={setDefaultAvatar}
          />
        </Box>
        <Grid
          display='flex'
          flexDirection='column'
          justifyContent='center'
          margin='auto'
          width='100%'
        >
          <MyInput
            name='firstName'
            label={translate?.register_page?.firstName}
            onChange={(value) => setFirstName(value as string)}
            value={firstName}
          />
          <MyInput
            name='lastName'
            label={translate?.register_page?.lastName}
            onChange={(value) => setLastName(value as string)}
            value={lastName}
          />
          <MyInput
            name='email'
            label={translate?.register_page?.email}
            onChange={(value) => setEmail(value as string)}
            value={email}
            required
          />
          <MyInput
            label={translate?.register_page?.password}
            name='password'
            type='password'
            onChange={(value) => setPassword(value as string)}
            value={password}
            required
          />
          <MyButton
            size='medium'
            label={translate?.register_page?.register_button}
            onClick={() => registerUser()}
            variant='contained'
            color='primary'
            disabled={isDisabled}
          />
          <Grid display='flex' justifyContent='center' alignItems='center' mb={5}>
            <Typography variant='caption' mr={2} ml={2}>
              {translate.login_page.signin1}
            </Typography>
            <Link to='/signin'>
              <Typography variant='body2'>{translate.login_page.signin2}</Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
