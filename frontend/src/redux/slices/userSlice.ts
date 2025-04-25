import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface UserState {
  token: string
  user: {
    _id: string
    role: 0 | 1 | 2 | 3
    bio: string
    profileUrl: string
    defaultAvatar: number
    firstName: string
    lastName: string
    wishVisits: any
    visiteds: any
    followings: any
    followers: any
  }
}

const initialState: UserState = {
  token: '',
  user: {
    _id: '',
    role: 0,
    bio: '',
    profileUrl: '',
    defaultAvatar: 0,
    firstName: '',
    lastName: '',
    wishVisits: null,
    visiteds: null,
    followings: null,
    followers: null,
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doLogin: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
    },
    doLogout: (state) => {
      state.token = ''
      state.user = {
        role: 0,
        _id: '',
        bio: '',
        profileUrl: '',
        defaultAvatar: 0,
        firstName: '',
        lastName: '',
        wishVisits: null,
        visiteds: null,
        followers: null,
        followings: null,
      }
      localStorage.removeItem('token')
    },
    updateUserInfo: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload
    },
  },
})

export const { doLogin, doLogout, updateUserInfo } = userSlice.actions

export const userInfo = (state: RootState) => state.user // تغییر از userInfo به user

export default userSlice.reducer
