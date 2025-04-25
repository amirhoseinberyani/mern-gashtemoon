import { Grid, LinearProgress, Typography } from '@mui/material'
import { lang } from 'localization'
import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { LoginContext } from './loginContext'

const FetchContext = createContext<{
  request: (
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
    body?: any,
    successMessage?: string,
  ) => Promise<{ status: number; data: any }>
  loading: boolean
  requestUpload: (
    url: string,
    fileName: string,
    file: any,
  ) => Promise<{ status: number; data: any }>
}>({
  request: (url, method) => new Promise((res, rej) => {}),
  requestUpload: (url, fileName, file) => new Promise((res, rej) => {}),
  loading: false,
})
export { FetchContext }

function FetchContextProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false)
  let { token } = useContext(LoginContext)
  const request = (
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
    body?: any,
    successMessage?: string,
  ) => {
    setLoading(true)
    return new Promise<{ status: number; data: any }>((res, rej) => {
      const controller = new AbortController()
      const signal = controller.signal
      var status: number
      fetch(
        url,
        body
          ? {
              method: method,
              headers: {
                'content-type': 'application/json',
                'cache-Control': 'no-store',
                localization: lang ? lang : 'fa',
                authorization: token && token.length > 0 ? token : '',
              },
              signal: signal,
              body: JSON.stringify(body),
            }
          : {
              method: method,
              headers: {
                'content-type': 'application/json',
                'cache-Control': 'no-store',
                authorization: token && token.length > 0 ? token : '',
                localization: lang ? lang : 'fa',
              },
              signal: signal,
            },
      )
        .then((response) => {
          status = response.status
          return response.json()
        })
        .then((responsJson) => {
          if (status === 500) {
            toast.error(
              <Typography variant='body2'>
                در ارتباط با سرور مشکلی پیش آمده است. دوباره تلاش کنید!
              </Typography>,
            )
          } else if (status === 200 || status === 201) {
            if (method !== 'GET') {
              // toast.success(<Typography variant='body2'>{responsJson.message}</Typography>)
            }
          } else if (status === 401) {
            localStorage.clear()
          } else if (status === 400 || status === 403 || status === 404) {
            toast.error(<Typography variant='body2'>{responsJson.message}</Typography>)
          } else {
            toast.warn(
              <Typography variant='body2'>
                در ارتباط با سرور مشکلی پیش آمده است. دوباره تلاش کنید!
              </Typography>,
            )
          }
          setLoading(false)
          res({ status: status, data: responsJson })
        })
        .catch((e) => {
          if (status === 401) {
            localStorage.clear()
            window.location.reload()
          }

          toast.warn(
            <Typography variant='body2'>
              در ارتباط با سرور مشکلی پیش آمده است. دوباره تلاش کنید!
            </Typography>,
          )
          setLoading(false)
          res({ status: 500, data: [] })
        })
    })
  }

  const requestUpload = (url: string, fileName: string, file: File) => {
    setLoading(true)
    return new Promise<{ status: number; data: any }>((res, rej) => {
      var status: number
      var formData = new FormData()
      formData.append(fileName, file)
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token || '',
          localization: lang ? lang : 'fa',
        },
        body: formData,
      })
        .then((response) => {
          // var reader = response?.body?.getReader();
          // var bytesReceived = 0;

          // reader?.read().then(function processResult(result: any): any {
          //   if (result.done) {

          //     return;
          //   }
          //   bytesReceived += result.value.length;
          //   console.log(`Received ${bytesReceived} bytes of data so far`);

          //   return reader?.read().then(processResult);
          // });

          status = response.status
          return response.json()
        })
        .then((responsJson) => {
          res({ status: status, data: responsJson })
          setLoading(false)
        })
        .catch((e) => {
          res({ status: 500, data: [] })
          setLoading(false)
        })
    })
  }

  return (
    <FetchContext.Provider value={{ request, requestUpload, loading }}>
      {children}
      {loading && (
        <Grid position='absolute' top={0} width='100%'>
          <LinearProgress color='secondary' />
        </Grid>
      )}
    </FetchContext.Provider>
  )
}
export default FetchContextProvider
