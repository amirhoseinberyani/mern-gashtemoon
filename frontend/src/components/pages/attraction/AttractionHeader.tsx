import { Box, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import GridIcon from '@mui/icons-material/ViewComfy'
import ListIcon from '@mui/icons-material/List'
import SearchIcon from '@mui/icons-material/Search'
import { translate } from 'localization'
import { useState } from 'react'

interface AttractionHeaderProps {
  showInGridMode: boolean
  setSHowInGridMode: (val: boolean) => void
  searchQuery: string
  setSearchQuery?: Function
}

export default function AttractionHeader({
  showInGridMode,
  setSearchQuery,
  setSHowInGridMode,
  searchQuery,
}: AttractionHeaderProps) {
  const [innerSearch, setInnerSearch] = useState<String>('')
  return (
    <Box flex={1}>
      <Grid container direction='row-reverse'>
        {/* <IconButton
          sx={{ bgcolor: showInGridMode ? '#ededed' : 'transparent' }}
          color={showInGridMode ? 'primary' : 'default'}
          onClick={() => setSHowInGridMode(true)}
        >
          <GridIcon />
        </IconButton>
        <IconButton
          sx={{ bgcolor: !showInGridMode ? '#ededed' : 'transparent' }}
          color={!showInGridMode ? 'primary' : 'default'}
          onClick={() => setSHowInGridMode(false)}
        >
          <ListIcon />
        </IconButton> */}
        <TextField
          size='small'
          label={translate?.map?.search}
          value={innerSearch}
          variant='outlined'
          dir='ltr'
          onChange={(event) => setInnerSearch(event.target.value)}
          InputProps={{
            dir: 'rtl',
            endAdornment: (
              <InputAdornment position='end' sx={{ zIndex: 1 }}>
                <IconButton onClick={() => setSearchQuery && setSearchQuery(innerSearch)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            mr: 2,
            width: 220,
          }}
        />
      </Grid>
    </Box>
  )
}
