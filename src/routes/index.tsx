import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Layouts
import AppLayout from '../layouts/AppLayout'

// Pages
import ErrorPage from '../pages/ErrorPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import HomePage from '../pages/HomePage'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import RegisterPage from '../pages/RegisterPage'

// Route Declaration
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />
  },
  {
    path: '/app',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: '/app/profile',
        element: <ProfilePage />
      }
    ]
  }
])

export default function Router() {
  return (
    <RouterProvider router={router} />
  )
}