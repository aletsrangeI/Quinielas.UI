import React from 'react'
import { Navigate, Routes, Route} from 'react-router-dom'
import { AuthRoutes } from '../auth/routes'

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
    </Routes>
  )
}

export default AppRouter
