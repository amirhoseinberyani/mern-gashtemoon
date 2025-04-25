/* eslint-disable no-nested-ternary */
import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import useStyles from './styles/index.styles'
import SiteMainInfo from '../../components/screens/home'

export default function Index() {
  const classes = useStyles()
  return (
    <Grid container direction="column" className={classes.root}>
      <Paper className={classes.paper}>
        <SiteMainInfo />
      </Paper>
    </Grid>
  )
}
