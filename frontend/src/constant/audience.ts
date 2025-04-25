import { translate } from '../localization'

export const audience: {
  title: string
  name: string
  data: { type: string; title: any; value: any; icon: any }[]
} = {
  title: translate.leaders.filters.audience.title,
  name: 'audience',
  data: [
    {
      type: 'audience',
      title: translate.leaders.filters.audience.child,
      value: 'enf',
      icon: '',
    },
    {
      type: 'audience',
      title: translate.leaders.filters.audience.teen,
      value: 'jou',
      icon: '',
    },
    {
      type: 'audience',
      title: translate.leaders.filters.audience.youth,
      value: 'you',
      icon: '',
    },
    {
      type: 'audience',
      title: translate.leaders.filters.audience.adult,
      value: 'old',
      icon: '',
    },
  ],
}
