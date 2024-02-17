"use Client"
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import { useGetMyEnrolledDataQuery, useGetStudentIDQuery, useGetUserProfileQuery } from "@/redux/user/userEndPoint";
import { getUserInfo } from "@/services/auth.service";


const page = () => {
    const user=getUserInfo() as any
    // console.log("user",user);
      
      const{data:UserData,isLoading}=useGetStudentIDQuery(user?.user_id)
    const id:any=UserData?.student?.id
    const{data}=useGetMyEnrolledDataQuery({id})
    console.log('data',data);


    if (isLoading) {
        return <p>Loading..</p>
    }

    interface courseData{
      id:string,
      course: number
      status:string
      student:number
    
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 '>
            {
                data?.student_courses?.map((course:courseData )=> 
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
                    <p className="text-medium">Course ID: {course.course}</p>
                    <p className="text-medium text-default-500">Student ID: {course.student}</p>
                  </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <p className="text-xl text-green-500">status: {course.status}</p>
                </CardBody>
                <Divider/>
                
              </Card>
              )
            }
        </div>
    );
};

export default page;