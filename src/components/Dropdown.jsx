import React, { useRef } from "react"

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener("mousedown", e => {
    //user click toggle
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("active")
    } else {
      // user click outside toggle and content
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("active")
      }
    }
  })
}

const Dropdown = props => {
  const dropdown_content_el = useRef(null)
  const dropdown_toggle_el = useRef(null)

  clickOutsideRef(dropdown_content_el, dropdown_toggle_el)

  return (
    <div className="dropdown">
      <button ref={dropdown_toggle_el} className="dropdown__toggle">
        {props.icon ? <i className={props.icon}></i> : ""}

        {props.badge ? (
          <span className="dropdown__toggle__badge">{props.badge}</span>
        ) : (
          ""
        )}

        {props.customToggle ? props.customToggle() : ""}
      </button>
      <div ref={dropdown_content_el} className="dropdown__content">
        {props.children}
      </div>
    </div>
  )
}

export const DropdownItem = props => {
  const handleClick = () => {
    if (props.onClick && props.type) {
      props.onClick(props.type)
    }
  }
  return (
    <div className="notification-item" onClick={() => handleClick()}>
      {props.icon && <i className={props.icon}></i>}
      {props.content && <span>{props.content}</span>}
      {props.customRender ? props.customRender() : ""}
    </div>
  )
}

export const DropdownFooter = props => {
  return <div className="dropdown__footer">{props.renderFooter()}</div>
}

export default Dropdown
