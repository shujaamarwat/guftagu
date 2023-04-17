import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { FormInput, GoogleButton, TopTitle } from "../../Shared";
import { auth, registerWithEmailAndPassword } from "../../../config/firebase";

const LoginButton = () =>{
  return(
    <div className="text-sm mt-3">
      Already have an account? <Link to="/login">Login</Link> now.
    </div>
  )
}

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  const register = (e) => {
    e.preventDefault()
    if (!name && !email && !password){
      alert("A value input is missing")
    }
    else{
      registerWithEmailAndPassword(name, email, password)
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/",{ state: {
        email: email,
      }}
    )
  }
  }, [user, loading, name, email, password, navigate])

  return (
    <div className="flex h-screen items-center text-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
        <TopTitle title="Please Register Account"/>
        <FormInput type="text" value={name} setFunction={setName} placeholder="Full Name" label="Name"/>
        <FormInput type="email" value={email} setFunction={setEmail} placeholder="name@example.com" label="Email Address"/>
        <FormInput type="password" value={password} setFunction={setPassword} placeholder="Password" label="Password"/>
        <button className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md" onClick={(e) => register(e)}>
          Register
        </button>
        <GoogleButton/>
        <LoginButton/>
      </div>
    </div>
  )
}

export default Register;
