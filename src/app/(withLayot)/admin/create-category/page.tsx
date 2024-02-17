"use client"

import {Card, CardHeader, CardBody, Image, Button, Divider,Input} from "@nextui-org/react";
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetAllCategoryQuery } from "@/redux/user/userEndPoint";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure, Checkbox,  Link} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import EditCategory from "@/components/ui/EditCategory";

type Inputs = {
    name: string
    description: string
    
}

interface categoryI{
    id:string,
    name:string,
    description:string,
   
   }
const CategoryPage = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const [CreateCategory, {isSuccess, isLoading}]=useCreateCategoryMutation()
const onSubmit: SubmitHandler<Inputs> = async(data:any) =>{        
      const userData={
        name:data.name,
        description:data.description, 
        
       }
       CreateCategory(userData)
       
      
       console.log(userData);
       Swal.fire({
        position: "top",
        icon: "success",
        title: " Category Create Succesfully",
        showConfirmButton: false,
        timer: 1500
      });
        
      } 

      const {data}=useGetAllCategoryQuery(undefined)
         console.log("data",data);
         const [DeleteCategory]=useDeleteCategoryMutation()
         const handleDelete=(id:any)=>{
            console.log(id);
            
            DeleteCategory({id})
            Swal.fire({
                position: "top",
                icon: "success",
                title: " Delete Succesfully",
                showConfirmButton: false,
                timer: 1500
              });
         }











      if (isSuccess) {
        Swal.fire({
            position: "top",
            icon: "success",
            title: " Category Create Succesfully",
            showConfirmButton: false,
            timer: 1500
          });
       }
    
    //   if (isLoading) {
    //     return <Spinner />
    //   }
    return (
        <div>
            <h1 className='text-3xl text-center'>Create Course Category</h1>
             <div className="w-full flex flex-col gap-4">
      
        <div  className="flex w-full flex-col  md:flex-nowrap mb-6 md:mb-0 gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className='m-2'>
        <Input {...register("name")} isRequired name="name" type="text" variant='bordered' id="name" label="Course Name" className="mb-3"  />
          <Input  id="description" {...register("description")} type="text" isRequired variant='bordered' label="Course description" name="description"  />

          <Button className="mt-3" color="primary"  variant="shadow" type="submit">Submit</Button>
        </form>
        </div>
           <h1 className="text-3xl text-center">All Category Course</h1>
         <div className="grid grid-cols-1 lg:grid-cols-3">
            {
                data?.map((category:categoryI)=> 
                <Card key={category.id} className="max-w-[400px] m-4">
               <Link href={`/admin/create-category/${category.id}`}>
               <CardHeader className="flex gap-3">
               
               <div className="flex flex-col">
                 <p className="text-medium">Category ID: {category.id}</p>
                 <p className="text-medium text-default-500">Category Name: {category.name}</p>
                 <p className="text-medium text-default-500">Description: {category.description}</p>
               
               </div>
             </CardHeader>
               </Link>
                <Divider/>
                <CardBody>
                  
              <Button onClick={()=>handleDelete(category.id)} color="danger" variant="shadow"  >Delete</Button>
          
             
               <EditCategory id={category.id}/>
                </CardBody>
                <Divider/>
                
              </Card>


            
              
              
              )


            }
         </div>
    </div>  

    
  
        </div>
    );
};

export default CategoryPage;