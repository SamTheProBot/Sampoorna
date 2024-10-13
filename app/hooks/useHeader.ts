import { getDataSecure } from "./storage";
import { useEffect, useState } from "react";

export function useHeader () {
    const [header, setHeader] =  useState<any>(null);

    useEffect(() => {
        const getAccessToken = async () => {
           const token = await getDataSecure('access_token');
            if(token){
                setHeader({
                    Authorization: `Bearer ${token}`
                })
            }
        };
        getAccessToken();
      }, []);
      
    return  header;
}

