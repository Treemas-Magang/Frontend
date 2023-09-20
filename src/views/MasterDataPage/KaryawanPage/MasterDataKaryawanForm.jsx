import  "./karyawanform.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataKaryawanForm = () => {
    return <div className="karyawanform__container">
        <Sidebar/>
        <Content navbarText="Master Data / KaryawanForm" informationText="KaryawanForm"/>
    </div>
}

export default MasterDataKaryawanForm