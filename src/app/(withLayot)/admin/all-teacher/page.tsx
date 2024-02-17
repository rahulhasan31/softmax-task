'use client'
import Loading from "@/components/ui/Loading";
import { useGetAllTeacherQuery } from "@/redux/user/userEndPoint";
import {Card, CardHeader, CardBody, Image, Button, Divider} from "@nextui-org/react";
interface teacherList{
    id:string,
    name:string,
    email:string,
    mobile_number:string,
    role:string
   }
const AllTeacher = () => {
    const {data, isLoading}=useGetAllTeacherQuery(undefined)
console.log(data);

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
             <p className="text-medium text-default-500">Teacher Name: {teacher.name}</p>
             <p className="text-medium text-default-500"> Role: {teacher.role}</p>
             <p className="text-medium text-default-500">Teacher Number: {teacher.mobile_number}</p>
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

export default AllTeacher;