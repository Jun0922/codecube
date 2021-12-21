import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import styled from 'styled-components'
// import './beforeLogin.css'
import Signup from './signup'
import SnsLogin from './components/snslogin'
import profileDummy from '../../dummy/userinfo/profileDummy'
import './beforeLogin.css'

const Login = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value })
  }

  const handleSignup = () => {
    props.setIsSignup(true)
    navigate('/')
  }

  const handleLogin = async () => {
    // TODO : 서버에 로그인을 요청하고, props로 전달된 callback을 호출합니다.
    // TODO : 이메일 및 비밀번호를 입력하지 않았을 경우 에러를 표시해야 합니다.
    const { email, password } = loginInfo
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요')
    } else {
      await axios
        .post('http://localhost:4000/login', loginInfo)
        .then((res) => {
          props.isAuthenticated()
        })
        .catch((err) => {
          alert('사용자정보가 없습니다와아???.', err)
        })
    }
  }

  return (
    <div className="loginA">
      <div className="lo01A th50A login01A">
        <div className="zh20A codecubelogoA">
          <img className="codeimageA" src="./dummy/codecubelogo.png" alt="codecubelog" />
        </div>
        <div className="zh80A">
          <form className="loginformA" action="" onSubmit={(e) => e.preventDefault()}>
            <input
              className="inputA"
              type="email"
              placeholder="email"
              onChange={handleInputValue('email')}
            ></input>
            <input
              className="inputA"
              type="password"
              placeholder="password"
              onChange={handleInputValue('password')}
            ></input>
            <input
              className="inputA"
              type="submit"
              value="login"
              onClick={handleLogin}
            ></input>
            <div className="alert-boxA">{errorMessage}</div>
          </form>
        </div>
      </div>
      <div className="lo02A th50A login02A">
        <div className="zh40A snslogolistA">
          <a href="https://www.google.com">
            <img className="snslogoA zw10A" src="" alt="github" />
          </a>
        </div>
        <div className="zh40A">소셜로그인</div>
        {/* <Link to="/signup"> */}

        <input
          className="inputA zh20A signupA "
          type="button"
          value="signup"
          onClick={handleSignup}
        ></input>

        {/* </Link> */}
      </div>
    </div>
  )
}

export default Login
