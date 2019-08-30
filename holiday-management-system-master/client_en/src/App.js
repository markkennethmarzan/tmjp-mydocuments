import React from "react"
import Axios from "axios"
import Header from "./components/Header"
import ViewHolidaysTable from "./components/ViewHolidaysTable"
import AddHolidayForm from "./components/AddHolidayForm"
import Container from "react-bootstrap/es/Container"
import { useSessionStorage } from "./UseStorage"
import { ToastContainer, toast, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import "./App.css"
import Footer from "./components/Footer"

function App() {
  const today = new Date().toISOString("en-JP").slice(0, 10)
  const API_URL =
    "http://ec2-3-112-198-127.ap-northeast-1.compute.amazonaws.com/api/holidays"

  const [date, setDate] = useSessionStorage("date", today)
  const [name, setName] = useSessionStorage("name", "")

  const handleChangeDate = e => {
    setDate(e.target.value)
  }

  const handleChangeName = e => {
    setName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    Axios.post(`${API_URL}/add`, {
      name,
      date
    }).then(res => {
      const dupe = "Holiday already exists in the database"
      const added = `${res.data.HolidayName} has been added.`
      if (res.data === dupe) {
        toast.error(dupe, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true
        })
      } else {
        toast.success(added, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true
        })
      }
    })
  }

  const styles = {
    position: "relative",
    minHeight: "calc(100vh - 8rem)"
  }

  return (
    <div className="App">
      <Container style={styles}>
        <ToastContainer transition={Slide} />
        <Header />
        <AddHolidayForm
          date={date}
          name={name}
          onChangeDate={handleChangeDate}
          onChangeName={handleChangeName}
          onSubmit={handleSubmit}
        />
        <ViewHolidaysTable />
      </Container>
      <Container>
        <Footer />
      </Container>
    </div>
  )
}

export default App
