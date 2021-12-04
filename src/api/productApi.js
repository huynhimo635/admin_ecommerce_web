import axiosClient from "./axiosClient"

const productApi = {
  getAll: () => {
    const subUrl = "/products"
    return axiosClient.get(subUrl)
  },
  get: id => {
    const subUrl = `/products/${id}`
    return axiosClient.get(subUrl)
  },
  delete: id => {
    const subUrl = `/products/${id}`
    return axiosClient.delete(subUrl)
  },
  add: data => {
    const subUrl = "/products"
    return axiosClient.post(subUrl, data)
  },
  update: (id, data) => {
    const subUrl = `/products/${id}`
    return axiosClient.put(subUrl, data)
  },
  updateImages: (id, data) => {
    const subUrl = `/products/gallery-images/${id}`

    return axiosClient.put(subUrl, data)
  }
}

export default productApi
