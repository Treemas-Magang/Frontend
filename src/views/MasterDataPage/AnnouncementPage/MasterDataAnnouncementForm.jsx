import "./announcementform.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Context } from "react";

const MasterDataAnnouncementForm = () => {
  return <div className="announcementform__container">
    <Sidebar/>
    <Content navbarText="MasterData / AnnouncementForm" informationText="AnnouncementForm"/>
    </div>
};

export default MasterDataAnnouncementForm;
