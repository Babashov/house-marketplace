import { useState,useEffect } from "react"
import { getAuth,onAuthStateChanged } from "firebase/auth"

const useAuthStatus = () => {

  const [loggedIn,setLoggedIn] = useState(false)
  const [checkingStatus,setChekingStatus] = useState(true)
  
  useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth,(user)=>{
        if(user)
        {
            setLoggedIn(true)
        }
        setChekingStatus(false)
    })
  })

  return {loggedIn,checkingStatus}
}

export default useAuthStatus