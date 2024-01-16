import { defineStore } from "pinia";


export const useUserStore =defineStore('user',()=>{
    const userID=ref()
    const userToken=useCookie('COOKIE_FROM_RECIPEAPP',{
        
    maxAge:60*60*24*7
    })

    const setToken=(data?:string)=>{
        userToken.value=data;
    }

    const setUser=(data?:number)=>{
        userID.value=data;
    }
    // const fetchUser=()=>{
    //     if(userToken){

    //     }
    // }

    const logout=()=>{
        setUser()
        setToken()
    }

    return{ userID,userToken, setUser,setToken,logout}

})