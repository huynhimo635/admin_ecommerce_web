import React, { useEffect } from "react"
import PropTypes from "prop-types"

const DropdownField = props => {
  const handleChange = e => {
    if (props.onChange) props.onChange(e.target.value)
  }

  useEffect(() => {
    if (props.isRequired) props.onChange("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="form-group">
      <div className="form-title">
        <label>{props.label}</label>
        {props.isRequired ? <span>*</span> : ""}
      </div>
      <select
        className="form-control"
        onChange={e => handleChange(e)}
        id="dropdown"
      >
        {props.defaultValue ? (
          <option defaultValue={props.defaultValue._id}>
            {props.defaultValue.name}
          </option>
        ) : null}

        {props.placeHolder && !props.defaultValue ? (
          <option value="" selected disabled>
            {props.placeHolder}
          </option>
        ) : null}

        {props.data.map((item, index) =>
          props.renderData ? (
            props.defaultValue && props.defaultValue._id === item._id ? (
              ""
            ) : (
              props.renderData(item, index)
            )
          ) : (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          )
        )}
      </select>
      <span></span>
    </div>
  )
}

DropdownField.propTypes = {
  label: PropTypes.string,
  data: PropTypes.array.isRequired,
  renderData: PropTypes.func,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool
}

export default DropdownField
