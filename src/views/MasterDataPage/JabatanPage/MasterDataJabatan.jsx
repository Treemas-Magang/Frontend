import "./jabatan.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataJabatan = () => {
    return <div className="jabatan__container">
        <Sidebar/>
        <Content navbarText="Master Data / Jabatan" informationText="Jabatan"/>
        </div>
}

export default MasterDataJabatan