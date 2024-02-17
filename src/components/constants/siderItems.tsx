import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { USER_ROLE } from './role';
import Link from 'next/link';
export const SiderItems = (role:string) => {
    const defualtItems:MenuProps["items"]=[
        {
        key: "profile",
        icon:<UserOutlined/> ,
        label:<Link href={'/profile'}>Profile</Link>,
    },
    {
        key: "course",
        icon:<UserOutlined/> ,
        label:<Link href={`/${role}/course`}>Cousrse List</Link>,
    },
        {
        key: "enrolled-Course",
        icon:<UserOutlined/> ,
        label:<Link href={`/${role}/mycourse`}>Enrolled Course</Link>,
    },
        
]
    const teacherItems:MenuProps["items"]=[
        {
        key: "profile",
        icon:<UserOutlined/> ,
        label:<Link href={'/profile'}>Profile</Link>,
    },
        {
        key: "create-course",
        icon:<UserOutlined/> ,
        label:<Link href={`/${role}/create-course`}>Create Course</Link>,
    },
        {
        key: "My-Course",
        icon:<UserOutlined/> ,
        label:<Link href={`/${role}/course-list`}>Teachers Course List</Link>,
    },
]
    const commonAdmin:MenuProps["items"]=[
        {
        key: "Admin-Profile",
        icon:<UserOutlined/> ,
        label:<Link href={'/profile'}>Profile</Link>,
    },
        {
        key: "teacher-stutas",
        icon:<UserOutlined/> ,
        label:<Link href={`/${role}/teacher-approval`} >Teacher Approved</Link>,
    },
        {
        key: "create-category",
        icon:<UserOutlined/> ,
        label:<Link href={`/${role}/create-category`} >Create Category</Link>,
    },
        {
        key: "All-teacher",
        icon:<UserOutlined/> ,
        label:<Link href={`/${role}/all-teacher`} >All Teacher</Link>,
    },
        {
        key: "All-Student",
        icon:<UserOutlined/> ,
        label:<Link href={`/${role}/all-student`} >All Student</Link>,
    },
]
    if(role===USER_ROLE.STUDENT)return defualtItems
    else if(role===USER_ROLE.ADMIN) return commonAdmin
    else if(role===USER_ROLE.TEACHER) return teacherItems
    
};

