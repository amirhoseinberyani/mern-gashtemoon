import React, { createContext } from 'react'

const AlertContext = createContext({
  showSuccesAlert: () => { },
  showErrorAlert: () => { },
  showInfoAlert: () => { },
  showWarningAlert: () => { },
})

export { AlertContext }