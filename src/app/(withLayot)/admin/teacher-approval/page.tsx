'use client'

import Loading from "@/components/ui/Loading";
import { useGetTeacherApprovalQuery, useGetTeacherListQuery } from "@/redux/user/userEndPoint";
import {Card, CardHeader, CardBody, Image, Button, Divider} from "@nextui-org/react";
import { useState } from 'react';
import Swal from "sweetalert2";

interface teacherList{
 id:string,
 fullName:string,
 email:string,
 phone_number:string,
 approved_as_teacher:boolean
}
const TeacherApproval=()=>{
    const [id, setId]=useState('')
    const {data, isLoading}=useGetTeacherListQuery(undefined) 
    const {data:ApprovalData,isSuccess}=useGetTeacherApprovalQuery({id})
    console.log("id",id);
    console.log("idData",ApprovalData);
     
    const handleApproval=(id:any)=>{
      setId(id)
      console.log(id);
      
    
    }
    if (isSuccess) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Teacher Approval Succesfully",
        showConfirmButton: false,
        timer: 1500
      });
    }

    if (isLoading) {
        return <Loading/>
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3'>
        {
         data?.map((teacher:teacherList)=>
         <Card key={teacher.id} className="max-w-[400px] m-4">
         <CardHeader className="flex gap-3">
           <Image
             alt="nextui logo"
             height={40}
             radius="sm"
             src="https://i.ibb.co/mFrZxds/download-removebg-preview.png"
             width={40}
           />
           <div className="flex flex-col">
             <p className="text-medium">Teacher ID: {teacher.id}</p>
             <p className="text-medium text-default-500">Teacher Name: {teacher.fullName}</p>
             <p className="text-medium text-default-500">Teacher Email: {teacher.email}</p>
             <p className="text-medium text-default-500">Teacher Number: {teacher.phone_number}</p>
           </div>
         </CardHeader>
         <Divider/>
         <CardBody>
           
        <p className="text-xl text-green-500"> {
        teacher?.approved_as_teacher===true ? <>status: Teacher Approved </>:<>
          <Button onClick={()=>handleApproval(teacher.id)} color="primary" variant="shadow" className="text-white">Approval</Button>
        </>
         }</p>
         </CardBody>
         <Divider/>
         
       </Card>
         )
        }
         </div>
    );
};

export default TeacherApproval;