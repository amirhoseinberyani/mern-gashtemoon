import React, { useContext, useEffect, useState } from 'react'
import { Tooltip, Typography } from '@mui/material'

import iranLakes from '../../../../assets/data/iranLakes'
import styles from './index.module.css'
import { caspianD, persianGulfD } from '../../../../assets/data/IranMapData'
import { direction } from 'localization'
import { API } from 'config'
import { FetchContext } from '../../../../contexts/fetchContext'
import { useNavigate } from 'react-router-dom'

interface IranMapProps {
  selectedProvince: any
  setSelectedProvince: Function
  openBriefModal?: Function
}

export default function CountryMap({
  setSelectedProvince,
  selectedProvince,
  openBriefModal,
}: IranMapProps) {
  const [provinces, setProvinces] = useState<any>([])
  const { request } = useContext(FetchContext)
  const [lakes] = useState(() => iranLakes)

  useEffect(() => {
    request(API.Location.Provinces, 'GET').then(({ status, data }) => {
      if (status === 200) {
        setProvinces(data.lists)
      }
    })
  }, [])
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <svg className={styles.svg} viewBox='20 0 970 960'>
          <g>
            {provinces &&
              provinces.map((province: any) => (
                <Tooltip
                  key={province.row}
                  title={
                    <Typography variant='body2' style={{ color: 'white' }}>
                      {direction === 'rtl' ? province?.name_fa : province?.name_en}
                    </Typography>
                  }
                >
                  <path
                    className={
                      selectedProvince._id === province._id
                        ? styles.activeProvince
                        : styles.inactiveProvince
                    }
                    d={province.points}
                    onClick={() => {
                      setSelectedProvince(province)
                      navigate(`/attractions/${province?._id}/${province?.name_fa}`)
                      openBriefModal && openBriefModal()
                    }}
                  />
                </Tooltip>
              ))}
          </g>
          <g className={styles.sea}>
            <path className={styles.caspian} d={caspianD} />
            <path className={styles.persian_gulf} d={persianGulfD} />
          </g>
          <g className={styles.lake}>
            {lakes.map((lake) => (
              <Tooltip
                key={lake.id}
                title={
                  <Typography variant='body2' style={{ color: 'white' }}>
                    {lake.name}
                  </Typography>
                }
              >
                <path
                  key={lake.id}
                  className={lake.className}
                  d={lake.d}
                  onClick={() => {
                    setSelectedProvince(lake)
                  }}
                />
              </Tooltip>
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}
