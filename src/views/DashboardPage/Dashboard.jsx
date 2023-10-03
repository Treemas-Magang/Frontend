import "./dashboard.css"
import Navbar from "../../components/Content/Navbar/Navbar.jsx"

const Dashboard = () => {
    return <div className="dashboard__container">
        <Navbar navbarText="Overview" />

       
        <div className="grafik__data__kehadiran">
            {/* yg atas */}
            <h1>Grafik Data Kehadiran / Tahun / 2023</h1>
            <div className="keterangan">
                <div className="box"><h1>Masuk</h1><h1>1</h1></div>
                <div className="box"><h1>Terlambat</h1><h1>2</h1></div>
                <div className="box"><h1>Absen</h1><h1>3</h1></div>
                <div className="box"><h1>Cuti</h1><h1>4</h1></div>
                <div className="box"><h1>Sakit</h1><h1>5</h1></div>

            </div>
                
        </div>
        
        <div className="grafik__data__member">
        

            <div className="left__container__dashboard">
            <h1>Grafik Data Member / Hari</h1>
                <div className="hari">
                    <h2>Hari ini</h2>
                        <div className="right">
                            <div><h2>Today</h2></div>
                            <div><h2>Yesterday</h2></div>
                            </div>    
                </div>
                    <div>
                        <h1>Grafik</h1>
                    </div>
            </div>

            <div className="right__container__dashboard">
                <div className="box1"><h1>Masuk</h1><h1>1</h1></div>
                <div className="box1"><h1>Terlambat</h1><h1>2</h1></div>
                <div className="box1"><h1>Absen</h1><h1>3</h1></div>
                <div className="box1"><h1>Cuti</h1><h1>4</h1></div>
                <div className="box1"><h1>Sakit</h1><h1>5</h1></div>
                
            </div>

        </div>

        <div className="data__member">
            <h1>Data Member</h1>
        </div>

        
    </div> 
}

export default Dashboard