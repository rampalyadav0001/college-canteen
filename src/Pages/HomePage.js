import React from 'react'
import MenuList from '../features/Menu-list/MenuList'
import Navbar from '../components/Navbar'
function HomePage() {
  return (
   <div>
      <Navbar>
        <MenuList></MenuList>
      </Navbar>
   </div>
  )
}

export default HomePage