import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface ConfigState {
  themeMode: 'light' | 'dark'
}

const savedTheme = localStorage.getItem('themeMode') as 'light' | 'dark' | null

const initialState: ConfigState = {
  themeMode: savedTheme || 'light',
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      console.log('state', state.themeMode)
      localStorage.setItem('themeMode', state.themeMode === 'light' ? 'dark' : 'light')
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.themeMode = action.payload
      localStorage.setItem('themeMode', action.payload)
    },
  },
})

export const { toggleTheme, setTheme } = configSlice.actions
export const ConfigInfo = (state: RootState) => state.appConfigs

export default configSlice.reducer
