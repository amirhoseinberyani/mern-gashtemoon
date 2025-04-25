import { Grid, Grid2 } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MyButton } from 'components'
import { translate } from 'localization'

export default function UnregisteredButtons() {
  const navigate = useNavigate()

  return (
    <Grid2 display='flex' justifyContent='space-between' gap={2}>
        <MyButton
          label={translate?.top_menu?.register}
          variant='outlined'
          onClick={() => navigate('/signup')}
          color='primary'
          size='small'
        />
      <MyButton
        label={translate?.top_menu?.login}
        variant='text'
        onClick={() => navigate('/signin')}
        color='secondary'
      />
    </Grid2>
  )
}
