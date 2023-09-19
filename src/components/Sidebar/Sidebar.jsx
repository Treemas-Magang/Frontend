import "./sidebar.css"
import Logo from "../../images/logo-treemas.png"
import { Link } from "react-router-dom"
import { useState } from "react"
import DropdownMenu from "../DropdownMenu/DropdownMenu"

const Sidebar = () => {
   
    const [itemsState, setItemsState] = useState({
        detailData: false,
        // 
        absen: false,
        cutiSakit: false,
        reimburse: false,
        timesheet: false,
        tracking: false,
        // 
        management: false,
        manualService: false,
        masterData: false,
        parameter: false,
        reportData: false,
        upload: false,
    })

    const [activeItem, setActiveItem] = useState(null)

    const handleClick = (itemName) => {
        setItemsState((prevState) => ({
            // prevState = { absen: false, management: false, masterData: false }
            ...prevState,
            [itemName]: !prevState[itemName]
        }))
    }

    return <div className="sidebar__container">
        <div className="logo">
            <Link to='/dashboard'>
                <img src={Logo} alt="Logo Treemas" />
            </Link>  
        </div>
        
        <nav>
            <ul>
                <li className={itemsState.detailData ? "color" : "non_color"} onClick={() => handleClick("detailData")}><div className={itemsState.detailData ? "active" : "non_active"}></div><p>Detail Data</p><i className={itemsState.detailData? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                {itemsState.detailData && (
                    <>
                        <DropdownMenu onClick={() => handleClick("absen")} link="/detail-data/absen-view" text="Absen" isActive={itemsState.absen}/>
                        <DropdownMenu onClick={() => handleClick("cutiSakit")} link="/detail-data/cutisakit-view" text="Cuti/Sakit" isActive={itemsState.cutiSakit}/>
                        <DropdownMenu onClick={() => handleClick("reimburse")} link="/detail-data/reimburse-view" text="Reimburse" isActive={itemsState.reimburse}/>
                        <DropdownMenu onClick={() => handleClick("timesheet")} link="/detail-data/timesheet-view" text="Timesheet" isActive={itemsState.timesheet}/>
                        <DropdownMenu onClick={() => handleClick("tracking")} link="/detail-data/tracking-view" text="Tracking" isActive={itemsState.tracking}/>
                    </>
                )}
                
                <li className={itemsState.management ? "color" : "non_color"} onClick={() => handleClick("management")}><div className={itemsState.management ? "active" : "non_active"}></div><p>Management</p><i className={itemsState.management? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                {itemsState.management && (
                    <>
                        <DropdownMenu text="Hai"/>
                        <DropdownMenu text="Hai"/>
                        <DropdownMenu text="Hai"/>
                    </>
                )}

                <li className={itemsState.manualService ? "color" : "non_color"} onClick={() => handleClick("masterData")}><div className={itemsState.manualService ? "active" : "non_active"}></div><p>Manual Service</p></li>
                <li className={itemsState.masterData ? "color" : "non_color"} onClick={() => handleClick("masterData")}><div className={itemsState.masterData ? "active" : "non_active"}></div><p>Master Data</p><i className={itemsState.masterData? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                {itemsState.masterData && (
                    <>
                        <DropdownMenu text="Hai"/>
                        <DropdownMenu text="Hai"/>
                        <DropdownMenu text="Hai"/>
                    </>
                )}

                <li className={itemsState.parameter ? "color" : "non_color"} onClick={() => handleClick("parameter")}><div className={itemsState.parameter ? "active" : "non_active"}></div><p>Parameter</p><i className={itemsState.parameter? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                {itemsState.parameter && (
                    <>
                        <DropdownMenu text="Hai"/>
                        <DropdownMenu text="Hai"/>
                        <DropdownMenu text="Hai"/>
                    </>
                )}

                <li className={itemsState.reportData ? "color" : "non_color"} onClick={() => handleClick("reportData")}><div className={itemsState.reportData ? "active" : "non_active"}></div><p>Report Data</p><i className={itemsState.reportData? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                {itemsState.reportData && (
                    <>
                        <DropdownMenu text="Hai"/>
                        <DropdownMenu text="Hai"/>
                        <DropdownMenu text="Hai"/>
                    </>
                )}

                <li className={itemsState.upload ? "color" : "non_color"} onClick={() => handleClick("upload")}><div className={itemsState.upload ? "active" : "non_active"}></div><p>Upload</p><i className={itemsState.upload? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                {itemsState.upload && (
                    <>
                        <DropdownMenu text="Hai"/>
                        <DropdownMenu text="Hai"/>
                        <DropdownMenu text="Hai"/>
                    </>
                )}

                <div className="line"></div>
                <li>Logout</li>
            </ul>
        </nav>

    </div>
}

export default Sidebar