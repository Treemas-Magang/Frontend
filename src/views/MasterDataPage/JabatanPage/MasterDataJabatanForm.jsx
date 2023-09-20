import "./jabatanform.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataJabatanForm = () => {
    return <div className="jabatanform__container">
        <Sidebar/>
        <Content navbarText="Master Data / JabatanForm" informationText="JabatanForm"/>
    </div>
}

export default MasterDataJabatanForm