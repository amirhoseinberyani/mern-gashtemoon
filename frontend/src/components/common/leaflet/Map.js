import { Grid, Typography } from '@mui/material'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import icon from '../../../assets/images/pin.png'
import './styles/map.css'

const iconPosition = new L.Icon({
  iconUrl: icon,
  iconRetinaUrl: icon,
  iconSize: new L.Point(20, 25),
  className: 'leaflet-div-icon',
})
export default function MapWithMarkers({ markers, centerOfMap }) {

  return (
    <Grid padding={0} container direction='column' className={'root'}>
      {markers.length > 0 && (
        <MapContainer
          className={'branchesMapContainer'}
          center={[35.6892, 51.389]}
          zoom={0}
          bounds={[
            [50.505, -29.09],
            [52.505, 29.09],
          ]}
          scrollWheelZoom={true}
        >
          <TileLayer url='https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png' />
          <MapMarker markers={markers} centerOfMap={centerOfMap} />
        </MapContainer>
      )}
    </Grid>
  )
}

const MapMarker = ({ markers, centerOfMap }) => {
  const map = useMap()
  useEffect(() => {
    if (centerOfMap[0] !== 35.6892) {
      map.setView(centerOfMap, 13)
    }
  }, [centerOfMap])
  return (
    <>
      {markers.map((marker, index) => {
        return (
          <Marker key={index} icon={iconPosition} position={markers}>
            <Popup>
              <Typography variant='caption'>{marker.name_fa}</Typography>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}
