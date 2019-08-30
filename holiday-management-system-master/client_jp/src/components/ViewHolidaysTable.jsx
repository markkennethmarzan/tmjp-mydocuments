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
    "http://ec2-3-112-198-127.ap-northeast-1.compute.amazonaws.com/api/holidays"

  let [holidaysList, setHolidaysList] = useState([])

  useEffect(() => {
    Axios.get(API_URL).then(res => {
      setHolidaysList(res.data)
    })
  })

  return (
    <Table striped hover bordered responsive="sm">
      <thead>
        <tr>
          <th style={{ width: "20%" }}>祝日の日付</th>
          <th style={{ width: "20%" }}>曜日</th>
          <th style={{ width: "30%" }}>祝日名</th>
          <th style={{ width: "30%" }}>アクション</th>
        </tr>
      </thead>
      <tbody>
        {holidaysList.length === 0 ? (
          <tr>
            <td colSpan="4">データベースに祝日は存在しません。</td>
          </tr>
        ) : (
          holidaysList.map(holiday => (
            <tr key={holiday.ID}>
              <td>
                {new Date(holiday.HolidayDate).toLocaleDateString("ja-JP", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric"
                })}
              </td>
              <td>
                {new Date(holiday.HolidayDate).toLocaleDateString("ja-JP", {
                  weekday: "long"
                })}
              </td>
              <td>{holiday.HolidayName}</td>
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
