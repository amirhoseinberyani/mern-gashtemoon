import AttractionCardList from './AttractionCardList'
import AttractionCardGrid from './AttractionCardGrid'
import './attraction-item.css'

interface AttractionItemProps {
  showInList?: boolean
  name: string
  cover: string
  id: any
  generalId: any
  loading: boolean
  province: any
  county: any
  attractionType: any
  title: string
  rate: { sum: number; userCount: number; rate: number }
  projectInformation?: {
    adminsCount: number
    participantsCount: number
    lastOpened: string
    surveysCount: number
    completedSurveysCount: number
    reportsCount: number
  }
}

export default function AttractionCard({
  showInList,
  name,
  rate,
  cover,
  attractionType,
  province,
  county,
  id,
  generalId,
  title,
  loading,
}: AttractionItemProps) {
  return showInList ? (
    <AttractionCardList
      name={name}
      id={id}
      rate={rate}
      generalId={generalId}
      attractionType={attractionType}
      cover={cover}
      province={province}
      county={county}
      title={title}
    />
  ) : (
    <AttractionCardGrid
      id={id}
      generalId={generalId}
      title={title}
      loading={loading}
      province={province}
      county={county}
      rate={rate}
      attractionType={attractionType}
      name={name}
      cover={cover}
    />
  )
}
