'use client'
import { Layout,  Menu } from 'antd';
import React from 'react';

import { SiderItems } from '../constants/siderItems';
import { USER_ROLE } from '../constants/role';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { useGetUserProfileQuery } from '@/redux/user/userEndPoint';
const {  Sider } = Layout;

const Sidebar = () => {

  const user=getUserInfo() as any
  console.log("user",user);
    
    const{data:UserData,isLoading}=useGetUserProfileQuery(user?.user_id)

  
     const role=UserData?.role
    return (
      
            <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={SiderItems(role)} />
      </Sider>
        
    );
};

export default Sidebar;