import { useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route
} from "react-router-dom"
import LoginPage from './views/LoginPage/LoginPage'
import "./App.css"

function App() {

  return (
    <>
    <BrowserRouter >
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
