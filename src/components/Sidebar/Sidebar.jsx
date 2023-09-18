import "./sidebar.css"
import Logo from "../../images/logo-treemas.png"
import { Link } from "react-router-dom"
import { useState } from "react"

const Sidebar = () => {
   
    const [itemsState, setItemsState] = useState({
        absen: false,
        management: false,
        masterData: false,
        parameter: false,
        reportData: false,
        upload: false,
    })

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
                <li>Detail Data</li>
                <li onClick={() => handleClick("absen")}>Absen<i className={itemsState.absen? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                <li onClick={() => handleClick("management")}>Management<i className={itemsState.management? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                <li>Manual Service</li>
                <li onClick={() => handleClick("masterData")}>Master Data<i className={itemsState.masterData? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                <li onClick={() => handleClick("parameter")}>Parameter<i className={itemsState.parameter? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                <li onClick={() => handleClick("reportData")}>Report Data<i className={itemsState.reportData? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                <li onClick={() => handleClick("upload")}>Upload<i className={itemsState.upload? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                <div className="line"></div>
                <li>Logout</li>
            </ul>
        </nav>

    </div>
}

export default Sidebar