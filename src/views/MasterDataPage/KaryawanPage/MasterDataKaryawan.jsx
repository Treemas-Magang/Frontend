import "./karyawan.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataKaryawan = () => {
    return <div className="karyawan__container">
        <Sidebar/>
        <Content navbarText="Master Data / Karyawan" informationText="Karyawan"/>
    </div>
}

export default MasterDataKaryawan