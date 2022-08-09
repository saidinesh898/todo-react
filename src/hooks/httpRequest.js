import { useState, useCallback } from "react"


const useHttp = (applyData)  => {

    const [isLoading, setIsLoading] = useState('false')
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async(requestConfig) => {
        setIsLoading(true)
       
        try {
        const response = await fetch(requestConfig.url,{
            method : requestConfig.method ?  requestConfig.method : 'GET',
            headers : requestConfig.headers ? requestConfig.headers : {},
            body : requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            
        })
        if (response.status >= 500) {
            throw new Error('Request failed!');
          }

          let data 

          try{
             data = await response?.json();
          }catch(e){
                data = {}
          }
            
           
        applyData(data, response.status)

 
    }
    catch(e){
        setError(e)
    }
    setIsLoading(false)
    }, [applyData])

    return {
        isLoading,
        error,
        sendRequest, 
    }
}

export default useHttp  