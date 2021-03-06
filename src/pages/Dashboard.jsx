import React from "react"
import Chart from "react-apexcharts"
import { Link } from "react-router-dom"

import StatusCard from "../components/StatusCard"
import Table from "../components/Table"
import Badge from "../components/Badge"

// fake data
import statusData from "../assets/JsonData/status-card-data.json"
const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60, 0]
    },
    {
      name: "Store Customers",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
    }
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    },
    legend: {
      position: "bottom"
    },
    grid: {
      show: false
    }
  }
}
const topCustomers = {
  head: ["user", "total orders"],
  body: [
    {
      username: "john doe",
      order: "490"
    },
    {
      username: "frank iva",
      order: "250"
    },
    {
      username: "anthony baker",
      order: "120"
    },
    {
      username: "frank iva",
      order: "110"
    },
    {
      username: "anthony baker",
      order: "80"
    }
  ]
}
const latestOrders = {
  head: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping"
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid"
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending"
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid"
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund"
    }
  ]
}
//end fake data

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger"
}

const renderHead = (item, index) => <th key={index}>{item}</th>
const renderCustomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td className="align-right">{item.order}</td>
    {/* <td>{item.price}</td> */}
  </tr>
)
const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
)

const Dashboard = () => {
  return (
    <>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {statusData.map((item, index) => (
              <div className="col-6" key={index}>
                {/* Status card */}
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            {/* Chart */}
            <Chart
              series={chartOptions.series}
              options={chartOptions.options}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>top customers</h3>
            </div>
            <div className="card__body">
              {/* Table */}
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCustomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/customers">View all</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>latest orders</h3>
            </div>
            <div className="card__body">
              {/* Table */}
              <Table
                headData={latestOrders.head}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/customers">View all</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
