'use client'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { useEditCategoryMutation, useGetSingleCategoryQuery } from '@/redux/user/userEndPoint';
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

type Inputs = {
    name: string
    description: string
    
}
const EditCategory = (id:any) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
    // console.log(id);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {data:SingleData}=useGetSingleCategoryQuery(id)
    // console.log("single DATA", data);
   const [EditCategory,{isSuccess}]=useEditCategoryMutation()
      const onSubmit: SubmitHandler<Inputs> = async(data:any) =>{        
       
 const name=SingleData?.name
 const description=data.description
 

 
      const option={  
                id:SingleData?.id,
                data:{
                    id,
                    name,
                    description
                }
       }
     console.log("categoryData", option);
     EditCategory(option)
        

     Swal.fire({
        position: "top",
        icon: "success",
        title: "Edit Success",
        showConfirmButton: false,
        timer: 1500
      });
      } 

     
       
    return (
        <>
        <Button color="warning" variant="shadow"  
           className="text-white mt-2" onPress={onOpen} >Edit</Button>
  <Modal 
    isOpen={isOpen} 
    onOpenChange={onOpenChange}
    placement="top-center"
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Edit Course Category</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>


          <ModalBody>
            <Input
            {...register("name")}
              autoFocus
              isReadOnly
              defaultValue={`${SingleData?.name}`}
              label="Name"
              name="description"
              placeholder="Enter your Name"
              variant="bordered"
            />
            <Input
            {...register("description")}
              defaultValue={`${SingleData?.description}`}
              label="description"
              placeholder="Enter your description"
              type="text"
              name="description"
              variant="bordered"
            />
           
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button type="submit" onPress={onClose} color="primary" variant="shadow" >
              Submit
            </Button>
          </ModalFooter>
          </form>
        </>
      )}
    </ModalContent>
  </Modal>
</>
    );
};

export default EditCategory;