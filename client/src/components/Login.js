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

  const { push } = useHistory();

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload)
        push("/protected")
      })
      .catch(err => console.log(err))
    setCredentials({
      username: "",
      password: ""
    })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>

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
