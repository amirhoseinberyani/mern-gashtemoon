import { translate } from 'localization'
import Men from '../assets/icons/men.svg'
import Women from '../assets/icons/women.svg'

export const genders: {
  title: string
  name: string
  data: { type: string; title: any; value: any; icon: any }[]
} = {
  title: translate.leaders.filters.gender.title,
  name: 'gender',
  data: [
    {
      type: 'gender',
      title: 'مرد',
      value: 'male',
      icon: Men,
    },
    {
      type: 'gender',
      title: 'زن',
      value: 'female',
      icon: Women,
    },
  ],
}
