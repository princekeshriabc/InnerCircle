import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/user.context'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  return (
    <UserProvider>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </UserProvider>
  )
}

export default App
