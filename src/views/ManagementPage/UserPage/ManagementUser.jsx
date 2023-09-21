import "./user.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content
 from "../../../components/Content/Content"
const ManagementUser = () => {
    return <div className="userpage__container">
        <Sidebar/>
        <Content navbarText="Management / UserPage" informationText="User"/>
    </div>
}

export default ManagementUser