'use client'
import { useGetSingleTeacherQuery, useGetTeacherCourseQuery, useGetUserProfileQuery } from '@/redux/user/userEndPoint';
import { getUserInfo } from '@/services/auth.service';
import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import Loading from '@/components/ui/Loading';

interface courseData{
    id:string,
    title: string
    category:string
   
  
  }
const CourseLit = () => {
    const user=getUserInfo() as any
    const id=user?.user_id
    const{data:UserData,}=useGetUserProfileQuery(id)
    const {data:singleT}=useGetSingleTeacherQuery(UserData?.id)
const {data, isLoading}=useGetTeacherCourseQuery(singleT?.teacher?.id)
    console.log(data);
    
    if (isLoading) {
        return <Loading/>
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 '>
        {
            data?.courses?.map((course:courseData )=> 
            <Card key={course.id} className="max-w-[400px] m-4">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://i.ibb.co/mFrZxds/download-removebg-preview.png"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-medium">Course title: {course.title}</p>
                <p className="text-medium text-default-500">Category ID: {course.category}</p>
                <p className="text-medium text-default-500">Course ID: {course.id}</p>
              </div>
            </CardHeader>
            <Divider/>
            <CardBody>
              {/* <p className="text-xl text-green-500">status: {course.status}</p> */}
            </CardBody>
            <Divider/>
            
          </Card>
          )
        }
    </div>
    );
};

export default CourseLit;