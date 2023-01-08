import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
import {toast} from "react-toastify"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"


function SignIn() {

    const [showPassword,setShowPassword] = useState(false)
    const [formData,setFormData] = useState({
      email:'',
      password:''
    })
    const {email,password} = formData
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
        const userCredential = await signInWithEmailAndPassword(auth,email,password);

        if(userCredential.user)
        {
          navigate('/')
        }

      } catch (error) {
        toast.error('Bad user credential')
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
              <div className="signInBar">
                <p className="signInText">Sign In</p>
                <button className="signInButton">
                  <ArrowRightIcon fill="#ffffff" width="34px" height="34px"/>
                </button>
              </div>
            </form>

            {/* Google OAuth */}

            <Link to="/sign-up" className="registerLink">Sign Up</Link>

          </main>
        </div>

      </>
    )
  }
  
  export default SignIn