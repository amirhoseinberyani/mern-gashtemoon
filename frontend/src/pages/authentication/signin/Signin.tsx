import { Grid, Hidden, Typography } from '@mui/material'
import { vectors } from 'assets'
import { MyButton, MyInput } from 'components'
import { API } from 'config'
import { FetchContext } from 'contexts/fetchContext'
import { LoginContext } from 'contexts/loginContext'
import { gapi } from 'gapi-script'
import { translate } from 'localization'
import { useContext, useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { Link, useNavigate } from 'react-router-dom'
import { emailRegex, passwordRegex } from 'utils/helpers'

export default function Signin() {
  useEffect(() => {
    document.title = 'بلوط | ورود'
  }, [])
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [passwordErrMsg, setPasswordErrMsg] = useState<string>('')
  const [emailErrMsg, setEmailErrMsg] = useState<string>('')
  const { request } = useContext(FetchContext)
  const { login } = useContext(LoginContext)
  const navigate = useNavigate()

  const clientID = '516723136861-vftgdcp0keqrusv0aretmq8fcjs08bf6.apps.googleusercontent.com'

  const loginUser = () => {
    const body = { email, password }
    request(API.Authentication.Login, 'POST', body).then(({ status, data }) => {
      if (status === 200) {
        login(data.token)
        navigate('/')
      }
    })
  }

  const onSuccess = (res: any) => {
    console.log('Successful Login', res.profileObj)
  }
  const onFailure = (res: any) => {
    console.log('Failed Login', res)
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: '',
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  const signinVerify = () => {
    if (email.length > 1 && !emailRegex.test(email)) {
      setEmailErrMsg(translate?.register_page.emailRegex)
      setIsDisabled(true)
    } else {
      setEmailErrMsg('')
    }
    if (password.length > 1 && !passwordRegex.test(password)) {
      setPasswordErrMsg(translate?.register_page.passwordRegex)
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
    signinVerify()
  }, [email, password])

  return (
    <Grid container justifyContent='space-evenly' alignItems='center' height='100vh'>
      <Hidden mdDown>
        <Grid item md={6} pl={10}>
          <img src={vectors.signinImg} width='100%' height={400} alt='logo icon' />
        </Grid>
      </Hidden>
      <Grid item xs={10} md={4}>
        <Grid
          display='flex'
          flexDirection='column'
          justifyContent='center'
          margin='auto'
          width='100%'
        >
          <MyInput
            name='email'
            label={translate?.login_page?.email}
            onChange={(value) => setEmail(value as string)}
            value={email}
            required
          />
          <MyInput
            name='password'
            label={translate?.login_page?.password}
            type='password'
            onChange={(value) => setPassword(value as string)}
            value={password}
            required
          />
          <MyButton
            size='medium'
            label={translate?.login_page?.login_button}
            onClick={() => loginUser()}
            variant='contained'
            color='primary'
            disabled={isDisabled}
          />
          <Grid display='flex' justifyContent='center' alignItems='center' mb={5}>
            <Typography variant='caption' mr={2} ml={2}>
              {translate?.login_page.signup1}
            </Typography>
            <Link to='/signup'>
              <Typography variant='body2'>{translate?.login_page.signup2}</Typography>
            </Link>
          </Grid>
          <GoogleLogin
            clientId={clientID}
            buttonText='Login'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
