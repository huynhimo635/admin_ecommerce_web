import axiosClient from "./axiosClient"

const orderApi = {
  getAll: () => {
    const subUrl = "/orders"
    return axiosClient.get(subUrl)
  },
  get: id => {
    const subUrl = `/orders/${id}`
    return axiosClient.get(subUrl)
  },
  update: (id, data) => {
    const subUrl = `/orders/${id}`

    return axiosClient.put(subUrl, data)
  }
}

export default orderApi
