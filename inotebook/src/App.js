import "./App.css";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./Context/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import React, { useState } from "react";
function App() {
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 3000);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />

          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route path="/about" element={<About />}></Route>

            <Route
              path="/login"
              element={<Login showAlert={showAlert} />}
            ></Route>

            <Route
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
