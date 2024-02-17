'use client'
import { useTeacherJoinMutation } from "@/redux/user/userEndPoint";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
type Inputs = {
    fullName:string,
    email: string,
    phone_number:string
    
}
const TeacherJoining = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()   
      const [TeacherJoin,]=useTeacherJoinMutation()  
    const onSubmit: SubmitHandler<Inputs> = async(data:any) =>{        
        const teacherJoining={
            fullName:data.fullName,
            email: data.email,
            phone_number:data.phone_number
          
         }


         console.log("teacherJoining",teacherJoining);
         TeacherJoin(teacherJoining)
        //  console.log("CreateCourse", CreateCourseData);
        
        Swal.fire({
            title: "Your Joining Request Sent !",
            text: "You clicked the button!",
            icon: "success"
          });
        } 

    return (
        <div>
            <>
      <Button onPress={onOpen} color="primary" variant="shadow" className="text-white">Teacher Joining</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> Teacher Joining Request</ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>

              <ModalBody>
                <Input
                  autoFocus
                  {...register('fullName')}
                  label="fullName"
                  placeholder="Enter your fullName"
                  variant="bordered"
                  name="fullName"
                />
                <Input
                  {...register('email')}
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  name="email"
                />
                <Input
                  {...register('phone_number')}
                  label="phone number"
                  placeholder="Enter your phone number"
                  type="text"
                  variant="bordered"
                  name="phone_number"
                />
               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="shadow" className="text-white" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary" variant="shadow" className="text-white" >
                  Join
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
        </div>
    );
};

export default TeacherJoining;