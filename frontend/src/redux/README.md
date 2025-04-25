# Redux with Redux Toolkit

This folder contains the state management setup using **Redux Toolkit**. Redux Toolkit simplifies the setup of Redux and reduces the boilerplate code. It helps manage the global application state in a more efficient and concise manner.

## Folder Structure

The `redux` folder is organized as follows:

- **`/slices`**: Contains Redux slice files where reducers and actions are defined.
- **`store.js`**: Contains the main Redux store configuration.

## Redux Toolkit Overview

Redux Toolkit provides utilities that simplify Redux setup:

- `createSlice`: Combines actions and reducers into a single file to manage a portion of the state.
- `configureStore`: Simplifies store configuration with built-in defaults, including Redux DevTools.
- `createAsyncThunk`: A helper to manage async actions, like fetching data from APIs, with full lifecycle tracking.

## store.js

The `store.js` file is where we configure the main Redux store using the `configureStore` function from Redux Toolkit. It combines all the reducers into a single store and applies middleware.

### Example: `store.js`

```javascript
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import themeReducer from './slices/themeSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
})

export default store
```
