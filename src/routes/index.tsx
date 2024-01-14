import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Layouts
import AppLayout from 'src/layouts/AppLayout'
import BlankLayout from 'src/layouts/BlankLayout'

// Pages
import ErrorPage from 'src/pages/ErrorPage'
import ForgotPasswordPage from 'src/pages/ForgotPasswordPage'
import HomePage from 'src/pages/HomePage'
import LandingPage from 'src/pages/LandingPage'
import LoginPage from 'src/pages/LoginPage'
import ProfilePage from 'src/pages/ProfilePage'
import RegisterPage from 'src/pages/RegisterPage'

// Route Declaration
const router = createBrowserRouter([
  {
    path: '/',
    element: <BlankLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />
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
      }
    ]
  },
  {
    path: '/app',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/app/',
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