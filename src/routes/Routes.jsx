import React from "react"
import { Route, Switch } from "react-router-dom"

import Dashboard from "../pages/Dashboard"

import Products from "../pages/Products"
import ProductsForm from "../pages/ProductsForm"

import Customers from "../pages/Customer"
import CustomerForm from "../pages/CustomerForm"

import Orders from "../pages/Orders"
import Categories from "../pages/Categories"

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />

      <Route path="/customers" exact component={Customers} />
      <Route path="/customers/add" component={CustomerForm} />

      <Route path="/categories" component={Categories} />
      <Route path="/orders" component={Orders} />

      <Route path="/products" exact component={Products} />
      <Route path="/products/add" component={ProductsForm} />
      <Route path="/products/update/:id" component={ProductsForm} />
    </Switch>
  )
}

export default Routes
