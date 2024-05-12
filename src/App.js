import React from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import {HomePage,CartPage } from './Pages'
const router=createBrowserRouter([
{
  path:'/',
  element:<HomePage />
},
{
  path:'/cart',
  element:<CartPage/>
  
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
