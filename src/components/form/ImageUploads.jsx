import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"

import validatorData from "../../utils/validator"

const ImageUploads = props => {
  const inputRef = useRef(null)
  const imageRef = useRef(null)

  const initialError = props.isRequired ? [true, ""] : [false, ""]
  const initialImage =
    require("../../assets/images/no-image-800x600.png").default

  const [image, setImage] = useState(null)
  const [error, setError] = useState(initialError)
  const [hasImage, setHasImage] = useState("")
  const [imageList, setImageList] = useState([])

  const handleOnChange = () => {
    if (inputRef.current.files[0] !== undefined) {
      if (
        validatorData.image(
          inputRef.current.files,
          props.number ? props.number : 1
        )[0]
      ) {
        setError(
          validatorData.image(
            inputRef.current.files,
            props.number ? props.number : 1
          )
        )
        setImage(initialImage)
        setHasImage("")
      } else {
        if (props.number) {
          setImageList(inputRef.current.files)
          props.onChange(inputRef.current.files)
          props.error(error[0])
        } else {
          setImage(inputRef.current.files[0])
          props.onChange(inputRef.current.files[0])
          props.error(error[0])
        }

        setError([false, ""])
        setHasImage("active")
      }
      props.error(error[0])
    }
  }

  const handleOnDel = () => {
    setHasImage("")
    setImageList([])
    setImage(null)
  }

  useEffect(() => {
    if (props.isRequired === true) {
      props.error(error[1])
    }
  }, [error])

  return (
    <div className="form-group image-input">
      <div className="form-title">
        <label>{props.title}</label>
        <span>{props.isRequired ? "*" : ""}</span>
      </div>
      <div className="image-preview">
        {!hasImage ? (
          <div className="image-preview__item">
            <img src={initialImage} alt="" />
          </div>
        ) : (
          <div>
            {!props.number ? (
              <div className="image-preview__item">
                <img src={URL.createObjectURL(image)} alt="" />
              </div>
            ) : (
              <div className="image-preview__multiple">
                {[...imageList].map((item, index) => {
                  return (
                    <div className={`col-${12 / imageList.length}`} key={index}>
                      <div className="image-preview__multiple__item">
                        <div className="image-preview__item">
                          <img src={URL.createObjectURL(item)} alt="" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="form-control image-control" ref={imageRef}>
        <input
          ref={inputRef}
          type="file"
          onChange={() => handleOnChange()}
          accept="image/png, image/gif, image/jpeg"
          multiple={props.number ? true : false}
          className="image-input"
          enctype="multipart/form-data"
          id={props.title.replace(" ", "-")}
        />
        <label
          htmlFor={props.title.replace(" ", "-")}
          className="image-input__btn"
        >
          Choose File
        </label>
        {imageList.length > 0 || image !== null
          ? [...inputRef.current.files].map((item, index) => (
              <span
                key={index}
                className={`${hasImage}`}
                style={{ color: "black" }}
              >
                {item.name}
              </span>
            ))
          : ""}

        <label
          className={`image-input__btn del ${hasImage}`}
          style={{ background: "red" }}
          onClick={() => handleOnDel()}
        >
          Remove Image
        </label>
      </div>
      <span>{error && error[1]}</span>
    </div>
  )
}

ImageUploads.propTypes = {
  title: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  number: PropTypes.number,
  error: PropTypes.func
}

export default ImageUploads
