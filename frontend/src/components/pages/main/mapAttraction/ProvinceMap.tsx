import { Tooltip, Typography } from '@mui/material'
import { direction } from 'localization'
import styles from './index.module.css'

interface ProvinceMapProps {
  selectedProvince: any
}

export default function ProvinceMap({ selectedProvince }: ProvinceMapProps) {
  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <svg className={styles.svg} viewBox='0 0 800 400'>
          <g>
            {selectedProvince &&
              selectedProvince.cities?.map((province: any) => (
                <Tooltip
                  key={province?.id}
                  title={
                    <Typography variant='body2' style={{ color: 'white' }}>
                      {direction === 'rtl' ? province?.name_fa : province?.name_en}
                    </Typography>
                  }
                >
                  <path
                    className={
                      selectedProvince?._id === province?._id
                        ? styles.activeProvince
                        : styles.inactiveProvince
                    }
                    d={province?.points}
                  />
                </Tooltip>
              ))}
          </g>
        </svg>
      </div>
    </div>
  )
}
