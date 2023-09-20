import "./project.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataProject = () => {
    return <div className="project__container">
        <Sidebar/>
        <Content navbarText="Master Data / Project" informationText="Project"/>
    </div>
}

export default MasterDataProject