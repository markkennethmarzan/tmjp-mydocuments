import React, { useState, useEffect } from "react"
import Axios from "axios"
import DeleteButton from "./DeleteButton"
import EditButton from "./ChangeNameButton"
import Table from "react-bootstrap/es/Table"

const ListViewContent = () => {
  const buttonStyles = {
    display: "flex",
    justifyContent: "space-evenly"
  }

  const API_URL =
    "localhost:8000/api/holidays"

  let [holidaysList, setHolidaysList] = useState([])

  useEffect(() => {
    Axios.get(API_URL).then(res => {
      setHolidaysList(res.data)
    })
  })

  const t = (id, text) => {
    Axios.get(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190816T062034Z.1a17f539375ab7af.118bd6dc468f6e0635cd7dce5c5e2ea035be8bb9&text=${text}&lang=ja-en`
    ).then(res => {
      let name = document.getElementById(id)
      name.innerText = res.data.text[0]
    })
  }

  return (
    <Table striped hover bordered responsive="sm">
      <thead>
        <tr>
          <th style={{ width: "20%" }}>Date</th>
          <th style={{ width: "20%" }}>Day of the Week</th>
          <th style={{ width: "30%" }}>Holiday Name</th>
          <th style={{ width: "30%" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {holidaysList.length === 0 ? (
          <tr>
            <td colSpan="4">No holidays in the database</td>
          </tr>
        ) : (
          holidaysList.map(holiday => (
            <tr key={holiday.ID}>
              <td>
                {new Date(holiday.HolidayDate).toLocaleDateString("en-JP", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric"
                })}
              </td>
              <td>
                {new Date(holiday.HolidayDate).toLocaleDateString("en-JP", {
                  weekday: "long"
                })}
              </td>
              <td id={holiday.ID}>{t(holiday.ID, holiday.HolidayName)}</td>
              <td style={buttonStyles}>
                <EditButton
                  variant="primary"
                  date={holiday.HolidayDate}
                  name={holiday.HolidayName}
                />
                <DeleteButton
                  variant="danger"
                  date={holiday.HolidayDate}
                  name={holiday.HolidayName}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  )
}

export default ListViewContent
