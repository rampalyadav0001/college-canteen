import React from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import {HomePage,CartPage, SignUpPage } from './Pages'
import SignIn from './features/auth/SignIn'
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
  path:'/signin',
  element:<SignIn/>
}

])
function App() {
  return (
    <div >
   
  <RouterProvider router={router} />
    </div>
  );
}

export default App;
