import React from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import {HomePage,CartPage, SignUpPage } from './Pages'
import Logout from './features/auth/Logout';


const router=createBrowserRouter([
{
  path:'/',
  element:<HomePage />
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



])
function App() {
  return (
    <div >
   
  <RouterProvider router={router} />
    </div>
  );
}

export default App;
