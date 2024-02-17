'use client'
import {Card, CardHeader, CardBody, Image, Button, Divider} from "@nextui-org/react";
import { useGetAllStudentQuery } from '@/redux/user/userEndPoint';
import Loading from "@/components/ui/Loading";
interface student{
    id:string,
    name:string,
    email:string,
    mobile_number:string,
    role:string
   }
const AllStudent = () => {
    const {data,isLoading}=useGetAllStudentQuery(undefined)
    console.log(data);
    if (isLoading) {
        return <Loading/>
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3'>
        {
         data?.map((student:student)=>
         <Card key={student.id} className="max-w-[400px] m-4">
         <CardHeader className="flex gap-3">
           <Image
             alt="nextui logo"
             height={40}
             radius="sm"
             src="https://i.ibb.co/mFrZxds/download-removebg-preview.png"
             width={40}
           />
           <div className="flex flex-col">
             <p className="text-medium">Teacher ID: {student.id}</p>
             <p className="text-medium text-default-500">Student Name: {student?.name}</p>
             <p className="text-medium text-default-500"> Role: {student.role}</p>
             <p className="text-medium text-default-500">Student Number: {student.mobile_number
}</p>
           </div>
         </CardHeader>
         <Divider/>
         <CardBody>
           
        
         </CardBody>
         <Divider/>
         
       </Card>
         )
        }
         </div>
    );
};

export default AllStudent;