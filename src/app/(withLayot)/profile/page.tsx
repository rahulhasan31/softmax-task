"use client"

import { useGetUserProfileQuery } from '@/redux/user/userEndPoint';
import { getUserInfo, } from '@/services/auth.service';
import React, { useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
const ProfilePage = () => {
  const user=getUserInfo() as any
  // console.log("user",user);
    
    const{data:UserData,isLoading}=useGetUserProfileQuery(user?.user_id)
    console.log("UserData",UserData);
    const [isFollowed, setIsFollowed] =useState(false);
    return (
        <div>
            <Card className="max-w-[340px] h-56 mx-auto justify-center">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src="https://i.ibb.co/ggtKkH8/download.jpg" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{UserData?.name}</h4>
            <h5 className="text-small tracking-tight text-default-400">{UserData?.mobile_number
}</h5>
            <h5 className="text-small tracking-tight text-default-400">Id: {UserData?.id}</h5>
            <h5 className="text-small tracking-tight text-default-400">Role: {UserData?.role}</h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
        Softmax Online School
ইঞ্জিনিয়ারিং স্কুল
        </p>
        <span className="pt-2">
          
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
        </div>
    );
};

export default ProfilePage;