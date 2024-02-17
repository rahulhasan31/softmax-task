import { getLocalStored } from "@/ulits/local-sotorage";

import axios from "axios";
import { jwtDecode } from "jwt-decode"
import dayjs from "dayjs";



  const  baseURL ='https://softmaxshop.com/user/refresh-token/'

  const authToken=getLocalStored('access') as string
   console.log("authToken", authToken);
   




  const AxiosInstance = axios.create({
    baseURL,
    timeout: 1000,
    headers: { Authorization:`Bearer ${authToken?.access}`}
  });

  AxiosInstance.interceptors.request.use(async req=>{
    let authToken: string | null = null;
const storedAuthToken = localStorage.getItem('access');

if (storedAuthToken !== null) {
  authToken = JSON.parse(storedAuthToken) as string;
}

if(!authToken){
    req.headers.Authorization=`Bearer ${authToken?.access}`
}


return req
  })

  export default AxiosInstance