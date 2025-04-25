import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { lang } from 'localization'

const basePath = lang === 'en' ? '/en' : ''

interface FooterLinkProps {
  to: string
  title: string
}

export default function FooterLink({ title, to }: FooterLinkProps) {
  return (
    <Link to={`${basePath}${to}`}>
      <Typography variant='h6'>
        {title}
      </Typography>
    </Link>
  )
}
