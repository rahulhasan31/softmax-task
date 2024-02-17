'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import React, { useState } from 'react';
import {Input} from "@nextui-org/react";
import { useCreateUserMutation, useLoginUserMutation } from "@/redux/user/userEndPoint";
import { EyeSlashFilledIcon } from "@/components/ui/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/ui/EyeFilledIcon";
import { getUserInfo, isLoggedIn, isSignUp, isUser, storeCookies, storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
type Inputs = {
    name: string
    number: string
    password:string,
    password2:string
}
type InputsLogin = {
   
    number: string
    password:string,
   
}

const SingUpPage = () => {
    const [createUser,{isSuccess}]=useCreateUserMutation()
    const [loginUser,]=useLoginUserMutation()
    const [passError, setPassError]=useState('')
    const [isLogin, setisLogin]=useState<boolean>(false)
    console.log(passError);
    const [isVisible, setIsVisible] = useState(false);
   console.log( isSignUp());
    const router=useRouter()
    const toggleVisibility = () => setIsVisible(!isVisible);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = async(data:any) =>{        
        try{
              if (data.password !== data.password2) {
                setPassError('Passwords do not match');
    } else {
      setPassError('');
      console.log(data);
          
      const userData={
        mobile_number: data.number,
        name:data.name, 
        password:data.password,
        password2:data.password2
       }
       console.log(userData);
       const res= await createUser(userData).unwrap()
             if (res?.user) {
              setisLogin(true)
             }
           console.log(res);
           storeUserInfo({access:res?.token?.access})
      console.log('Passwords match:', data.password);
    }
         
           
          
           
        }
        catch(err){
          // setError(err?.data?.errors)
         console.error(err);
         
        }
        
      } 
      const onLoginSubmit: SubmitHandler<InputsLogin> = async(data:any) =>{        
        try{
            
      console.log(data);
          
      const userData={
        mobile_number: data.number,
        password:data.password,
       
       }
       console.log(userData);
       const res= await loginUser(userData).unwrap()
             if (res?.user) {
              router.push('/profile')
             }
           console.log(res);
           storeUserInfo({access:res?.token?.access})
           storeCookies({access:res?.token?.refresh})
          //  const userObj = JSON.stringify(res.user);
          //  isUser({user:userObj})
      
      console.log("resuser",res.user)
      

         
           
          
           
        }
        catch(err){
          // setError(err?.data?.errors)
         console.error(err);
         
        }
        
      } 
    const isSingUpcondition=isSignUp()
     useEffect(()=>{
      if (isSingUpcondition) {
        setisLogin(true)
      }
     },[isSingUpcondition])
    return (
        <div className="relative ">
        <Image
            alt="Description" width={500} height={500}
            src="https://www.connectionsacademy.com/content/dam/pvs/ca/resource-hub/headers/Header--how-virtual-and-hybrid-schools-track-attendance.jpg"
          className="absolute inset-0 object-cover w-full h-full"
         
        />
        <div className="relative bg-gray-900 bg-opacity-75 ">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                শেখার নতুন জগতে স্বাগতম <br className="hidden md:block" />
                Softmax Online School
                  <span className="text-teal-accent-400"></span>
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                স্বপ্ন দেখি সুখী, সমৃদ্ধ, বেকারমুক্ত, প্রগতিশীল এক বাংলাদেশ গড়ার।
                </p>
             
              </div>
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">

                {
                  isLogin?<>
                   <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                   Login Now
                  </h3>
                  <form 
                  
                   
                    onSubmit={handleSubmit(onLoginSubmit)}>
                 
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="numberd"
                        className="inline-block mb-1 font-medium"
                      >
                        Numberd
                      </label>
                      <input
                      {...register("number")}
                        placeholder="number"
                        required
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="number"
                        name="number"
                      />
                    </div>
                
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="passsword"
                        className="inline-block mb-1 font-medium"
                      >
                        passsword
                      </label>
                      <Input
      {...register('password')}
      placeholder="password"
      isRequired
      type={isVisible ? 'text' : 'password'} // Define type conditionally based on isVisible state
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      id="password"
      name="password"
    />
                    </div>
               
                  
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-400 "
                      >
                        Submit
                      </button>
                    </div>
                  
                  </form>

      
                </div>
                  </>:<>
                   <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                   Student Sign up 
                  </h3>
                  <form 
                  
                   
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="firstName"
                        className="inline-block mb-1 font-medium"
                      >
                        First name
                      </label>
                      <input
                      {...register("name")}
                        placeholder="John"
                        required
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="firstName"
                        name="name"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="numberd"
                        className="inline-block mb-1 font-medium"
                      >
                        Numberd
                      </label>
                      <input
                      {...register("number")}
                        placeholder="number"
                        required
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="number"
                        name="number"
                      />
                    </div>
                
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="passsword"
                        className="inline-block mb-1 font-medium"
                      >
                        passsword
                      </label>
                      <Input
      {...register('password')}
      placeholder="password"
      isRequired
      type={isVisible ? 'text' : 'password'} // Define type conditionally based on isVisible state
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      id="password"
      name="password"
    />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="passsword"
                        className="inline-block mb-1 font-medium"
                      >
                       Confirm Passsword
                      </label>
                      <Input
      {...register('password2')}
      placeholder="Confirm password"
      isRequired
      type={isVisible ? 'text' : 'password'} // Define type conditionally based on isVisible state
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      id="password"
      name="password2"
    />
                      <p className="text-red-500">{passError}</p>
                    </div>
                    <h1>You have a Accout <Link className="text-blue-400"  href={'/login'} color="primary" >Login</Link></h1>
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-400 "
                      >
                        Submit
                      </button>
                    </div>
                  
                  </form>

           
                </div>
                  </>
                }
               
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SingUpPage;