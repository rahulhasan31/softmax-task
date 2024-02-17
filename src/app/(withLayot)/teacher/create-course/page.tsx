'use client'
import Loading from '@/components/ui/Loading';
import { useGetSingleTeacherQuery, useGetUserProfileQuery, useGetAllCategoryQuery, useCreateCourseMutation } from '@/redux/user/userEndPoint';
import { getUserInfo } from "@/services/auth.service";
import {Card, CardHeader, CardBody, Image, Button, Divider,Input} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from 'sweetalert2';
type Inputs = {
    category:string,
    title: string,
    teacher:string
    
}
interface categoryI{
    id:string,
    name:string,
    description:string,
   
   }
const CreateCourse = () => {
    const user=getUserInfo() as any
    const id=user?.user_id
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()     
      const{data:UserData,isLoading}=useGetUserProfileQuery(id)
    const {data:singleT}=useGetSingleTeacherQuery(UserData?.id)
    // console.log(singleT?.teacher);
    const {data:allCategory}=useGetAllCategoryQuery(undefined)
    const [CreateCourse]=useCreateCourseMutation()
    const onSubmit: SubmitHandler<Inputs> = async(data:any) =>{        
        const CreateCourseData={
            category:data.category,
            title:data.title,
            teacher:[`${singleT?.teacher?.id}`], 
          
         }
         
        //  console.log("CreateCourse", CreateCourseData);
         CreateCourse(CreateCourseData)
        
         
         Swal.fire({
            position: "top",
            icon: "success",
            title: " Course Create Succesfully",
            showConfirmButton: false,
            timer: 1500
          });
        } 

        if (isLoading) {
            return <Loading/>
        }
    return (
        <div>
            <h1 className=' text-3xl text-center font-semibold'>Create Course</h1>
             <div  className="flex w-full flex-col  md:flex-nowrap mb-6 md:mb-0 gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className='m-2'>
        <Input {...register("title")} isRequired name="title" type="text" variant='bordered' id="title" label="Course Title" className="mb-3"  />
        <select {...register("category")} className="py-5 rounded-lg bg-gray-100 border-2 mb-2  w-full ">
  <option disabled selected>Select Category</option>
  {
    allCategory?.map((category:categoryI)=><option key={category.id} value={category.id} >{category.name}</option>)
  }
  
 
</select>
          
          <Button className="mt-3" color="primary"  variant="shadow" type="submit">Submit</Button>
        </form>
        </div>
        </div>
    );
};

export default CreateCourse;