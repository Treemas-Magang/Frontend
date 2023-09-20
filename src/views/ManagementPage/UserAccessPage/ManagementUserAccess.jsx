import "./useraccess.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const ManagementUserAccess = () => {
    return <div className="useraccess__container">
        <Sidebar/>
        <Content navbarText="Management / UserAccess" informationText="UserAccess"/>
    </div>
}

export default ManagementUserAccess