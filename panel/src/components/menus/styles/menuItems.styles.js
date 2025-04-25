import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    width: 200,
    height: '100%',
    padding: 10
  },
  topDrawer: {
    width: '100%',
    display: 'flex',
    // paddingLeft: 12,
    alignItems: 'center',
    justifyContent:"center"
  },
  ActiveMenuIcon: {
    width: 20,
    height: 20,
    boxShadow: '0 6px 10px 0 rgba(27, 32, 118, 0.11)',
    borderRadius: 40,
    padding: 6
  },
  inActiveMenuIcon: {
    height: 20,
    padding: 6
  },
  drawerLogo: {
    width: "90%"
  },
  menuList: {
    marginTop: 10,
    borderTop:'1px solid #e5e5e5'
    // paddingLeft: 20
  },
  menuText: {
    fontSize: 14,
    fontWeight: 700
  }
}))
