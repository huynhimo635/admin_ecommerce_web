import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import logo from "../assets/images/logo.png"

import InputField from "../components/form/InputField"

import userApi from "../api/userApi"

import { useDispatch } from "react-redux"
import { unwrapResult } from "@reduxjs/toolkit"
import { getMe } from "../redux/users/getMeSlice"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await userApi.login(email, password)
      if (response && response.token) {
        localStorage.setItem("token", response.token)
        const res = await dispatch(getMe(email))
        const profile = unwrapResult(res)

        if (profile.isAdmin) {
          history.push("/")
        } else {
          setError("You are not allowed to access here")
          localStorage.setItem("token", "")
        }
      }
    } catch (er) {
      if (er.response !== undefined) {
        if (er.response.status === 400)
          setError("Email or Password is incorrect!! Please try again")
      }
    }
  }

  return (
    <div className="login row">
      <div className="col-5">
        <div className="login-form-contain">
          <div className="login__info">
            <img src={logo} alt="" />
            <br />
            <span>
              "Buy a bicycle or buy happiness, both are the same things"
            </span>
          </div>
          <form className="form login__form" action="/">
            <InputField
              className="login__form__email"
              type="email"
              label="email"
              onChange={value => setEmail(value)}
              value={email}
            />
            <InputField
              className="login__form__password"
              type="password"
              label="password"
              onChange={value => setPassword(value)}
              value={password}
            />
            <button
              className="login__form__submit"
              onClick={e => handleSubmit(e)}
              autoFocus
            >
              Login
            </button>
            <div className="error">{error && <span>{error}</span>}</div>
          </form>
          <div className="login-expand"></div>
        </div>
      </div>
      <div className="col-7">
        <div className="login__banner">{/* <img src={banner} alt="" /> */}</div>
      </div>
    </div>
  )
}

export default Login
