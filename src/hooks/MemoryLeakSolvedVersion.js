import { useState,useEffect,useRef } from "react"
import { getAuth,onAuthStateChanged } from "firebase/auth"

const useAuthStatus = () => {

  const [loggedIn,setLoggedIn] = useState(false)
  const [checkingStatus,setChekingStatus] = useState(true)
  const isMounted = useRef(true)
  
  useEffect(()=>{
    if(isMounted)
    {
        const auth = getAuth()

        onAuthStateChanged(auth,(user)=>{
            if(user)
            {
                setLoggedIn(true)
            }
            setChekingStatus(false)
        })
    }

    return ()=>isMounted.current = false
    
  },[isMounted])

  return {loggedIn,checkingStatus}
}

export default useAuthStatus