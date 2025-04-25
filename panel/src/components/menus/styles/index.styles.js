import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    height: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 12px 50px 0 rgba(125, 133, 145, 0.15)'

  },
  rightMenu: {
    width: 60,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftMenu: {
    width: 160,
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  centerMenu: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15
  },
  menuIcon: {
    width: 40,
    height: 40
  },
  textLogo: {
    height: 40
  },
  paper: {
    backgroundColor: '#FFF'
  },
  newReserveButton: {

  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 48
  },
  name: {
    marginLeft: 10,
    color: '#000',
    fontSize: 14,
    fontWeight: 700
  },
  notificationButton: {
    backgroundColor: '#fff',
    marginLeft: 15,
    border: '1px solid #e4e4e4'
  }
}))
