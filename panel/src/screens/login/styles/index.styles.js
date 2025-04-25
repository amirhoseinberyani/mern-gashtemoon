import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    padding: 10
  },
  loginGrid: {
    marginTop: 40,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    width: 350,
    backgroundColor: "#FFFFFF",
    boxShadow: '0 12px 50px 0 rgba(125, 133, 145, 0.15)',
    [theme.breakpoints.down('xs')]: {
      width: "90%"
    }
  },
  input: {
    marginBottom: 20
  },
  changeLangBtn: {
    marginTop: 10
  }
}))
