import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../../client/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Alert,
  FormInput,
  GoogleButton,
  Spinner,
  TopTitle,
  compClasses,
} from "../../Shared";

const RememberMe = () => {
  return (
    <div className="mb-3">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="form-checkbox mr-2"
          value="remember-me"
        />
        <span className="text-sm">Remember me</span>
      </label>
    </div>
  );
};

const ForgotPassword = () => {
  return (
    <div>
      <Link to="/reset" className="text-sm text-gray-500 hover:text-gray-700">
        Forgot Password
      </Link>
    </div>
  );
};

const RegisterButton = () => {
  return (
    <div className="text-sm mt-3">
      Don't have an account?{" "}
      <Link to="/register" className="text-blue-500 hover:text-blue-700">
        Register{" "}
      </Link>
      now.
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [load, setLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/", {
        state: {
          email: email,
        },
      });
    }
  }, [user, loading, email, password, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    logInWithEmailAndPassword(email, password, rememberMe)
      .then(async (userCredential) => {
        navigate("/", {
          state: {
            email: email,
          },
        });
      })
      .catch((error) => {
        <Alert message={error} />;
        return;
      })
      .finally(() => {
        setLoading(false);
      });
  };



  return (
    <form
      onSubmit={handleLogin}
      className="flex h-screen items-center text-center"
    >
      <div className={compClasses.loginCard}>
        <TopTitle title="Please Sign In" />

        <FormInput
          type="email"
          value={email}
          setFunction={setEmail}
          placeholder="name@example.com"
          label="Email Address"
          autoComplete="email"
        />
        <FormInput
          type="password"
          value={password}
          setFunction={setPassword}
          placeholder="Password"
          label="Password"
          autoComplete="current-password"
        />
        <RememberMe onChange={setRememberMe} />
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md flex items-center justify-center"
          disabled={load}
        >
          {load ? "Loading... " : "Log In"}
        </button>
        {load && <Spinner />}

        <GoogleButton />
        <ForgotPassword />
        <RegisterButton />
      </div>
    </form>
  );
};

export default Login;
