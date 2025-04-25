import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import { ReactElement, ReactNode, ReactPortal } from 'react'
import { direction } from 'localization'

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

const ltrCache = createCache({
  key: 'mui',
})

export default function Rtl(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined
}) {
  return (
    <CacheProvider value={direction === 'rtl' ? rtlCache : ltrCache}>
      {props.children}
    </CacheProvider>
  )
}
