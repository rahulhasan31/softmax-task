
import { decodedToken } from "@/ulits/jwt"
import { getLocalStored, setCookiesToken, setToLocalStored, setUserStore } from "@/ulits/local-sotorage"
import dayjs from "dayjs";

import Cookies from "js-cookie";

export const storeUserInfo=({access}:{access:string})=>{
   return setToLocalStored("access",access)
}
export const storeCookies=({access}:{access:string})=>{
   return setCookiesToken("access",access)
}

export const getUserInfo=()=>{
    const authToken=getLocalStored("access")
    // console.log(authToken);
    if(authToken){
        const decoded:any=decodedToken(authToken)
        
    const iseExp=dayjs.unix(decoded.exp).diff(dayjs())<1
    console.log("iseExp", iseExp);
      
      
    if (iseExp) {
        const refresh=Cookies.get('access')
      console.log("refresh",refresh);
       if (refresh) {
        fetch("https://softmaxshop.com/user/refresh-token/",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({refresh})
        })
        .then(res=>{
            // console.log("res data",res);
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Failed to refresh token');
            }
        })
        .then(data=>{
            console.log("data", data);
            const newAccesToken=data.access
            setToLocalStored('access',newAccesToken )
            
        })
       }
    }
        return decoded
    }
    else{
        return ""
    }
  
    

    
}

export const isSignUp=()=>{
    const authToken=getLocalStored("access")
    return !!authToken
}
export const isLoggedIn=()=>{
    const authToken=getLocalStored("access")
    return !!authToken
}



export const isUser=({user}:{user:any})=>{
   return setUserStore("user", user)
}

// export const isgetUserRole=()=>{
//     const getUserRole=getUserStoredRole('user')
//     if (getUserRole) {
//         const storedObject = JSON.parse(getUserRole);
//         return storedObject
//     }
    
// }

