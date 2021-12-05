import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { getCate } from "../redux/categories/getCateSlice"
// import { set } from "../redux/loadingSlice"

import categoryApi from "../api/categoryApi"

import Table from "../components/Table"
import InputField from "../components/form/InputField"

const Categories = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [isAdd, setIsAdd] = useState(true)
  const [id, setId] = useState("")

  const bodyData = useSelector(state => state.getCate.data)
  const headData = ["index", "name", "tools"]
  const renderHead = (item, index) => <th key={index}>{item}</th>
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>
        <i
          class="bx bx-pencil tools"
          onClick={() => {
            setIsAdd(false)
            setName(item.name)
            setId(item._id)
          }}
        ></i>
        <i
          class="bx bx-trash tools"
          onClick={async () => {
            if (
              // eslint-disable-next-line no-restricted-globals
              confirm("Are you sure to want to delete this category?")
            ) {
              // Save it!
              await categoryApi.delCate(item._id)
              fetchData()
              alert("success")
            } else {
              // Do nothing!
            }
          }}
        ></i>
      </td>
    </tr>
  )

  const fetchData = async () => {
    try {
      await dispatch(getCate())
    } catch (error) {
      console.log("loi", error)
    }
  }
  useEffect(() => {
    if (bodyData.length === 0) fetchData()
  }, [])

  const handleSubmit = async (e, type) => {
    e.preventDefault()
    if (type === "ADD") {
      if (name && name !== "") {
        if (
          bodyData.find(item => item.name.toLowerCase() === name.toLowerCase())
        )
          alert("This name is already. Please try with orther name!!")
        else {
          const post = await categoryApi.addCate(name.toLowerCase())
          if (post) {
            setName("")
            fetchData()
            alert("success")
          }
        }
      } else {
        alert("Please enter category's name")
      }
    } else if (type === "UPDATE") {
      if (name && name !== "") {
        if (
          bodyData.find(
            item =>
              item.name.toLowerCase() === name.toLowerCase() && item._id !== id
          )
        )
          alert("This name is already. Please try with orther name!!")
        else {
          const post = await categoryApi.updateCate(id, name.toLowerCase())
          console.log(post)
          if (post) {
            setIsAdd(true)
            setName("")
            fetchData()
            alert("success")
          }
        }
      } else {
        alert("Please enter category's name")
      }
    }
  }

  return (
    <>
      <h2 className="page-header">Categories</h2>
      <div className="form">
        <form action="">
          <div className="row">
            <div className="col-10">
              <InputField
                label="name"
                type="text"
                placeHolder="Enter new category's name"
                onChange={value => {
                  setName(value)
                }}
                value={name}
              />
            </div>
            <div className="col-2">
              {isAdd ? (
                <input
                  className="btn-submit cate-btn-add"
                  type="submit"
                  onClick={e => handleSubmit(e, "ADD")}
                  value="ADD New"
                  autoFocus
                />
              ) : (
                <div className="update-btn">
                  <div
                    className="cate-update"
                    onClick={e => handleSubmit(e, "UPDATE")}
                  >
                    Update
                  </div>
                  <div
                    className="cate-close"
                    onClick={() => {
                      setName("")
                      setIsAdd(true)
                    }}
                  >
                    x
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="card">
        <div className="card__body">
          <Table
            limit="5"
            headData={headData}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={bodyData}
            renderBody={(item, index) => renderBody(item, index)}
          />
        </div>
      </div>
    </>
  )
}

export default Categories
