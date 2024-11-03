import React from 'react'
import banner from '../assets/banner.png'
import Products from './Products'
const Dashboard = () => {
  return (
    <>
    {/* <div className='banner w-100 h-50 bg-black ' >
        <img src={banner} alt="banner"
        className=''
        style={{ height: '300px', width:'100%', objectFit: 'scale-down' }} />

    </div> */}
    <div>
      
      <Products />
    </div>

    </>
  )
}

export default Dashboard