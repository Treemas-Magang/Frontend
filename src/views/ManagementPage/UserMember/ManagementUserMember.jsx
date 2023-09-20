import "./usermember.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const ManagementUserMember = () => {
    return <div className="usermember_container">
        <Sidebar/>
        <Content navbarText="Management / UserAccess" informationText="UserAccess"/>
    </div>
}

export default ManagementUserMember