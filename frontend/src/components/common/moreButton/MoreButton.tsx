import { MyButton } from 'components/uiKit'
import { translate } from 'localization'
import { Link } from 'react-router-dom'

import { ButtonProps } from '@mui/material'

interface MoreButtonProps extends ButtonProps {
  to: string
}

export default function MoreButton({ to }: MoreButtonProps) {
  return (
    <MyButton
      variant='outlined'
      size='small'
      color='primary'
      label={translate?.other?.detail}
      component={Link}
      {...{ to }}
    />
  )
}
