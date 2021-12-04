import React from "react"

import { useSelector } from "react-redux"

const Loading = () => {
  // const [loading, setLoading] = useState(true)
  const loading = [
    useSelector(state => state.loading.value),
    useSelector(state => state.getCate.loading),
    useSelector(state => state.getMe.loading),
    useSelector(state => state.product.loading),
    useSelector(state => state.customer.loading),
    useSelector(state => state.order.loading)
  ]

  const isLoad = loading.includes(true) ? "active" : ""
  // console.log(isLoad)

  return (
    <div className={`loading ${isLoad}`}>
      <div class="loader">
        <div class="outer"></div>
        <div class="middle"></div>
        <div class="inner"></div>
      </div>
    </div>
  )
}

export default Loading
