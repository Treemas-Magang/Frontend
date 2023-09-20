import "./dashboard.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import Content from "../../components/Content/Content"

const Dashboard = () => {
    return <div className="dashboard__container">
        <Sidebar />
        <Content navbarText="Master Data / Announcement" informationText="Announcement"/>
    </div> 
}

export default Dashboard