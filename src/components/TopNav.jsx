import React from "react"
import { Link, useHistory } from "react-router-dom"

import Dropdown, { DropdownItem, DropdownFooter } from "./Dropdown"

import user_menus from "../assets/JsonData/user_menus.json"

import userImg from "../assets/images/user.png"

// fake data
import notifications from "../assets/JsonData/notification.json"
const curr_user = {
  name: "Huynh Nguyen",
  image: userImg
}

const customUserToggle = user => (
  <div className="topnav-user">
    <div className="topnav-user__image">
      <img src={user.image} alt="" />
    </div>
    <div className="topnav-user__name">{user.name}</div>
  </div>
)

const TopNav = () => {
  const history = useHistory()

  const handleOnClickUser = type => {
    switch (type) {
      case "LOGOUT":
        localStorage.setItem("token", "")
        history.push("/login")
        break
      case "PROFILE":
        console.log(type)
        break
      case "SETTINGS":
        console.log(type)
        break
      default:
        console.log(type)
        break
    }
  }

  return (
    <div className="topnav">
      <div className="topnav__search">
        <input type="text" placeholder="Search here..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right__item">
          <Dropdown customToggle={() => customUserToggle(curr_user)}>
            {user_menus.map((item, index) => (
              <DropdownItem
                content={item.content}
                key={index}
                icon={item.icon}
                onClick={type => handleOnClickUser(type)}
                type={item.type}
              />
            ))}
          </Dropdown>
        </div>
        <div className="topnav__right__item">
          <Dropdown icon="bx bx-bell" badge="12">
            {notifications.map((item, index) => (
              <DropdownItem
                key={index}
                content={item.content}
                icon={item.icon}
              />
            ))}
            <DropdownFooter renderFooter={() => <Link to="/">View All</Link>} />
          </Dropdown>
        </div>
        <div className="topnav__right__item">
          <Dropdown />
          {/* Theme settings */}
        </div>
      </div>
    </div>
  )
}

export default TopNav
