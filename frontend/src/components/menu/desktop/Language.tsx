import { useRef, useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { changeLanguage, getIcon, lang } from 'localization'
import { OutsideClick } from 'components'
import { flags } from 'assets'

export default function Languages() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const languagesData = [
    { title: 'Persian', lang: 'fa', icon: flags.persian },
    { title: 'English', lang: 'en', icon: flags.uk },
    { title: 'Turkish', lang: 'tr', icon: flags.turkey },
  ]

  OutsideClick(ref, () => setVisible(false))
  const handleClick = () => {
    setVisible(!visible)
  }

  return (
    <Grid position='relative'>
      <Button
        variant='text'
        onClick={handleClick}
        style={{
          marginRight: 10,
          marginLeft: 10,
          minWidth: 25,
          minHeight: 25,
        }}
      >
        <img width={22} height={22} src={getIcon()} alt='flag' />
      </Button>
      <ul
        ref={ref}
        dir='rtl'
        style={{
          position: 'absolute',
          top: 35,
          left: 10,
          borderRadius: 5,
          backgroundColor: 'white',
          padding: 5,
          border: '1px solid',
          borderColor: '#e5e5e5',
          display: visible ? 'block' : 'none',
        }}
      >
        {languagesData?.map((item: any, index: any) => {
          return (
            <li
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              className={lang === item.lang ? 'active-language-list' : 'inactive-language-list'}
              onClick={() => {
                changeLanguage(item.lang)
              }}
            >
              <Typography m={2} variant='caption' width='max-content'>
                {item?.title}
              </Typography>
              <img width={22} height={22} src={item.icon} alt='flag' />
            </li>
          )
        })}
      </ul>
    </Grid>
  )
}
