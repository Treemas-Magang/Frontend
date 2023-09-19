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
        // 
        user: false,
        userAccess: false,
        userMember: false,
        // 
        manualService: false,
        //
        masterData: false,
        //
        announcement: false,
        claim: false,
        cuti: false,
        jabatan: false,
        karyawan: false,
        libur: false,
        permission: false,
        project: false,
        //
        parameter: false,
        //
        general: false,
        reimburseP: false,
        //
        reportData: false,
        //
        claimR: false,
        detail: false,
        summary: false,
        //
        upload: false,
        //
        absenU: false,
        apk: false,
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
                        <DropdownMenu onClick={() => handleClick("user")} link="/management/user-view" text="User" isActive={itemsState.user}/>
                        <DropdownMenu onClick={() => handleClick("userAccess")} link="/management/user-access-view" text="User Access" isActive={itemsState.userAccess}/>
                        <DropdownMenu onClick={() => handleClick("userMember")} link="/management/user-member-view" text="User Member" isActive={itemsState.userMember}/>
                    </>
                )}

                <li className={itemsState.manualService ? "color" : "non_color"} onClick={() => handleClick("masterData")}><div className={itemsState.manualService ? "active" : "non_active"}></div><p>Manual Service</p></li>
                <li className={itemsState.masterData ? "color" : "non_color"} onClick={() => handleClick("masterData")}><div className={itemsState.masterData ? "active" : "non_active"}></div><p>Master Data</p><i className={itemsState.masterData? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                {itemsState.masterData && (
                    <>
                        <DropdownMenu onClick={() => handleClick("announcement")} link="/master-data/announcement-view" text="Announcement" isActive={itemsState.announcement}/>
                        <DropdownMenu onClick={() => handleClick("claim")} link="/master-data/claim-view" text="Claim" isActive={itemsState.claim}/>
                        <DropdownMenu onClick={() => handleClick("cuti")} link="/master-data/cuti-view" text="Cuti" isActive={itemsState.cuti}/>
                        <DropdownMenu onClick={() => handleClick("jabatan")} link="/master-data/jabatan-view" text="Jabatan" isActive={itemsState.jabatan}/>
                        <DropdownMenu onClick={() => handleClick("karyawan")} link="/master-data/karyawan-view" text="Karyawan" isActive={itemsState.karyawan}/>
                        <DropdownMenu onClick={() => handleClick("libur")} link="/master-data/libur-view" text="Libur" isActive={itemsState.libur}/>
                        <DropdownMenu onClick={() => handleClick("permission")} link="/master-data/permission-view" text="Permission" isActive={itemsState.permission}/>
                        <DropdownMenu onClick={() => handleClick("project")} link="/master-data/project-view" text="Project" isActive={itemsState.project}/>
                    </>
                )}

                <li className={itemsState.parameter ? "color" : "non_color"} onClick={() => handleClick("parameter")}><div className={itemsState.parameter ? "active" : "non_active"}></div><p>Parameter</p><i className={itemsState.parameter? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                {itemsState.parameter && (
                    <>
                    
                        <DropdownMenu onClick={() => handleClick("general")} link="/parameter/general-view" text="General" isActive={itemsState.general}/>
                        <DropdownMenu onClick={() => handleClick("reimburseP")} link="/parameter/reimburse-view" text="Reimburse" isActive={itemsState.reimburseP}/>
                    </>
                )}

                <li className={itemsState.reportData ? "color" : "non_color"} onClick={() => handleClick("reportData")}><div className={itemsState.reportData ? "active" : "non_active"}></div><p>Report Data</p><i className={itemsState.reportData? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                {itemsState.reportData && (
                    <>
                        <DropdownMenu onClick={() => handleClick("claimR")} link="/ReportData/claim" text="Claim" isActive={itemsState.claimR}/>
                        <DropdownMenu onClick={() => handleClick("detail")} link="/ReportData/detail" text="Detail" isActive={itemsState.detail}/>
                        <DropdownMenu onClick={() => handleClick("summary")} link="/ReportData/summary" text="Summary" isActive={itemsState.summary}/>
                    </>
                )}

                <li className={itemsState.upload ? "color" : "non_color"} onClick={() => handleClick("upload")}><div className={itemsState.upload ? "active" : "non_active"}></div><p>Upload</p><i className={itemsState.upload? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/></li>
                {itemsState.upload && (
                    <>
                        <DropdownMenu onClick={() => handleClick("absenU")} link="/Upload/absen" text="Absen" isActive={itemsState.absenU}/>
                        <DropdownMenu onClick={() => handleClick("apk")} link="/Upload/apk" text="Apk" isActive={itemsState.apk}/>
                    </>
                )}

                <div className="line"></div>
                <li>Logout</li>
            </ul>
        </nav>

    </div>
}

export default Sidebar