import "./manualservice.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import Content from "../../components/Content/Content"

const ManualService = () => {
    return <div className="manualservice__container">
        <Sidebar/>
        <Content navbarText="ManualService" informationText="ManualService"/>
    </div>
}
export default ManualService 