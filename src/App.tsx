import { Analytics } from "@vercel/analytics/react"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { ThemeProviderWrapper } from './Context/ThemeContext'
import Ds from './pages/Ds'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/Ds',
      element: <Ds />,
    },
    {
      path: '/*',
      element: <NotFound />,
    }
  ])

  return (
    <>
      <ThemeProviderWrapper>
        <RouterProvider router={router} />
      </ThemeProviderWrapper>
      <Analytics />
    </>
  )
}

export default App
