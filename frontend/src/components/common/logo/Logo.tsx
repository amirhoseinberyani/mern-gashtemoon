import { Link } from 'react-router-dom'
import { SiteInfoContext } from 'contexts/siteInfoContext'
import { useContext } from 'react'
import oak from 'assets/images/oak.png'

export default function Logo() {
  const { siteInfo } = useContext(SiteInfoContext)
  return (
    <Link to='/'>
      <img
        loading='lazy'
        src={oak}
        width='45px'
        height='45px'
        alt='logo'
      />
    </Link>
  )
}
