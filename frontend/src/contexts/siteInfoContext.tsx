import React, { createContext, useState, useEffect, useContext } from 'react'
import { API } from 'config'
import { FetchContext } from './fetchContext'

const SiteInfoContext = createContext({
  siteInfo: {
    headers: [
      {
        description: '',
        image: '',
        title: '',
      },
    ],
    footer: {
      description: '',
      instagram: '',
      telegram: '',
      url: '',
      whatsapp: '',
      youtube: '',
      _id: '',
    },
    navbarIcon: '',
  },
})
export { SiteInfoContext }

interface SiteInfoContextProviderProps {
  children?: React.ReactNode
}

export default function SiteInfoContextProvider({ children }: SiteInfoContextProviderProps) {
  const { request } = useContext(FetchContext)
  const [siteInfo, setSiteInfo] = useState<any>()

  useEffect(() => {
    request(API.Site.SiteInfo, 'GET').then(({ status, data }) => {
      if (status === 200) {
        setSiteInfo(data.site)
      }
    })
  }, [])

  return (
    <SiteInfoContext.Provider
      value={{
        siteInfo,
      }}
    >
      {children}
    </SiteInfoContext.Provider>
  )
}
