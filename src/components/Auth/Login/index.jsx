import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FormInput, GoogleButton, TopTitle } from "../../Shared";

const RememberMe = () =>{
  return(
    <div className="mb-3">
      <label className="flex items-center">
        <input type="checkbox" className="form-checkbox mr-2" value="remember-me"/>
        <span className="text-sm">Remember me</span>
      </label>
    </div>
  )
}

const ForgotPassword = () =>{
  return(
    <div>
      <Link to="/reset" className="text-sm text-gray-500 hover:text-gray-700">Forgot Password</Link>
    </div>
  )
}

const RegisterButton = () => {
  return(
    <div className="text-sm mt-3">
      Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link> now.
    </div>
  )
}
const Spinner = () =>{
  return(
    <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only">Loading...</span>
    </div>
  )
}
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      // console.log('here')
      return;
    }
    if (user) {
      navigate("/",{ state: {
          email: email,
        }}
      )
    }
  }, [user, loading, email, password, navigate])

  return (
    <div className="flex h-screen items-center text-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
          <TopTitle title="Please Sign In"/>
          <FormInput type="email" value={email} setFunction={setEmail} placeholder="name@example.com" label="Email Address"/>
          <FormInput type="password" value={password} setFunction={setPassword} placeholder="Password" label="Password"/>
          <RememberMe/>
          <button className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md" onClick={() => logInWithEmailAndPassword(email, password)}>
            Sign in
          </button>
          {loading ? <Spinner/> : ""}
          <GoogleButton/>
          <ForgotPassword/>
          <RegisterButton/>
      </div>
    </div>
  )
}

export default Login;
