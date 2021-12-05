import React from "react"

const ImagePreview = () => {
  return (
    <div className="image-wrapper">
      <img src={require("../assets/images/no-img.png").default} alt="" />
    </div>
  )
}

export default ImagePreview
