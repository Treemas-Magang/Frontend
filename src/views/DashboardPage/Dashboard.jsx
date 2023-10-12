/* eslint-disable no-unused-vars */
import "./dashboard.css"
import Navbar from "../../components/Content/Navbar/Navbar.jsx"
import Information from "../../components/Content/Information/Information"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";


const Dashboard = () => {

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const infoTopFields = ["NIK", "Nama Karyawan", "Masuk", "Terlambat", "Absen", "Cuti", "Sakit"]

    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let getDay = weekday[date.getDay()]
    // we will display the date as DD-MM-YYYY 
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    const data = [
        {
          name: 'Masuk',
          total: 70,
          amt: 0,
        },
        {
          name: 'Terlambat',
          total: 5,
          amt: 0,
        },
        {
          name: 'Absen',
          total: 10,
          amt: 0,
        },
        {
          name: 'Cuti',
          total: 8,
          amt: 0,
        },
        {
          name: 'Sakit',
          total: 2,
          amt: 0,
        },
      ];
    return <div className="dashboard__container">
        <Navbar navbarText="Overview" />
               
        <div className="grafik__data__kehadiran">
            {/* yg atas */}
            <h1>Grafik Data Kehadiran / Tahun / {currentYear}</h1>
            <div className="keterangan">
                <div className="box"><h1>Masuk</h1><h2>1</h2></div>
                <div className="box"><h1>Terlambat</h1><h2>2</h2></div>
                <div className="box"><h1>Absen</h1><h2>3</h2></div>
                <div className="box"><h1>Cuti</h1><h2>4</h2></div>
                <div className="box"><h1>Sakit</h1><h2>5</h2></div>

            </div>
                
        </div>
        
        <div className="grafik__data__member">
        

            <div className="left__container__dashboard">
            <h1>Grafik Data Member / Hari</h1>
                <div className="hari">
                    <h2>{getDay}</h2>
                        <div className="right">
                            <div><h2>{currentDate}</h2></div>
                        </div>   
                                
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
                    <div className="vertikal_line"></div>
            </div>


            <div className="right__container__dashboard">
                
                <div className="box1"><h1>Masuk</h1><h2>1</h2></div>
                <div className="horizontal_line"></div>
                <div className="box1"><h1>Terlambat</h1><h2>2</h2></div>
                <div className="horizontal_line"></div>
                <div className="box1"><h1>Absen</h1><h2>3</h2></div>
                <div className="horizontal_line"></div>
                <div className="box1"><h1>Cuti</h1><h2>4</h2></div>
                <div className="horizontal_line"></div>
                <div className="box1"><h1>Sakit</h1><h2>5</h2></div>
                
            </div>

        </div>

        <Information informationText="Data Member" fields={infoTopFields}/>
        
    </div> 
}

export default Dashboard