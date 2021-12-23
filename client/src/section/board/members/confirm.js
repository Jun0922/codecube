import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'

import './confirm.css'
import axios from 'axios'
import { localhost } from '../hardWord'
axios.defaults.withCredentials = true
const ConfirmUsers = ({ projectId }) => {
  const [confirmUsers, setConfirmUsers] = useState([])

  useEffect(() => {
    axios.get(`${localhost}/members/${projectId}`, {
      withCredentials: true
    }).then(({ data }) => {
      setConfirmUsers(data.confirmed)
    })
  }, [projectId])

  return (
    <div className="confirm-wrapper">
      {confirmUsers.map((user) => {
        return (
          <div key={v4()} className="user-wrapper">
            {/* <img className="user-profile" src={user.img}></img> */}
            <div className="user-profile">{user.image}</div>
            <div>{user.username}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ConfirmUsers
