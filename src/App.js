import React from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import {MenuPage,CartPage, SignUpPage } from './Pages'
import Logout from './features/auth/Logout';
import CheckoutPage from './Pages/CheckoutPage';
import UserProfilePage from './Pages/UserProfilePage';
import HomePage from './Pages/HomePage';

const router=createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>
  },
{
  path:'/menu',
  element:<MenuPage />
},
{
  path:'/cart',
  element:<CartPage/>
  
},
{
  path:'/signup',
  element:<SignUpPage/>
},
{
  path:'/logout',
  element:<Logout />
},
{
  path:'/checkout',
  element:<CheckoutPage />
},
{
  path:'/userprofile',
  element:<UserProfilePage/>
},




])
function App() {
  return (
    <div >
   
  <RouterProvider router={router} />
    </div>
  );
}

export default App;
