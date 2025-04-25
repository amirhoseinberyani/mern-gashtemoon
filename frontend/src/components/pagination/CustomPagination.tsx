import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import { Grid } from '@mui/material'

interface MyPaginationProps {
  page: any
  changePage: any
}

export default function MyPagination({ page, changePage }: MyPaginationProps) {
  return (
    <Grid container justifyContent='center' alignItems='center' height='80px'>
      <Pagination
        count={page}
        onChange={(event: React.ChangeEvent<unknown>, page: number) => changePage(page)}
        color='primary'
        showFirstButton
        showLastButton
      />
    </Grid>
  )
}
