import "./liburform.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataLiburForm = () => {
    return <div className="liburform__container">
        <Sidebar/>
        <Content navbarText="MasterData / LiburForm" informationText="LiburForm"/>
    </div>
}

export default MasterDataLiburForm