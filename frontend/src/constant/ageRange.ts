import { translate } from '../localization'

export const ageRange: {
  title: string
  name: string
  data: { type: string; title: any; value: any; icon: any }[]
} = {
  title: translate.leaders.filters.age.title,
  name: 'ages',
  data: [
    {
      type: 'ages',
      title: translate.leaders.filters.age.minus,
      value: [0,20],
      icon: '',
    },
    {
      type: 'ages',
      title: translate.leaders.filters.age.first,
      value: [20,25],
      icon: '',
    },
    {
      type: 'ages',
      title: translate.leaders.filters.age.second,
      value: [25,30],
      icon: '',
    },
    {
      type: 'ages',
      title: translate.leaders.filters.age.third,
      value: [30,35],
      icon: '',
    },
    {
      type: 'ages',
      title: translate.leaders.filters.age.fourth,
      value: [35,40],
      icon: '',
    },
    {
      type: 'ages',
      title: translate.leaders.filters.age.fifth,
      value: [40,45],
      icon: '',
    },
    {
      type: 'ages',
      title: translate.leaders.filters.age.sixth,
      value: [45,50],
      icon: '',
    },
    {
      type: 'ages',
      title: translate.leaders.filters.age.more,
      value: [50,100],
      icon: '',
    },
  ],
}
