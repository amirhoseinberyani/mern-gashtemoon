import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

interface SocialMediaLinksProps {
  to: string
  icon: any
  width?: any
  height?: any
}

export default function SocialMediaLinks({
  to,
  icon,
  width = 35,
  height = 35,
}: SocialMediaLinksProps) {
  return (
    <IconButton
      style={{
        marginRight: 10,
        borderRadius: 0,
        padding: '5px',
      }}
    >
      <Link to={to} style={{ width: `${width}px`, height: `${height}px` }} target='_blank'>
        <img src={icon} width={width} height={height} alt='logo' />
      </Link>
    </IconButton>
  )
}
