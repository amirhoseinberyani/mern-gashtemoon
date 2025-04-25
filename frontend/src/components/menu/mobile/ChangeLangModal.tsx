import { Grid, Modal, Typography } from '@mui/material'
import { changeLanguage, lang } from 'localization'
import { flags } from 'assets'
import './change-lang.css'

interface ChangeLangModalProps {
  open: boolean
  onClose: Function
}

export default function ChangeLangModal({ open, onClose }: ChangeLangModalProps) {
  const languagesData = [
    { title: 'Persian', lang: 'fa', icon: flags.persian },
    { title: 'English (UK)', lang: 'en', icon: flags.uk },
  ]
  return (
    <Modal open={open} onClose={() => onClose()}>
      <Grid className='change-lang-root'>
        <ul dir='rtl' style={{ padding: 0, width: '100%' }}>
          {languagesData?.map((item: any, index: any) => {
            return (
              <li
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  cursor: 'pointer',
                  width: '100%',
                }}
                onClick={() => {
                  changeLanguage(item.lang)
                  onClose()
                }}
              >
                <Grid
                  className={lang === item.lang ? 'active-language-list' : 'inactive-language-list'}
                >
                  <Typography m={2} variant='caption' width='max-content'>
                    {item?.title}
                  </Typography>
                  <img width={22} height={22} src={item.icon} alt='flag' />
                </Grid>
              </li>
            )
          })}
        </ul>
      </Grid>
    </Modal>
  )
}
