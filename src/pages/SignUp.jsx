import { useState } from "react"
import {getAuth,createUserWithEmailAndPassword,updateProfile} from "firebase/auth"
import { doc, setDoc,serverTimestamp } from "firebase/firestore"; 
import {db} from "../firebase.config"
import { Link, useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"


function SignUp() {

    const [showPassword,setShowPassword] = useState(false)
    const [formData,setFormData] = useState({
      name:'',
      email:'',
      password:''
    })

    const {name,email,password} = formData

    const onChange = (e)=>{

      setFormData(prevState=>({
          ...prevState,
          [e.target.id] : e.target.value
        }))
    }

    const navigate = useNavigate();

    const onSubmit = async (e)=>{
      e.preventDefault();
      
      try {
        
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth,email,password)
        const user = userCredential.user
        updateProfile(auth.currentUser,{
          displayName:name
        })
        
        const formDataCopy = {...formData}
        delete formDataCopy.password
        formDataCopy.timestamp = serverTimestamp()
        await setDoc(doc(db,"users",user.uid),formDataCopy)

        navigate('/')


      } catch (error) {
        toast.error('Bad User Credentials')
      }

    }

    return (
      <>
      
        <div className="pageContainer">
          <header>
            <p className="pageHeader">Welcome Back</p>
          </header>
          <main>
            <form onSubmit={onSubmit}>
            <input 
                className="nameInput"
                value={name}
                type="text" 
                name="name" 
                id="name"
                placeholder="Name"
                onChange={onChange}
              />
              <input 
                className="emailInput"
                value={email}
                type="email" 
                name="email" 
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
              <div className="passwordInputDiv">
                <input 
                  className="passwordInput"
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={onChange}
                />
                <img 
                  src={visibilityIcon} 
                  alt="show password" 
                  className="showPassword" 
                  onClick={()=>setShowPassword((prevState)=>!prevState)}
                />
              </div>
              <Link to="/forgot-password" className="forgotPasswordLink">
                Forgot Password
              </Link>
              <div className="signUpBar">
                <p className="signUpText">Sign Up</p>
                <button className="signUpButton">
                  <ArrowRightIcon fill="#ffffff" width="34px" height="34px"/>
                </button>
              </div>
            </form>

            {/* Google OAuth */}

            <Link to="/sign-in" className="registerLink">Sign In</Link>

          </main>
        </div>

      </>
    )
  }
  
  export default SignUp