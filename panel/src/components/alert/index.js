import React, { createContext, useState, useReducer } from 'react'
import MyAlert from './MyAlert'
import AlertReducer from './AlertReducer'
import { AlertContext } from './AlertContext'

function AlertContextProvider({ children }) {

  const [alertState, dispatch] = useReducer(AlertReducer, {
    open: false,
    message: "",
    type: "success"
  })
  const showSuccesAlert = (iMessage) => {
    dispatch({ type: "SUCCESS", payload: { message: iMessage } })
  }
  const showErrorAlert = (iMessage) => {
    dispatch({ type: "ERROR", payload: { message: iMessage } })

  }
  const showInfoAlert = (iMessage) => {
    dispatch({ type: "INFO", payload: { message: iMessage } })
  }
  const showWarningAlert = (iMessage) => {
    dispatch({ type: "WARNING", payload: { message: iMessage } })
  }
  return (
    <AlertContext.Provider
      value={{
        showErrorAlert, showInfoAlert, showSuccesAlert, showWarningAlert
      }}
    >
      {children}
      <MyAlert open={alertState.open} dispatch={dispatch} message={alertState.message} type={alertState.type} />
    </AlertContext.Provider>
  )
}
export default AlertContextProvider
