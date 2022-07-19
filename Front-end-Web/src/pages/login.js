import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/context";

const Login = () => {
  const axios = require("axios");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { user } = useAuth();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/${email}`);

      const { data } = res;

      if (data.role === "Viewer") {
        setError("User have no Permission!");
        console.error("User have no Permission!");
        return;
      }

      const user = await signInWithEmailAndPassword(auth, email, password);

      console.log(user);
      history.replace("/Drugs");
    } catch (error) {
      console.log("Wrong Email or Password");
    }
  };

  return (
    <>
      <div className="mw-full flex justify-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
          <div className="mb-4">
            <h1 className="text-2xl text-blue-700 font-extrabold flex sm:mb-1 md:mb-2 l:mb-2">
              Sign In
            </h1>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Username"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              autoComplete="on"
              placeholder="******************"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <h1 className="text-red-500 font-light text-sm">{error}</h1>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
              to="/Drugs"
            >
              Sign In
            </button>
            {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </a> */}
          </div>
          {/* <h4> User Logged In: </h4>
            {user?.email} */}
        </form>
      </div>
    </>
  );
};
export default Login;
