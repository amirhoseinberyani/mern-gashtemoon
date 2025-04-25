import { Grid2 } from '@mui/material'
import { avatars } from 'assets'
import { MyButton } from 'components'
import { API } from 'config'
import { FetchContext } from 'contexts/fetchContext'
import { translate } from 'localization'
import { useContext, useEffect, useState } from 'react'
import ImageCropper from './ImageCropper'
import PickAvatar from './PickAvatar'

interface UploadImageProps {
  profileUrl: string
  setProfileUrl: Function
  defaultAvatar: number
  setDefaultAvatar: Function
}

export default function UploadImage({
  setProfileUrl,
  profileUrl,
  defaultAvatar,
  setDefaultAvatar,
}: UploadImageProps) {
  const defaultAvatars = [
    avatars.avatar1,
    avatars.avatar2,
    avatars.avatar3,
    avatars.avatar4,
    avatars.avatar5,
    avatars.avatar6,
  ]
  const { requestUpload } = useContext(FetchContext)
  const [pickAvatarModal, setPickAvatarModal] = useState<boolean>(false)

  const [completedCrop, setCompletedCrop] = useState<any>() // cropped image here

  const closePickAvatarModal = () => {
    setPickAvatarModal(false)
  }

  const openUploadModal = () => {
    setPickAvatarModal(true)
  }

  useEffect(() => {
    if (completedCrop) {
      requestUpload(API.App.Upload.UserProfile, 'user-profile', completedCrop).then(
        ({ status, data }) => {
          if (status === 200 && data) {
            setProfileUrl(data?.path)
          }
        },
      )
    }
  }, [completedCrop])

  return (
    <>
      <Grid2 display='flex' justifyContent='space-between' alignItems='center' margin='auto'>
          <img
            width='64px'
            height='64px'
            style={{ borderRadius: '50%' }}
            src={
              profileUrl
                ? API.BASE_URL + profileUrl
                : defaultAvatar
                ? defaultAvatars[defaultAvatar - 1]
                : defaultAvatars[0]
            }
            alt='profile'
          />
        <MyButton
          label={translate?.register_page?.upload_image_button}
          variant='text'
          onClick={openUploadModal}
        />
      </Grid2>
      {pickAvatarModal && (
        <PickAvatar
          pickAvatarModal={pickAvatarModal}
          closePickAvatarModal={closePickAvatarModal}
          defaultAvatar={defaultAvatar}
          setProfileUrl={setProfileUrl}
          setDefaultAvatar={setDefaultAvatar}
        />
      )}
      <ImageCropper setProfileUrl={setProfileUrl} onCancel={closePickAvatarModal} />
    </>
  )
}
