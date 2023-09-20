import "./liburform.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataLiburForm = () => {
    return <div className="liburform__container">
        <Sidebar/>
        <Content navbarText="Master Data / LiburForm" informationText="LiburForm"/>
    </div>
}

export default MasterDataLiburForm