import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DashSidebar } from '../componenents/DashSidebar'
import { DashProfile } from '../componenents/DashProfile'
import { DashPosts } from '../componenents/DashPosts'

const Dashboard = () => {
    const location = useLocation()
    const [tab, setTab] = useState('')

    useEffect(() =>{
     const urlParams = new URLSearchParams(location.search)
     const tabFromUrl = urlParams.get('tab')
     if(tabFromUrl){
        setTab(tabFromUrl)
     }
    }, [location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
        {/* sidebar */} 
        <div className="md:w-56">
            <DashSidebar/>
        </div>
        {/* profile .. */}
        {tab === 'profile' && <DashProfile/>}
        {/* posts */}
        {tab==="posts" && <DashPosts/>}
    </div>
  )
}

export default Dashboard