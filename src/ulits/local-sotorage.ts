import Cookies from 'js-cookie';

export const setToLocalStored=(key:string, token:string)=>{
       if(!key||typeof window===undefined){
        return ""
       }
       return localStorage.setItem(key, token as string)
}
export const getLocalStored=(key:string): string | null=>{
       if(!key||typeof window===undefined){
        return ""
       }
     return localStorage.getItem(key)
}




export const setUserStore=(key:string, user:any)=>{
  if(!key||typeof window===undefined){
    return ""
   }
 return localStorage.setItem(key, user as any)
}
export const setCookiesToken=(key:string, token:string)=>{
  if(!key||typeof window===undefined){
    return ""
   }
 return Cookies.set(key, token as string)
}