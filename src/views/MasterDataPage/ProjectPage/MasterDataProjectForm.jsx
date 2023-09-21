import "./projectform.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataProjectForm = () => {
    return <div className="projectform__container">
        <Sidebar/>
        <Content navbarText="MasterData / ProjectForm" informationText="ProjectForm"/>
    </div>
}

export default MasterDataProjectForm