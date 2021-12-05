import React, { useState, useEffect } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { useHistory } from "react-router-dom"

import InputField from "../components/form/InputField"
import DropdownField from "../components/form/DropdownField"
import ImageUploads from "../components/form/ImageUploads"

import { useSelector, useDispatch } from "react-redux"
import { getCate } from "../redux/categories/getCateSlice"
import { getAll } from "../redux/products/productSlice"
import productApi from "../api/productApi"
import { set, remove } from "../redux/loadingSlice"

const error = {}

const ProductsForm = props => {
  const history = useHistory()

  const [name, setName] = useState("")
  const [image, setImage] = useState(null)
  const [images, setImages] = useState(null)
  const [brand, setBrand] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState("")
  const [desc, setDesc] = useState("")
  const [richDesc, setRichDesc] = useState("")

  const [tempImage, setTempImage] = useState(null)

  const dispatch = useDispatch()
  const cateData = useSelector(state => state.getCate.data)
  const product = useSelector(state => state.product.data)

  // console.log(error)

  const fetchData = async () => {
    if (cateData.length === 0) await dispatch(getCate())
    if (product.length === 0) await dispatch(getAll())
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (props.match.params.id) {
      const itemUpd = product.find(item => item._id === props.match.params.id)
      if (itemUpd !== undefined) {
        setName(itemUpd.name)
        setBrand(itemUpd.brand)
        setPrice(itemUpd.price.toString())
        setStock(itemUpd.countInStock.toString())
        setDesc(itemUpd.description)
        setRichDesc(itemUpd.richDescription)
        setImage(itemUpd.image)
        setImages(itemUpd.images)
        setTempImage(itemUpd.images)
        setCategory(itemUpd.category._id)
        Object.keys(error).forEach(v => (error[v] = false))
      }
    }
  }, [product])

  const renderCate = (item, index) => (
    <option key={index} value={item._id}>
      {item.name}
    </option>
  )
  const handleCate = value => {
    if (value === "") error.category = true
    else {
      const item = cateData.find(item => item._id === value)
      setCategory(item._id)
      error.category = false
    }
  }

  const handleSubmit = async e => {
    console.log(error)
    e.preventDefault()
    const check = Object.values(error).indexOf(true) < 0
    if (check) {
      let data = new FormData()
      data.append("name", name)
      data.append("brand", brand)
      data.append("price", price)
      if (typeof image === "object") data.append("image", image, image.name)
      data.append("description", desc)
      data.append("richDescription", richDesc)
      data.append("category", category)
      data.append("countInStock", stock)

      let dataImages = new FormData()
      dataImages.append("name", name)
      dataImages.append("category", category)

      if (typeof images[0] === "object")
        for (const key of Object.keys(images)) {
          dataImages.append("images", images[key], images[key].name)
        }

      if (props.match.params.id) {
        dispatch(set())
        await productApi.update(props.match.params.id, data)
        if (typeof images[0] === "object")
          await productApi.updateImages(props.match.params.id, dataImages)
        dispatch(remove())
      } else {
        dispatch(set())
        try {
          const item = await productApi.add(data)
          console.log(item)
          if (item) {
            await productApi.updateImages(item._id, dataImages)
            alert("success")
          }
        } catch (error) {
          console.log(error)
        }
        dispatch(remove())
      }

      await dispatch(getAll())
      history.goBack()
    } else {
      alert("Your required fields are invalid. Please try check it again!!")
      return e.preventDefault()
    }
  }

  return (
    <>
      <h2 className="page-header">
        {props.match.params.id ? "Update Product" : "Add Product"}
      </h2>

      <form
        className="form row"
        enctype="multipart/form-data"
        method={props.match.params.id ? "PUT" : "POST"}
        // action={e => handleSubmit(e)}
      >
        {/* name field */}
        <div className="col-6">
          <InputField
            label="name"
            type="text"
            placeHolder="Enter product's name"
            onChange={value => {
              setName(value)
            }}
            value={name}
            error={(label, er) => (error[label] = er)}
            validator={["required"]}
          />
        </div>
        {/* price field */}
        <div className="col-6">
          <InputField
            label="Price"
            type="text"
            placeHolder="Enter product's price"
            onChange={value => {
              setPrice(value)
            }}
            value={price}
            error={(label, er) => (error[label] = er)}
            validator={["required", "number"]}
          />
        </div>
        {/* brand field */}
        <div className="col-4">
          <InputField
            label="brand"
            type="text"
            placeHolder="Enter brand's name"
            onChange={value => {
              setBrand(value)
            }}
            value={brand}
            error={(label, er) => (error[label] = er)}
            validator={["required"]}
          />
        </div>
        {/* category field */}
        <div className="col-4">
          <DropdownField
            label="Category"
            data={cateData}
            renderData={(item, index) => renderCate(item, index)}
            placeHolder="Select category option"
            onChange={value => handleCate(value)}
            isRequired={true}
            defaultValue={category !== "" ? category : null}
          />
        </div>
        {/* countInStock field */}
        <div className="col-4">
          <InputField
            label="Quantity"
            type="text"
            placeHolder="Quantity in stock"
            onChange={value => {
              setStock(value)
            }}
            value={stock}
            error={(label, er) => (error[label] = er)}
            validator={["required", "number"]}
          />
        </div>
        {/* Avatar Image */}
        <div className="col-6">
          <ImageUploads
            title="Slide Image"
            error={er => (error["image"] = er)}
            onChange={value => setImage(value)}
            // value={image}
          />
        </div>
        {/* description field */}
        <div className="col-6">
          <InputField
            label="description"
            type="textarea"
            placeHolder="Description"
            onChange={value => {
              setDesc(value)
            }}
            value={desc}
          />
        </div>
        {/* Product Images */}
        <div className="col-12">
          <ImageUploads
            title="image list"
            number={4}
            isRequired={true}
            error={er => (error["images"] = er)}
            onChange={value => setImages(value)}
            // value={images}
          />
        </div>
        <div className="col-12">
          <div className="form-group">
            <div className="form-title">
              <label>Rich Description</label>
            </div>
            <div className="form-control ckeditor-field">
              <CKEditor
                editor={ClassicEditor}
                data={richDesc}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setRichDesc(data)
                }}
                // onReady={editor => {
                //   // You can store the "editor" and use when it is needed.
                //   console.log("Editor is ready to use!", editor)
                // }}
                // onBlur={(event, editor) => {
                //   console.log("Blur.", editor)
                // }}
                // onFocus={(event, editor) => {
                //   console.log("Focus.", editor)
                // }}
              />
            </div>
          </div>
        </div>
        {/* Submit button */}
        <div className="col-12">
          <input
            className="btn-submit"
            type="submit"
            onClick={e => handleSubmit(e)}
            value={props.match.params.id ? "Update" : "Add"}
          />
        </div>
      </form>
    </>
  )
}

export default ProductsForm
