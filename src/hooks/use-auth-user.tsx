'use client'
import {
    fetchAuthSession,fetchUserAttributes,getCurrentUser
} from "@aws-amplify/auth"
import { useEffect,useState } from "react"

export default function useAuthuser(){
    const [user,setUser] = useState<Record<string,any>>();

    useEffect(()=>{
        async function getUser(){
            const session = await fetchAuthSession();
            if(!session.tokens){
                return;
            }
            const user = {
                ...(await getCurrentUser()),
                ...(await fetchUserAttributes())
            }
            setUser(user)
        }
        getUser();
    },[])

    return user;
}