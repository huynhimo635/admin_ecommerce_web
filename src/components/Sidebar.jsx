import React from "react"
import { Link } from "react-router-dom"

import logo from "../assets/images/logo.png"

import sidebar_items from "../assets/JsonData/sidebar_routes.json"

const SidebarItem = props => {
  const active = props.active ? "active" : ""

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item__content ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  )
}

const Sidebar = props => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="" />
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            icon={item.icon}
            title={item.display_name}
            active={item.route === props.location.pathname}
          />
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
