import { translate } from 'localization'

export const leaderType: {
  title: string
  name: string
  data: { type: string; title: any; value: any; icon: any }[]
} = {
  title: translate?.leaders.filters.leaderType.title,
  name: 'leaderType',
  data: [
    {
      type: 'leaderType',
      title: translate?.leaders.filters.leaderType.culture,
      value: 2,
      icon: '',
    },
    {
      type: 'leaderType',
      title: translate?.leaders.filters.leaderType.nature,
      value: 3,
      icon: '',
    },
  ],
}
