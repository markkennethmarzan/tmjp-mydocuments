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
    toast.success(`${name} has been deleted`, {
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
        <FontAwesomeIcon icon="trash-alt" /> Delete
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure you want to delete ${name}?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default DeleteButton
