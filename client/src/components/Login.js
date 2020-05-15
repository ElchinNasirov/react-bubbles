import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("http://localhost:5000/api/login")
      .then(res => {
        localStorage.setItem("token", res.data.patload)
        useHistory.push("/protected")
      })
      .catch(err => {
        console.log("Err is ", err)
      })
    setCredentials({
      username: "",
      password: ""
    })
  }



  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

      <form onSubmit={handleSubmit}>

        <label> USERNAME: </label>
        <input
          required
          type="text"
          name="username"
          placeholder="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <label> PASSWORD: </label>
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleChange}
        />

        <button> LOG IN </button>

      </form>
    </>
  );
};

export default Login;
