import React from 'react'
import { Avatar } from '@mui/material'

import { avatars } from 'assets'
import { API } from 'config'

interface UserAvatarProps {
  data: any
}
export default function UserAvatar({ data }: UserAvatarProps) {
  const defaultAvatar = [avatars.avatar1, avatars.avatar2, avatars.avatar3, avatars.avatar4, avatars.avatar5, avatars.avatar6]
  return (
    <Avatar>
      <img
        src={
          data?.profileUrl
            ? API.BASE_URL + data?.profileUrl
            : defaultAvatar[data?.defaultAvatar - 1]
        }
        alt='avatar'
        width={45}
        height={45}
      />
    </Avatar>
  )
}
