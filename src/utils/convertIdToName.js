const convertIdToName = (id, data) => {
  if (data && data.length > 0) {
    const x = data.find(item => item._id === id)
    if (x !== undefined) return x.name
    else return "NOT FOUND"
  } else return "NOTFOUND"
}

export default convertIdToName
