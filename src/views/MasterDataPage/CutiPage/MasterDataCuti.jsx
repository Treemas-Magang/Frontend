import "./cuti.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataCuti = () => {
    return <div className="cuti__container">
        <Sidebar/>
        <Content navbarText="Master Data / Cuti" informationText="Cuti"/>
    </div>
}

export default MasterDataCuti