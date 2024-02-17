'use client'

import Loading from "@/components/ui/Loading";
import { useGetSingleCategoryQuery } from "@/redux/user/userEndPoint";
import {Card, CardHeader, CardBody, Image, Button, Divider,Input} from "@nextui-org/react";
interface IParams{
    id:string
}
const SingleCourse: React.FC<{ params: IParams }> = ({params}) => {
    console.log(params.id);
    const id=params.id
    const {data:SingleData, isLoading}=useGetSingleCategoryQuery({id})
console.log(SingleData);


    if (isLoading) {
        return <Loading/>
    }
    return (
        <>
         <h1 className="text-center text-3xl">Retrieve Category</h1>
        <div className="justify-center mx-auto grid grid-cols-1 lg:grid-cols-2">
           
            {/* <h1>single: {params.id}</h1> */}
            <Card  className="max-w-[400px] m-4">
               
               <CardHeader className="flex gap-3">
               
               <div className="flex flex-col">
                 <p className="text-medium">Category ID: {SingleData?.id}</p>
                 <p className="text-medium text-default-500">Category Name: {SingleData?.name}</p>
                 <p className="text-medium text-default-500">Description: {SingleData?.description}</p>
               
               </div>
             </CardHeader>
              
                <Divider/>
                <CardBody>
                  
              
                </CardBody>
                <Divider/>
                
              </Card>
           
        </div>
        </>
    );
};

export default SingleCourse;