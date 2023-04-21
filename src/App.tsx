import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const isValidToken = (jwtToken?: string) => {
    return true
  }

  useEffect(() => {
    if (!isValidToken('')) {
      setIsLogged(false)
      setRedirect(true)
    } else {
      setIsLogged(true)
      setRedirect(false)
    }
  }, [])

  const PrivateRoute = React.useCallback(() => {
    if (!isLogged)
      return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          {redirect ? <Route path="*" element={<Navigate to="/login" />} /> : null}
        </Routes>
      )

    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="/500" element={<Page500 />} />
        <Route path="*" element={<DefaultLayout />} />
      </Routes>
    )
  }, [isLogged, redirect])

  return (
    <>
      <ToastContainer />
      <HashRouter>
        <Suspense fallback={loading}>{PrivateRoute()}</Suspense>
      </HashRouter>
    </>
  )
}

export default App
