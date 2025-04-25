import { Grid, Modal } from '@mui/material'
import Slider from '@mui/material/Slider'
import { MyButton } from 'components'
import { API } from 'config'
import { FetchContext } from 'contexts/fetchContext'
import { translate } from 'localization'
import React, { useCallback, useContext, useState } from 'react'
import Cropper from 'react-easy-crop'
import { canvasPreview } from './canvasPreview'
import './styles/pick-custom-image.css'

interface ImageCropperProps {
  setProfileUrl: Function
  onCancel: Function
}

export default function ImageCropper({ setProfileUrl, onCancel }: ImageCropperProps) {
  const [imgSrc, setImgSrc] = useState<string>('')
  const [customImgModal, setCustomImgModal] = useState<boolean>(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const { requestUpload } = useContext(FetchContext)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setZoom(newValue as number)
  }

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels) // نگهداری ناحیه برش خورده
  }, [])

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImgSrc(reader?.result?.toString() || '')
        setCustomImgModal(true)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const uploadCropped = async () => {
    if (croppedAreaPixels && imgSrc) {
      const croppedImage = await canvasPreview(imgSrc, croppedAreaPixels, zoom)
      requestUpload(API.App.Upload.UserProfile, 'user-profile', croppedImage).then(
        ({ status, data }) => {
          if (status === 200) {
            setProfileUrl(data?.path)
            setCustomImgModal(false)
            onCancel()
          }
        },
      )
    }
  }

  const cssBaseClass = 'pick-custom-image'

  return (
    <Grid>
      <Grid>
        <input
          id='select-profile-image'
          type='file'
          accept='image/*'
          onChange={onSelectFile}
          className={`${cssBaseClass}-input`}
        />
      </Grid>
      {customImgModal && (
        <Modal
          open={customImgModal}
          onClose={() => {
            setCustomImgModal(false)
          }}
        >
          <Grid
            container
            bgcolor={'transparent'}
            direction='column'
            alignItems='center'
            className={`${cssBaseClass}-modal-content`}
          >
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              classes={{
                containerClassName: '',
                cropAreaClassName: '',
                mediaClassName: '',
              }}
              style={{
                containerStyle: {
                  height: '80vh',
                  marginTop: '1%',
                },
              }}
            />
            <Grid
              bgcolor='white'
              width='100%'
              position='absolute'
              bottom={0}
              height='auto'
              item
              padding={10}
            >
              <Slider
                aria-label='Zoom'
                value={zoom}
                max={3}
                step={0.1}
                min={1}
                onChange={handleChange}
              />
              <Grid padding='0 10px' container justifyContent='flex-end'>
                <MyButton
                  label={translate.register_page.accept_btn}
                  variant='contained'
                  onClick={uploadCropped}
                />
                <Grid width='30px' />
                <MyButton
                  label={translate.register_page.cancel_btn}
                  variant='outlined'
                  onClick={() => {
                    setCustomImgModal(false)
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Modal>
      )}
    </Grid>
  )
}
