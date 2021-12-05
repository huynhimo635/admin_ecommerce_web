import React, { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAll } from "../redux/products/productSlice"

import Table from "../components/Table"
import productApi from "../api/productApi"

const headData = [
  "index",
  "name",
  "brand",
  "category",
  "description",
  "price",
  "stock",
  "tools"
]
const renderHead = (item, index) => <th key={index}>{item}</th>

const Products = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const bodyData = useSelector(state => state.product.data)

  const fetchData = async () => {
    try {
      await dispatch(getAll())
    } catch (error) {
      console.log("loi", error)
    }
  }
  useEffect(() => {
    if (bodyData.length === 0) fetchData()
  }, [])

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.brand}</td>
      <td>{item.category ? item.category.name : ""}</td>
      <td className="desc">{item.description}</td>
      <td>{item.price}</td>
      <td>{item.countInStock}</td>
      <td>
        <i
          class="bx bx-pencil tools"
          onClick={() => history.push(`products/update/${item._id}`)}
        ></i>
        <i class="bx bx-trash tools" onClick={() => handleDelete(item._id)}></i>
      </td>
    </tr>
  )

  const handleDelete = async id => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm("Are you sure to want to delete this product?")
    ) {
      // Save it!
      await productApi.delete(id)
      await fetchData()

      alert("success")
    } else {
      // Do nothing!
    }
  }

  return (
    <>
      <h2 className="page-header">Products</h2>
      <div className="card">
        <div className="card__body">
          <Table
            limit="10"
            headData={headData}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={bodyData}
            renderBody={(item, index) => renderBody(item, index)}
          />
          <div className="btn-add btn">
            <button onClick={() => history.push("products/add")}>
              <span>Add</span>
              <i class="bx bx-list-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
