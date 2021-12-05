import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Redirect } from "react-router"

import { useDispatch, useSelector } from "react-redux"
import { getAll as getProducts } from "../redux/products/productSlice"
import { customer as getCustomers } from "../redux/users/customerSlice"
import { getCate as getCategories } from "../redux/categories/getCateSlice"
import { getAll as getOrders } from "../redux/orders/orderSlice"

import Sidebar from "./Sidebar"
import TopNav from "./TopNav"

import Routes from "../routes/Routes"
import LoginRoute from "../routes/LoginRoute"

import Loading from "./Loading"

const Layout = () => {
  const dispatch = useDispatch()
  const data = {
    product: useSelector(state => state.product.data),
    category: useSelector(state => state.getCate.data),
    customer: useSelector(state => state.customer.data),
    order: useSelector(state => state.order.data)
  }
  const fetchData = async () => {
    if (
      data.product.length === 0 &&
      data.category.length === 0 &&
      data.customer.length === 0 &&
      data.order.length === 0
    )
      await Promise.all([
        dispatch(getProducts()),
        dispatch(getCustomers()),
        dispatch(getCategories()),
        dispatch(getOrders())
      ])
  }

  return (
    <BrowserRouter>
      <Loading />
      <Route
        render={props => {
          if (localStorage.getItem("token") !== "") {
            fetchData()

            return (
              <div className="layout">
                <Sidebar {...props} />
                <div className="layout__content">
                  <TopNav />
                  <div
                    className="layout__content__main"
                    onLoad={async () => await fetchData()}
                  >
                    <Routes />
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div className="layout">
                <LoginRoute />
                <Redirect to="/login" />
              </div>
            )
          }
        }}
      />
    </BrowserRouter>
  )
}

export default Layout
