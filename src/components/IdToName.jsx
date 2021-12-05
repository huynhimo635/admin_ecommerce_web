import React from "react"

import { useSelector } from "react-redux"
import convertIdToName from "../utils/convertIdToName"

const IdToName = props => {
  const data = {
    product: useSelector(state => state.product.data),
    category: useSelector(state => state.getCate.data),
    customer: useSelector(state => state.customer.data)
  }

  return (
    <p>
      {convertIdToName(props.id, data[props.type])}
      {props.children}
    </p>
  )
}

export default IdToName
