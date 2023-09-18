import { useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route
} from "react-router-dom"

// Views
import LoginPage from './views/LoginPage/LoginPage'
import Dashboard from './views/DashboardPage/Dashboard'
import DetaildataAbsen from "./views/DetaildataPage/AbsenPage/DetaildataAbsen"

// 
import "./App.css"

function App() {

  return (
    <>
    <BrowserRouter >
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detail-data/absen-view" element={<DetaildataAbsen />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
