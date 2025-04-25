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
  const classes = useStyles()

  return (
    <Grid padding={0} container height='100vh' direction='column' className={classes.root}>
      {markers.length > 0 && (
        <MapContainer
          className={classes.branchesMapContainer}
          center={[32.4279, 53.688]}
          zoom={5}
          style={{ height: '500px', width: '500px' }}
          // bounds={[
          //   [50.505, -29.09],
          //   [52.505, 29.09],
          // ]}
          scrollWheelZoom={true}
        >
          {/* <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          <TileLayer
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url='https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png'
          />
          {/* <TileLayer
            attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          /> */}
          {/* <MapMarker markers={markers} centerOfMap={centerOfMap} /> */}
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
