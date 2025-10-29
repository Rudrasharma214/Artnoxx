import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import OpenRoute from './routes/OpenRoute'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Contact from './pages/Contact'
import Login from './pages/Login'
import DashboardLayout from './pages/DashboardLayout'
import ProductSection from './components/ProductSection'
import MessagesSection from './components/MessagesSection'
// Lazy load all pages for better code splitting
// const Home = lazy(() => import('./pages/Home'))
// const About = lazy(() => import('./pages/About'))
// const Work = lazy(() => import('./pages/Work'))
// const Contact = lazy(() => import('./pages/Contact'))
// const Login = lazy(() => import('./pages/Login'))

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#e8e0d5]">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      <p className="mt-4 text-gray-700 font-medium">Loading...</p>
    </div>
  </div>
)

// Create router with nested routes
const router = createBrowserRouter([
  // Public Portfolio Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "work",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Work />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
  
  // Hidden Admin Login
  {
    path: "/login",
    element: (
      <OpenRoute>
        <Suspense fallback={<PageLoader />}>
          <Login />
        </Suspense>
      </OpenRoute>
    ),
  },
  
  // Protected Admin Dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <DashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      
      {
        path: "products",
        element: <ProductSection />
      },
      {
        path: "messages",
        element: <MessagesSection />
      }
    ]
  },
  
  // Catch all - redirect to home
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App