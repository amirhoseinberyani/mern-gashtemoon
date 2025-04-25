import { Grid } from '@mui/material'
import { Title } from 'components'
import { API } from 'config'
import { FetchContext } from 'contexts/fetchContext'
import { motion } from 'framer-motion'
import { translate } from 'localization'
import { useContext, useEffect, useState } from 'react'
import IranMap from './CountryMap'
import './styles.css'

export default function MapAttractions() {
  const [selectedProvince, setSelectedProvince] = useState<any>(0)
  const [tempProvince, setTempProvince] = useState<any>(0)
  const [openBrief, setOpenBrief] = useState<boolean>(false)

  const openBriefModal = () => {
    setOpenBrief(true)
  }

  const { request } = useContext(FetchContext)
  useEffect(() => {
    if (selectedProvince === 0) {
      request(API.Location.Provinces, 'GET').then(({ status, data }) => {
        if (status === 200) {
          const random = Math.floor(Math.random() * data.lists.length)
          setTempProvince(data.lists[random])
        }
      })
    } else setTempProvince(selectedProvince)
  }, [selectedProvince])

  return (
    <Grid container justifyContent='space-around'>
      <Grid
        container
        justifyContent='space-between'
        width='95%'
        alignItems='center'
        margin={'10px auto'}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1 }}
        >
          <Title title={translate?.map?.title} caption={translate?.map?.caption} />
        </motion.div>
      </Grid>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1 }}
      >
        <IranMap
          setSelectedProvince={setSelectedProvince}
          selectedProvince={tempProvince}
          openBriefModal={openBriefModal}
        />
      </motion.div>
    </Grid>
  )
}
