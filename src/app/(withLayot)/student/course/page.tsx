'use client'

import { useEnrolledCourseMutation, useGetCourseListQuery, useGetStudentIDQuery, useGetUserProfileQuery } from '@/redux/user/userEndPoint';
import {  getUserInfo, storeUserInfo } from '@/services/auth.service';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const CoursePage = () => {
    //ts-ignore
    const{data, isLoading,isError}=useGetCourseListQuery(undefined) 
   console.log("isError", isError);

  //  if (isError) {
  //    const getRefesh:string | undefined=Cookies.get('access')
  //    console.log(getRefesh);
  //    if (getRefesh !== undefined) {
  //     storeUserInfo({ access: getRefesh });
  //   } else {
      
  //     console.error('Access refesh token is undefined.');
  //   }
     
  //  }
   const user=getUserInfo() as any

     
     const{data:UserData}=useGetStudentIDQuery(user?.user_id)
         console.log("get student id ",UserData);
   const [EnrolledCourse,{}]=useEnrolledCourseMutation()
   const handleCourse=(data:any)=>{
    
   const enrolledData={
      student:UserData?.student.id,
     course:data,
    status: "enrolled"
    }
    console.log(enrolledData);
    
    EnrolledCourse(enrolledData)
    
Swal.fire({
  position: "top",
  icon: "success",
  title: "Your Course Enroll has been Success",
  showConfirmButton: false,
  timer: 1500
});
   }
   interface courseData{
    id:string,
    title: string
   
  
  }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3'>
       {
        data?.map((courses:courseData)=>
              <Card key={courses.id} className="py-4 m-3">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold"></p>
        <small className="text-default-500">{courses?.id}</small>
        <h4 className="font-bold text-large">{courses?.title}</h4>
      </CardHeader>
      <CardBody className=" overflow-visible">
        <Image
          alt="Card background"
          className="object-cover rounded-xl mx-auto"
          src="https://i.ibb.co/ggtKkH8/download.jpg"
          width={270}
        />
         <Button onClick={()=>handleCourse(courses?.id)} color="primary" variant="shadow" className='mt-5'>
        Enrolled
      </Button>
      </CardBody>
    </Card>
        )
       }
        </div>
    );
};

export default CoursePage;