import React, { useEffect } from "react"
import { useHistory } from "react-router"

import { useDispatch, useSelector } from "react-redux"
import { getAll } from "../redux/orders/orderSlice"
import orderApi from "../api/orderApi"
import { set, remove } from "../redux/loadingSlice"

import Table from "../components/Table"
import Badge from "../components/Badge"
import IdToName from "../components/IdToName"
import DropdownField from "../components/form/DropdownField"

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger"
}

const headData = [
  "ID",
  "Items",
  "Address",
  // "country",
  "phone",
  "customer",
  "date",
  "status",
  "tools"
]
const renderStatus = (item, index) => (
  <option key={index} value={item}>
    {item}
  </option>
)

const renderHead = (item, index) => <th key={index}>{item}</th>

const Orders = () => {
  const dispatch = useDispatch()

  const bodyData = useSelector(state => state.order.data)
  const fetchData = async () => await dispatch(getAll())
  useEffect(() => {
    if (bodyData.length === 0) fetchData()
  }, [])

  const renderBody = (item, index) => {
    const address =
      item.shippingAddress1 && item.shippingAddress1.length > 0
        ? item.shippingAddress1
        : item.shippingAddress2
    return (
      <tr key={index}>
        <td>{item._id}</td>
        <td>
          {item.orderItems.map((e, i) => {
            return (
              <p key={i}>
                {e.product ? e.product : "NOT FOUND"}
                <small>{` x${e.quantity}`}</small>
              </p>
            )
          })}
        </td>
        <td>{`${address}, ${item.country}`}</td>
        <td>{item.phone}</td>
        <td>
          <IdToName id={item.user} type="customer" />
        </td>
        <td>{item.dateOrdered}</td>
        <td>
          <p className="notUpdate active">
            <Badge
              type={orderStatus[item.status.toLowerCase()]}
              content={item.status}
            />
          </p>
          <div className="update">
            <DropdownField
              data={Object.keys(orderStatus)}
              renderData={(item, index) => renderStatus(item, index)}
              placeHolder="Choose Status"
              onChange={val => handleOnChange(val)}
            />
          </div>
        </td>
        <td>
          <p className="update">
            <i class="bx bx-check tools" onClick={() => handleSubmit(item)}></i>
            <i
              class="bx bx-x tools"
              onClick={() => handleUpdate(index + 1, "NOTUPDATE")}
            ></i>
          </p>
          <p className="notUpdate active">
            <i
              class="bx bx-pencil tools"
              onClick={() => handleUpdate(index + 1, "UPDATE")}
            ></i>
          </p>
        </td>
      </tr>
    )
  }

  let value
  const handleOnChange = val => {
    value = val
  }
  const handleSubmit = async item => {
    let dataUpdate = {
      ...item
    }
    if (value && value.length > 0) {
      dataUpdate = {
        ...dataUpdate,
        status: value
      }
    }

    dispatch(set())
    await orderApi.update(item._id, dataUpdate)
    dispatch(remove())
    await fetchData()
    //reset table
    handleUpdate("-1", "NotUpDate")
  }
  const handleUpdate = (index, type) => {
    let rows = document.getElementsByTagName("tr")
    //reset active
    for (let i = 1; i < rows.length; i++) {
      let update = rows[i].getElementsByClassName("update")
      let notUpdate = rows[i].getElementsByClassName("notUpdate")

      notUpdate[0].classList.add("active")
      notUpdate[1].classList.add("active")
      update[0].classList.remove("active")
      update[1].classList.remove("active")
    }

    // set active when update
    if (type === "UPDATE") {
      let update = rows[index].getElementsByClassName("update")
      let notUpdate = rows[index].getElementsByClassName("notUpdate")

      notUpdate[0].classList.remove("active")
      notUpdate[1].classList.remove("active")
      update[0].classList.add("active")
      update[1].classList.add("active")
    }
  }

  return (
    <>
      <h2 className="page-header">Orders</h2>
      <div className="card">
        <div className="card__body">
          <Table
            limit="10"
            headData={headData}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={bodyData}
            renderBody={(item, index) => renderBody(item, index)}
          />
        </div>
        <div className="card__footer"></div>
      </div>
    </>
  )
}

export default Orders
