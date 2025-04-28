import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import SignUp from './pages/SignUp.jsx'
import StartSelling from './pages/StartSelling.jsx'
import SellerDashboard from './pages/SellerDashboard.jsx'
import BuyerDashboard from './pages/BuyerDashBoard.jsx'
import  { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'


const router=createBrowserRouter([
  { path: '/',
     element: <App />,
      },
      {
        path: '/signup', element:
             <SignUp />
       
        
      },
      {
        path: '/start-selling', element:
             <StartSelling />
      
        
      },
      {
        path:'/seller-dashboard', element:
        <AuthLayout authentication={true}  > 
          <SellerDashboard/>
        </AuthLayout>
        
      },
      {
        path:'/buyer-dashboard',element:<AuthLayout authentication={true} >
             <BuyerDashboard/>
        </AuthLayout>
        
      }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
   
  </StrictMode>,
)
