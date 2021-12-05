import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import validatorsData from "../../utils/validator"

const InputField = props => {
  const initialError =
    props.validator && props.validator.includes("required")
      ? [true, ""]
      : [false, ""]

  const [error, setError] = useState(initialError)

  const handleValidators = validator => {
    if (props.validator && props.validator.length > 0)
      for (let i = 0; i < props.validator.length; i++) {
        const checkValidator = validatorsData[props.validator[i]](validator) //Ex: validatorsData.required(validator)
        if (checkValidator[0] === true) {
          setError(checkValidator)
          break
        } else setError([false, ""])
      }
  }

  const handleOnChange = e => {
    if (props.validator) {
      handleValidators(e.target.value)
    }
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  useEffect(() => {
    if (props.validator && props.validator.length > 0) {
      props.error(props.label, error[0])
    }
  }, [error, setError])

  return (
    <div className="form-group">
      <div className="form-title">
        {props.label && <label>{props.label}</label>}
        {initialError[0] && <span>*</span>}
      </div>
      {props.type === "textarea" ? (
        <textarea
          onChange={e => handleOnChange(e)}
          placeholder={props.placeHolder || ""}
          value={props.value || ""}
          className="form-control"
          rows="14"
        ></textarea>
      ) : (
        <input
          type={props.type}
          className="form-control"
          placeholder={props.placeHolder || null}
          onChange={e => handleOnChange(e)}
          value={props.value || ""}
        />
      )}
      <span>{error && error[1]}</span>
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  validator: PropTypes.array,
  error: PropTypes.func
}

export default InputField
