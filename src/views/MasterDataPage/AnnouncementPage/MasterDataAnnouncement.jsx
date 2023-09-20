import "./announcement.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataAnnouncement = () => {
    return <div className="announcement__container"> 
    <Sidebar/>
    <Content navbarText="Master Data / Announcement" informationText="Announcement"/>
    </div>
}

export default MasterDataAnnouncement