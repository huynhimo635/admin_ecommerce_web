const regex = {
  email: new RegExp(
    "^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
  ),
  number: new RegExp("^[0-9]+$")
}

const required = value => {
  if (!value || value.toString().length <= 0) {
    return [true, "This field is required"]
  }
  return [false, ""]
}

const number = value => {
  if (value.length > 0) {
    const result = regex.number.test(value)
    if (!result) return [true, "This field is not number"]
  }
  return [false, ""]
}

const email = value => {
  if (value.length > 0) {
    const result = regex.email.test(value)
    if (!result) return [true, "This email is invalid"]
  }
  return [false, ""]
}

const image = (obj, num) => {
  if (obj.length > num) return [true, `Max images upload is ${num} only`]
  for (const item in obj) {
    if (Object.hasOwnProperty.call(obj, item)) {
      const element = obj[item]
      if (
        element.type !== "image/jpg" &&
        element.type !== "image/png" &&
        element.type !== "image/gif" &&
        element.type !== "image/jpeg"
      )
        return [true, "Please select a valid image file"]
    }
  }
  return [false, ""]
}

const validatorsData = {
  required,
  number,
  email,
  image
}
export default validatorsData
