import axiosClient from "./axiosClient"

const categoryApi = {
  getAll: () => {
    const subUrl = "/categories"
    return axiosClient.get(subUrl)
  },
  addCate: name => {
    const subUrl = "/categories"

    const data = {
      name,
      icon: "new",
      color: "red"
    }

    return axiosClient.post(subUrl, data)
  },
  updateCate: (id, name) => {
    const subUrl = `/categories/${id}`

    const data = {
      name,
      icon: "new",
      color: "red"
    }

    return axiosClient.put(subUrl, data)
  },
  delCate: id => {
    const subUrl = `/categories/${id}`

    return axiosClient.delete(subUrl)
  }
}

export default categoryApi
