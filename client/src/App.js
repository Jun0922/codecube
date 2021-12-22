// export default App
import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import Board from './section/board/board'

import Mypage from './section/login_profile/mypage'
import Login from './section/login_profile/login'
import Signup from './section/login_profile/signup'
import GitContribution from './section/gitcontribution/gitContri'
import GitContributionUser from './section/gitcontribution/gitContriUser'
import NoticeBoard from './section/noticeboard/noticeBoard'
import axios from 'axios'

import GlobalFont from './styles/globalFont'
import GlobalStyle from './styles/globalStyle'

const savedUserInfo = window.localStorage.getItem('userinfo')

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(savedUserInfo ?? false)
  const [userinfo, setUserinfo] = useState(JSON.parse(savedUserInfo) ?? '')
  const [isSignup, setIsSignup] = useState(false)
  const [Token, setToken] = useState('')
  const navigate = useNavigate()
  console.log('로그인은 했냐', isLoggedIn ? 'ㅇㅇ' : 'ㄴㄴ')

  const isAuthenticated = async () => {
    // TODO: 이제 인증은 성공했습니다. 사용자 정보를 호출하고, 이에 성공하면 로그인 상태를 바꿉시다.
    console.log('로그인 요청은 성공함.')
    await axios.get('http://localhost:4000/users').then(({ data: { data } }) => {
      const userJSON = {
        id: data.id,
        username: data.username,
        email: data.email,
        description: data.description,
        stacks: data.stacks,
        image: data.image,
      }
      window.localStorage.setItem('userinfo', JSON.stringify(userJSON))
      setUserinfo(data)
      setisLoggedIn(true)
    })
  }

  const handleLogout = () => {
    axios.get('http://localhost:4000/logout').then((res) => {
      window.localStorage.removeItem('userinfo')
      setUserinfo('')
      setisLoggedIn(false)
      navigate('/')
      // window.location.replace('/')
    })
  }

  const handleEdit = () => {
    setUserinfo(null)
    setisLoggedIn(true)
    navigate('/')
  }

  const handleSignup = () => {
    setSignupButton(true)
    navigate('/')
  }

  return (
    <>
      <GlobalFont />
      <GlobalStyle />
      <div id="container">
        <div className="col w40">
          <div className="login">
            {isLoggedIn ? (
              <Mypage
                Token={Token}
                setToken={setToken}
                userinfo={userinfo}
                handleLogout={handleLogout}
                setUserinfo={setUserinfo}
                setisLoggedIn={setisLoggedIn}
                isLoggedIn={isLoggedIn}
                isAuthenticated={isAuthenticated}
                // handleEdit={handleEdit}
              />
            ) : isSignup ? (
              <Signup
                setUserinfo={setUserinfo}
                userinfo={userinfo}
                setIsSignup={setIsSignup}
                isAuthenticated={isAuthenticated}
              />
            ) : (
              <Login
                setToken={setToken}
                setisLoggedIn={setisLoggedIn}
                setUserinfo={setUserinfo}
                setIsSignup={setIsSignup}
                isAuthenticated={isAuthenticated}
              />
            )}
          </div>
          <div></div>
        </div>
        <div className="col w30">
          <div className="row github-wrapper main-box">
            {isLoggedIn ? <GitContributionUser /> : <GitContribution />}
          </div>
          <div className="row notice-wrapper main-box">
            <NoticeBoard />
          </div>
        </div>
        <div className="col w30">
          <Board isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </>
  )
}

export default App
