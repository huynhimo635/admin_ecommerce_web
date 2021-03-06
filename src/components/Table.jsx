import React, { useEffect, useState } from "react"

const Table = props => {
  let initDataShow = null
  const [dataShow, setDataShow] = useState(initDataShow)

  const limit = props.limit ? props.limit : 0
  useEffect(() => {
    initDataShow =
      props.limit && props.bodyData
        ? props.bodyData.slice(0, Number(props.limit))
        : props.bodyData
    setDataShow(initDataShow)
    setCurrPage(0)
  }, [props.bodyData])

  let pages = 1
  let range = []

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit))
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1
    range = [...Array(pages).keys()]
  }

  const [currPage, setCurrPage] = useState(0)

  const selectPage = page => {
    const start = Number(props.limit) * page
    const end = start + Number(props.limit)

    setDataShow(props.bodyData.slice(start, end))

    setCurrPage(page)
  }

  return (
    <div className="table">
      <table>
        {/* header */}
        {props.headData && props.renderHead ? (
          <thead>
            <tr>
              {props.headData.map((item, index) =>
                props.renderHead(item, index)
              )}
            </tr>
          </thead>
        ) : null}
        {/* body */}
        {dataShow && props.renderBody ? (
          <tbody>
            {dataShow.map((item, index) =>
              props.renderBody(item, index + currPage * limit)
            )}
          </tbody>
        ) : null}
      </table>
      {pages > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination__item ${
                currPage === index ? "active" : ""
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Table
