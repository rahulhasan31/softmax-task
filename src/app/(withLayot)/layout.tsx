'use client'

import { Layout} from 'antd';
import Sidebar from '@/components/ui/Sidebar';
import Contents from '@/components/ui/Contents';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';




const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  const [isLoading, setLoading]=useState<boolean>(false)
  const userLogin=isLoggedIn()
  const router=useRouter()
  
  useEffect(()=>{
    if (!userLogin  ) {
      router.push('/signup')
    }
    setLoading(true)
  },[router])


  if (!isLoading) {
    return <p>Loading...</p>
  }
 
  return (
    <Layout hasSider >
      <Sidebar/>
      
      <Contents>
      {children}
      </Contents>

      
    </Layout>
  );
};

export default DashboardLayout;