import "./announcementform.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Content from "../../../components/Content/Content";

const MasterDataAnnouncementForm = () => {
  return <div className="announcementform__container">
    <Sidebar/>
    <Content navbarText="Master Data / AnnouncementForm" informationText="AnnouncementForm"/>
    </div>
};

export default MasterDataAnnouncementForm;
