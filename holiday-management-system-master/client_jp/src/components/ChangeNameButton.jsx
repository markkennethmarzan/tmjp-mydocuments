import React, { Fragment, useState } from "react"
import Axios from "axios"
import Button from "react-bootstrap/es/Button"
import Modal from "react-bootstrap/es/Modal"
import Form from "react-bootstrap/es/Form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

const ChangeNameButton = props => {
  const API_URL =
    "http://ec2-3-112-198-127.ap-northeast-1.compute.amazonaws.com/api/holidays"
  const { variant, styles, date, name } = props

  const [showModal, setShowModal] = useState(false)
  const [holidayName, setHolidayName] = useState(name)

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleChange = e => {
    setHolidayName(e.target.value)
  }

  const handleEdit = e => {
    e.preventDefault()
    Axios.put(`${API_URL}/edit/${date}`, { name: holidayName }).then(res =>
      console.log(res)
    )
    setShowModal(false)
    toast.success(`${name}が${holidayName}に変更されました。`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true
    })
  }

  return (
    <Fragment>
      <Button variant={variant} style={styles} onClick={handleShowModal}>
        <FontAwesomeIcon icon="edit" /> 名前を変更する
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>祝日名を変更する</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEdit}>
          <Modal.Body>
            祝日名を変更しますか？
            <Form.Group>
              <Form.Control
                type="text"
                onChange={handleChange}
                defaultValue={name}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              閉じる
            </Button>
            <Button type="submit" variant="primary">
              確認
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default ChangeNameButton
