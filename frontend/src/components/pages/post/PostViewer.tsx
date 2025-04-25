import { Grid } from '@mui/material'
import ViewAudio from './ViewAudio'
import ViewImage from './ViewImage'
import ViewParagraph from './ViewParagraph'
import ViewQuote from './ViewQuote'
import ViewSeperator from './ViewSeperator'
import ViewTitle from './ViewTitle'
import ViewVideo from './ViewVideo'
import { API } from 'config'

interface PostViewrProps {
  description: any
  postCover?: any
}

export default function PostViewer({ description, postCover }: PostViewrProps) {
  var Descriptions = JSON.parse(description)
  return (
    <Grid width='-webkit-fill-available'>
      {Descriptions?.map((item: any, index: any) => {
        if (item.type === 'Title') {
          return (
            <>
              <ViewTitle item={item} key={index} />
            </>
          )
        } else if (item.type === 'Paragraph') {
          return <ViewParagraph item={item} key={index} />
        } else if (item.type === 'Image') {
          return <ViewImage item={item} key={index} />
        } else if (item.type === 'Audio') {
          return <ViewAudio item={item} key={index} />
        } else if (item.type === 'Video') {
          return <ViewVideo item={item} key={index} />
        } else if (item.type === 'Quote') {
          return <ViewQuote item={item} key={index} />
        } else if (item.type === 'Seperator') {
          return <ViewSeperator item={item} key={index} />
        } else {
          return null
        }
      })}
    </Grid>
  )
}
