import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

import Table from "../components/Table"

import { useDispatch, useSelector } from "react-redux"
import { customer } from "../redux/users/customerSlice"
import userApi from "../api/userApi"

// import customerList from "../assets/JsonData/customers-list.json"

const headData = [
  "index",
  "name",
  "email",
  "phone",
  "location",
  "admin",
  "tools"
]
const renderHead = (item, index) => <th key={index}>{item}</th>

const Customers = () => {
  const dispatch = useDispatch()
  // const history = useHistory()
  const customerList = useSelector(state => state.customer.data)

  const fetchData = async () => {
    try {
      await dispatch(customer())
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (customerList.length === 0) fetchData()
  }, [])

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td style={{ textTransform: "unset" }}>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.city}</td>
      <td>
        {item.isAdmin ? (
          <i class="bx bxs-user-check isTrue"></i>
        ) : (
          <i class="bx bxs-user-x isFalse"></i>
        )}
      </td>
      <td>
        <i class="bx bx-pencil tools" onClick={() => handleOnChange(item)}></i>
        <i class="bx bx-trash tools" onClick={() => handleOnDel(item._id)}></i>
      </td>
    </tr>
  )

  const handleOnChange = async item => {
    // await userApi.update(item)
    // await fetchData()
    console.log(item)
  }
  const handleOnDel = async id => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm("Are you sure to want to delete this user?")
    ) {
      // Save it!
      await userApi.delete(id)
      await fetchData()
      alert("success")
    } else {
      // Do nothing!
    }
  }

  return (
    <>
      <h2 className="page-header">Customers</h2>
      <div className="card">
        <div className="card__body">
          <Table
            limit="10"
            headData={headData}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={customerList}
            renderBody={(item, index) => renderBody(item, index)}
          />
        </div>
      </div>
    </>
  )
}

export default Customers
