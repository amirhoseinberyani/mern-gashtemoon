import { Grid, Modal } from '@mui/material'
import './styles/pickavatar.css'
import { MyButton } from '../uiKit/button'
import { translate } from 'localization'
import { avatars } from 'assets'

const cssBaseClass = 'pickavatar'

const defaultavatars = [
  { id: 1, title: 'jack', icon: avatars.avatar1 },
  { id: 2, title: 'fred', icon: avatars.avatar2 },
  { id: 3, title: 'fred', icon: avatars.avatar3 },
  { id: 4, title: 'fred', icon: avatars.avatar4 },
  { id: 5, title: 'fred', icon: avatars.avatar5 },
  { id: 6, title: 'fred', icon: avatars.avatar6 },
]

interface PickavatarProps {
  pickAvatarModal: boolean
  closePickAvatarModal: () => void
  setProfileUrl: Function
  setDefaultAvatar: Function
  defaultAvatar: number
}

export default function Pickavatar({
  pickAvatarModal,
  closePickAvatarModal,
  setProfileUrl,
  defaultAvatar,
  setDefaultAvatar,
}: PickavatarProps) {
  return (
    <Modal open={pickAvatarModal} onClose={closePickAvatarModal}>
      <Grid xs={11} md={8} lg={6} className={`${cssBaseClass}-root`}>
        <Grid className={`${cssBaseClass}-default-avatars`}>
          {defaultavatars.map((item, index) => (
            <Grid xs={6} sm={4} display='flex' justifyContent='center' mb={5} key={index}>
              <img
                style={{
                  cursor: 'pointer',
                  opacity: item.id === defaultAvatar ? 1 : 0.5,
                }}
                onClick={() => {
                  setDefaultAvatar(item.id)
                }}
                key={index}
                src={item.icon}
                width='128px'
                height='128px'
                alt={item.title}
              />
            </Grid>
          ))}
        </Grid>
        <Grid className={`${cssBaseClass}-buttons`}>
          <MyButton
            label={translate?.register_page?.upload_image}
            onClick={() => {
              document.getElementById('select-profile-image')?.click()
            }}
            fullWidth={true}
            variant='outlined'
          />
          <Grid width={50} />
          <MyButton
            label={translate?.register_page?.accept_btn}
            fullWidth={true}
            variant='contained'
            onClick={() => {
              setProfileUrl('')
              closePickAvatarModal()
            }}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}
