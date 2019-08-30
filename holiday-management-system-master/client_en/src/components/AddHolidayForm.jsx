import React from "react"
import Form from "react-bootstrap/es/Form"
import Button from "react-bootstrap/es/Button"

const AddHolidayForm = props => {
  const { date, name, onChangeDate, onChangeName, onSubmit } = props

  const handleChangeDate = e => {
    onChangeDate(e)
  }

  const handleChangeName = e => {
    onChangeName(e)
  }

  const handleSubmit = e => {
    onSubmit(e)
  }

  const formStyles = {
    display: "flex",
    padding: "2rem",
    justifyContent: "space-evenly",
    alignItems: "center",
    border: "1px solid #dddddd"
  }

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "0"
  }

  const labelStyles = {
    marginRight: "1rem",
    marginBottom: "0",
    textAlign: "left",
    fontWeight: "bold"
  }

  const buttonStyles = {
    width: "7.5rem",
    margin: "0"
  }

  return (
    <Form onSubmit={handleSubmit} style={formStyles}>
      <Form.Group style={groupStyles} controlId="holidayDate">
        <Form.Label style={labelStyles}>Date:</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={date}
          onChange={handleChangeDate}
        />
      </Form.Group>
      <Form.Group style={groupStyles} controlId="holidayName">
        <Form.Label style={labelStyles}>Name:</Form.Label>
        <Form.Control
          name="name"
          type="text"
          value={name}
          onChange={handleChangeName}
          placeholder="Input a holiday name"
        />
      </Form.Group>
      <Button type="submit" variant="primary" style={buttonStyles}>
        Add
      </Button>
    </Form>
  )
}

export default AddHolidayForm
