import React, { useState, useEffect } from "react"

import DropdownField from "../components/form/DropdownField"
import InputField from "../components/form/InputField"

import addresssData from "../assets/JsonData/address.json"

let error = {
  name: false
}

// {
//     "apartment":"apartment 202",
//     "city":"Newyork",
//     "country":"USA"
// }

const CustomerForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [phone, setPhone] = useState("")
  const [isAd, setIsAd] = useState("")
  const [zip, setZip] = useState("")
  const [street, setStreet] = useState("")

  console.log(addresssData[0].Name)
  console.log(addresssData)

  return (
    <form className="form row">
      <div className="col-6">
        <InputField
          label="name"
          type="text"
          validator={["required"]}
          error={(label, er) => (error[label] = er)}
          onChange={value => setName(value)}
          value={name}
        />
      </div>
    </form>
  )
}

export default CustomerForm
