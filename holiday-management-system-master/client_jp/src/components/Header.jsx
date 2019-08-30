import React from "react"
import Row from "react-bootstrap/es/Row"
import Col from "react-bootstrap/es/Col"

const Header = () => {
  const styles = {
    fontWeight: "normal",
    fontSize: "1.75rem",
    marginBottom: "2rem"
  }

  return (
    <Row>
      <Col xs="12" className="mt-3">
        <h1>祝日管理システム</h1>
      </Col>
      <Col xs="12">
        <h2 style={styles}>TMJ給与課</h2>
      </Col>
    </Row>
  )
}

export default Header
