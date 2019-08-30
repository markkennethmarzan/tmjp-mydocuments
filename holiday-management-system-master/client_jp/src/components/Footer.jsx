import React, { useState } from "react"
import Row from "react-bootstrap/es/Row"
import Col from "react-bootstrap/es/Col"
import FormControl from "react-bootstrap/es/FormControl"

const Footer = () => {
  const [language, setLanguage] = useState("JP")
  const footerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
  const dropdownStyles = {
    margin: "0 auto 1rem",
    width: "fit-content"
  }
  const onLanguageToggle = e => {
    const JP_URL =
      "http://ec2-3-112-198-127.ap-northeast-1.compute.amazonaws.com"
    const EN_URL =
      "http://ec2-3-112-198-127.ap-northeast-1.compute.amazonaws.com/en"
    if (e.target.value === "JP") {
      setLanguage("JP")
      window.location = JP_URL
    } else {
      setLanguage("EN")
      window.location = EN_URL
    }
  }

  return (
    <Row>
      <Col xs="12" style={footerStyles}>
        <a href="https://www.tmj.jp" target="_blank" rel="noopener noreferrer">
          <img src="/logo-tmj.jpg" alt="TMJ Inc." />
        </a>
        <p>© 2019 TMJ Inc.</p>
      </Col>
      <Col xs="12">
        <FormControl
          as="select"
          style={dropdownStyles}
          onChange={onLanguageToggle}
          value={language}
        >
          <option value="JP">日本語</option>
          <option value="EN">English</option>
        </FormControl>
      </Col>
    </Row>
  )
}

export default Footer
