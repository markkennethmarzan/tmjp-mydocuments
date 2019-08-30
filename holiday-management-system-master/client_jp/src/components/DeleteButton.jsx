import React, { Fragment, useState } from "react"
import Axios from "axios"
import Button from "react-bootstrap/es/Button"
import Modal from "react-bootstrap/es/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

const DeleteButton = props => {
  const API_URL =
    "http://ec2-3-112-198-127.ap-northeast-1.compute.amazonaws.com/api/holidays"
  const { variant, styles, date, name } = props

  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleDelete = () => {
    Axios.delete(`${API_URL}/delete/${date}`).then(res => console.log(res))
    setShowModal(false)
    toast.success(`${name}は削除されました。`, {
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
        <FontAwesomeIcon icon="trash-alt" /> 削除
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>祝日を削除する</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`${name}を削除しますか？`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            閉じる
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            削除
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default DeleteButton
