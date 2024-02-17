import Cookies from 'js-cookie';

export const setToLocalStored=(key:string, token:string)=>{
       if(!key||typeof window===undefined){
        return null
       }
       return localStorage.setItem(key, token as string)
}
export const getLocalStored = (key: string): string | null => {
  if (!key || typeof window === 'undefined') {
    return null; // or handle this case appropriately
  }
  return localStorage.getItem(key);
};



export const setUserStore=(key:string, user:any)=>{
  if(!key||typeof window===undefined){
    return null
   }
 return localStorage.setItem(key, user as any)
}
export const setCookiesToken=(key:string, token:string)=>{
  if(!key||typeof window===undefined){
    return null
   }
 return Cookies.set(key, token as string)
}