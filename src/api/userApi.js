import axiosClient from "./axiosClient"

const userApi = {
  login: (email, password) => {
    const data = {
      email,
      password
    }
    const subUrl = "/users/login"
    return axiosClient.post(subUrl, data)
  },
  getAll: () => {
    const subUrl = "/users"
    return axiosClient.get(subUrl)
  },
  update: data => {
    const subUrl = `/users/${data._id}`

    const dataUpdate = {
      ...data,
      isAdmin: !data.isAdmin
    }
    return axiosClient.put(subUrl, dataUpdate)
  },
  delete: id => {
    const subUrl = `/users/${id}`
    return axiosClient.delete(subUrl)
  }
}

export default userApi
